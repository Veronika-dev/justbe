'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

type Direction = "inhale" | "exhale";
type SVGAnimateWithBegin = SVGAnimateElement & { beginElement: () => void };

const DURATION_MS = 4000;
const SVG_PATH = "/exercises/breathing-animation-controlled.svg";

function getStartEnd(animate: SVGAnimateElement) {
  const cachedStart = animate.dataset.start;
  const cachedEnd = animate.dataset.end;
  if (cachedStart && cachedEnd) return { start: cachedStart, end: cachedEnd };

  const [start = "", end = ""] = (animate.getAttribute("values") ?? "").split(";");
  animate.dataset.start = start;
  animate.dataset.end = end;
  return { start, end };
}

export default function BreathingAnimation({
  status = "hold",
  duration = DURATION_MS,
}: {
  status?: BreathingAnimationStatus;
  duration?: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const clearFinishTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const getSvg = useCallback(() => rootRef.current?.querySelector("svg") ?? null, []);

  const setFrame = useCallback((direction: Direction, frame: "from" | "to") => {
    const svg = getSvg();
    if (!svg) return;

    svg.querySelectorAll<SVGAnimateElement>('animate[attributeName="d"]').forEach((animate) => {
      const path = animate.parentElement as SVGPathElement | null;
      if (!path) return;

      const { start, end } = getStartEnd(animate);
      const from = direction === "inhale" ? start : end;
      const to = direction === "inhale" ? end : start;
      path.setAttribute("d", frame === "from" ? from : to);
    });
  }, [getSvg]);

  const play = useCallback((direction: Direction) => {
    const svg = getSvg();
    if (!svg) return;

    clearFinishTimer();
    svg.unpauseAnimations?.();
    svg.setCurrentTime?.(0);
    setFrame(direction, "from");

    svg.querySelectorAll<SVGAnimateWithBegin>('animate[attributeName="d"]').forEach((animate) => {
      const { start, end } = getStartEnd(animate);
      animate.setAttribute("values", direction === "inhale" ? `${start};${end}` : `${end};${start}`);
      animate.beginElement();
    });

    timeoutRef.current = window.setTimeout(() => {
      setFrame(direction, "to");
      timeoutRef.current = null;
    }, duration);
  }, [clearFinishTimer, getSvg, setFrame, duration]);

  const pause = useCallback(() => {
    const svg = getSvg();
    if (!svg) return;

    svg.pauseAnimations?.();
    clearFinishTimer();
  }, [clearFinishTimer, getSvg]);

  useEffect(() => {
    let isCancelled = false;

    async function loadSvg() {
      const response = await fetch(SVG_PATH);
      const markup = await response.text();
      if (isCancelled) return;

      const root = rootRef.current;
      if (!root) return;

      root.innerHTML = markup;
      setIsReady(true);
    }

    loadSvg().catch(() => {
      if (!isCancelled) {
        setIsReady(false);
      }
    });

    return () => {
      isCancelled = true;
      clearFinishTimer();
    };
  }, [clearFinishTimer]);

  useEffect(() => {
    if (!isReady) return;

    const svg = getSvg();
    if (!svg) return;

    svg.pauseAnimations?.();
    setFrame("inhale", "from");
  }, [getSvg, isReady, setFrame]);

  useEffect(() => {
    if (!isReady) return;

    if (status === "hold") {
      pause();
      return;
    }

    play(status);
  }, [isReady, pause, play, status]);

  return (
    <section className={styles.breathingWidget} aria-label="Breathing animation">
      <div ref={rootRef} className={styles.breathingCanvas} />
    </section>
  );
}
