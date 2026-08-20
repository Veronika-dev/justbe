'use client'

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import FinalStep from "@/components/exercises/final-step";
import styles from "./style.module.css";

type RelaxationPhase = "intro" | "activate" | "hold" | "return" | "relax";
type PmrStepId = "forehead" | "eyesNose" | "lips" | "shoulders" | "back" | "arms" | "hands" | "belly" | "legs" | "toes";

interface RelaxationAnimationApi {
  play: () => void;
  pause: () => void;
  reset: () => void;
  seek: (ms: number) => void;
  getState: () => {
    running: boolean;
    paused: boolean;
    time: number;
    total: number;
    stage: number;
    stageDuration: number;
  };
}

interface RelaxationProgressDetail {
  time: number;
  total: number;
  stage: number;
  phase: RelaxationPhase;
}

interface RelaxationStageChangeDetail {
  index: number;
}

declare global {
  interface Window {
    relaxationAnimation?: RelaxationAnimationApi;
  }

  interface HTMLElement {
    relaxationAnimation?: RelaxationAnimationApi;
  }
}

const SVG_PATH = "/exercises/pmr/relaxation-controlled-v2.svg";
const STEP_IDS: PmrStepId[] = ["forehead", "eyesNose", "lips", "shoulders", "back", "arms", "hands", "belly", "legs", "toes"];
const PHASE_TRANSLATION: Record<RelaxationPhase, string> = {
  intro: "intro",
  activate: "tense",
  hold: "tenseHold",
  return: "relaxing",
  relax: "relaxHold",
};

function getEmbeddedScript(markup: string) {
  const scriptMatch = markup.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  const scriptText = scriptMatch?.[1] ?? "";

  return scriptText
    .replace(/^\s*<!\[CDATA\[/, "")
    .replace(/\]\]>\s*$/, "")
    .replace(
      "const paths=base.map((_,i)=>document.getElementById('relax-p'+i));",
      "const paths=base.map((_,i)=>root.querySelector('#relax-p'+i));",
    );
}

export default function PmrExercise() {
  const t = useTranslations("Common");
  const tSteps = useTranslations("Method.pmrSteps");

  const rootRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<RelaxationAnimationApi | null>(null);
  const loadIdRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [phase, setPhase] = useState<RelaxationPhase>("intro");
  const [progress, setProgress] = useState(0);

  const activeStep = STEP_IDS[stageIndex] ?? STEP_IDS[0];
  const isRelaxing = phase === "return" || phase === "relax";

  const resetAnimation = useCallback(() => {
    animationRef.current?.reset();
    setStageIndex(0);
    setPhase("intro");
    setProgress(0);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadSvg() {
      const loadId = loadIdRef.current + 1;
      loadIdRef.current = loadId;
      const markup = await fetch(SVG_PATH).then((response) => response.text());
      if (isCancelled || loadId !== loadIdRef.current || !rootRef.current) return;

      rootRef.current.innerHTML = markup;

      const svg = rootRef.current.querySelector("svg");
      if (!svg) return;

      const script = getEmbeddedScript(markup);
      if (script) {
        window.relaxationAnimation = undefined;
        document.documentElement.relaxationAnimation = undefined;

        try {
          const initAnimation = new Function(
            "root",
            `${script}\nreturn window.relaxationAnimation ?? document.documentElement.relaxationAnimation;`,
          ) as (root: SVGSVGElement) => RelaxationAnimationApi | undefined;

          animationRef.current = initAnimation(svg) ?? null;
        } catch (error) {
          console.error("Failed to initialize PMR SVG animation", error);
          return;
        }
      }

      const animation = animationRef.current ?? window.relaxationAnimation ?? document.documentElement.relaxationAnimation;
      if (!animation) {
        console.error("PMR SVG animation API is missing");
        return;
      }

      animationRef.current = animation;
      animationRef.current.reset();
      setIsReady(true);
    }

    loadSvg().catch(() => {
      if (!isCancelled) setIsReady(false);
    });

    return () => {
      isCancelled = true;
      animationRef.current?.reset();
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    const eventTargets: EventTarget[] = [window, document.documentElement];

    function handleProgress(event: Event) {
      const detail = (event as CustomEvent<RelaxationProgressDetail>).detail;
      if (!detail) return;

      setStageIndex(Math.max(0, Math.min(STEP_IDS.length - 1, detail.stage - 1)));
      setPhase(detail.phase);
      setProgress(Math.min(100, Math.round((detail.time / detail.total) * 100)));

      if (detail.time >= detail.total) {
        setFinished(true);
        setStarted(false);
      }
    }

    function handleStageChange(event: Event) {
      const detail = (event as CustomEvent<RelaxationStageChangeDetail>).detail;
      if (!detail) return;

      setStageIndex(Math.max(0, Math.min(STEP_IDS.length - 1, detail.index - 1)));
    }

    function handleComplete() {
      setProgress(100);
      setFinished(true);
      setStarted(false);
    }

    eventTargets.forEach((target) => {
      target.addEventListener("relaxationprogress", handleProgress);
      target.addEventListener("relaxationstagechange", handleStageChange);
      target.addEventListener("relaxationcomplete", handleComplete);
    });

    return () => {
      eventTargets.forEach((target) => {
        target.removeEventListener("relaxationprogress", handleProgress);
        target.removeEventListener("relaxationstagechange", handleStageChange);
        target.removeEventListener("relaxationcomplete", handleComplete);
      });
    };
  }, []);

  const startExercise = () => {
    if (!animationRef.current) return;

    setStarted(true);
    setFinished(false);
    resetAnimation();
    animationRef.current.play();
  };

  const stopExercise = () => {
    animationRef.current?.pause();
    resetAnimation();
    setStarted(false);
    setFinished(false);
  };

  const phaseKey = PHASE_TRANSLATION[phase];
  const title = started ? tSteps(`${activeStep}.title`) : tSteps("startTitle");
  const description = useMemo(() => {
    if (!started) return tSteps("startDescription");
    return tSteps(`${activeStep}.${isRelaxing ? "relaxDescription" : "tenseDescription"}`);
  }, [activeStep, isRelaxing, started, tSteps]);

  if (finished) {
    return <FinalStep usedMethod="pmr" onRestart={startExercise} />;
  }

  return (
    <>
      <div className="card-background px-4 py-4 md:px-8 md:py-8">
        <div className={styles.layout}>
          <div ref={rootRef} className={styles.stage} aria-label={tSteps("startImageAlt")} aria-live="polite" />

          <div className={styles.panel}>
            <p className={styles.kicker}>{started ? `${stageIndex + 1} / ${STEP_IDS.length}` : tSteps("prepareTitle")}</p>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>

            <div className={styles.status}>
              <span>{started ? tSteps(`phases.${phaseKey}`) : tSteps("phases.intro")}</span>
              <span>{started ? `${progress}%` : ""}</span>
            </div>
            <div className={styles.progressTrack} aria-hidden="true">
              <div className={styles.progressBar} style={{width: `${progress}%`}} />
            </div>
          </div>
        </div>
      </div>

      <div className="card-background mt-4 flex justify-center items-center px-4 py-4 md:px-8 md:py-8">
        <button onClick={started ? stopExercise : startExercise} className="btn-linear-outline w-full sm:w-auto" disabled={!isReady}>
          <span>{started ? t("stop") : t("start")}</span>
        </button>
      </div>
    </>
  );
}
