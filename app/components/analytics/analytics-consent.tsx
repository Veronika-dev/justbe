"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import YandexMetrika from "@/components/analytics/yandex";
import { getSupportedLocale, localizedPath } from "@/lib/seo";

const CONSENT_KEY = "becapy_analytics_consent";
const CONSENT_COOKIE = "analytics_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

type ConsentValue = "accepted" | "denied";

function getStoredConsent(): ConsentValue | null {
  const localValue = window.localStorage.getItem(CONSENT_KEY);

  if (localValue === "accepted" || localValue === "denied") {
    return localValue;
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];

  return cookieValue === "accepted" || cookieValue === "denied"
    ? cookieValue
    : null;
}

function storeConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_KEY, value);
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

export default function AnalyticsConsent() {
  const locale = getSupportedLocale(useLocale());
  const t = useTranslations("CookieConsent");
  const [consent, setConsent] = useState<ConsentValue | null | "pending">(
    "pending",
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setConsent(getStoredConsent());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleChoice = (value: ConsentValue) => {
    storeConsent(value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" ? <YandexMetrika /> : null}
      {consent === null ? (
        <section
          aria-label={t("ariaLabel")}
          className="fixed inset-x-3 bottom-3 z-[70] rounded-xl border border-primary-200 bg-primary-100/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-md md:left-auto md:right-6 md:max-w-md"
        >
          <h2 className="mb-2 text-lg font-semibold text-tx-primary">
            {t("title")}
          </h2>
          <p className="text-sm leading-6 text-foreground/80">
            {t("description")}{" "}
            <Link
              href={localizedPath(locale, "/privacy")}
              className="text-primary underline-offset-4 hover:underline"
            >
              {t("privacyLink")}
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => handleChoice("denied")}
              className="rounded-lg border border-primary-200 px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-white/10"
            >
              {t("decline")}
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
            >
              {t("accept")}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
