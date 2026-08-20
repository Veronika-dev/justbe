"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
  BadgeInfo,
  Cloud,
  Mail,
  TextAlignJustify,
  MoonStar,
  Scale,
  Settings,
  Shield,
  Sunrise,
  ThermometerSun,
  X,
} from "lucide-react";
import LinkStated from "@/components/main/link-stated";
import Image from "next/image";
import {
  defaultLocale,
  getSupportedLocale,
  localizedPath,
  supportedLocales,
  type SupportedLocale, localesNames,
} from "@/lib/seo";

const menuItems = {
  'checkin': '/',
  'exercises': '/exercises',
  'about': '/about',
  // 'tests': '/tests',
  // 'diary': '/diary',
  // 'settings': '/settings'
}

const legalMenuItems = {
  'contacts': '/contacts',
  'privacy': '/privacy',
  'terms': '/terms',
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("App");
  const locale = getSupportedLocale(useLocale());

  return (
    <>
      <header className="fixed inset-x-0 top-2 left-2 right-2 z-50 flex h-14 items-center gap-4 rounded-3xl border border-primary-200 bg-primary-100/10 px-4 shadow-2xl shadow-black/30 backdrop-blur-md lg:hidden">
        <button
          type="button"
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isOpen}
          aria-controls="main-sidebar"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 text-primary transition-colors"
        >
          {isOpen ? <X size={22} /> : <TextAlignJustify size={22} />}
        </button>
        <Link
          href={localizedPath(locale, "/")}
          className="flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo-sidebar.svg"
            width={226}
            height={196}
            alt=""
            className="h-9 w-auto shrink-0 mb-1"
            loading="eager"
          />
          <span className="truncate text-lg font-medium text-foreground">
            {t("title")}
          </span>
        </Link>
      </header>

      {isOpen ? (
        <button
          type="button"
          aria-label={t("closeMenu")}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 w-72 max-w-[calc(100vw-2rem)] p-4 transition-transform duration-300 ease-out lg:top-0 lg:w-auto lg:max-w-none lg:translate-x-0 lg:p-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarNav locale={locale} onNavigate={() => setIsOpen(false)} />
      </aside>
    </>
  );
}

function SidebarNav({
  locale,
  onNavigate,
}: {
  locale: SupportedLocale;
  onNavigate: () => void;
}) {
  const t = useTranslations("App");
  const pathname = usePathname();

  return (
    <nav
      id="main-sidebar"
      className="flex h-full w-full flex-col items-stretch justify-start gap-2 rounded-3xl border border-primary-200 bg-primary-100/95 px-3 shadow-2xl shadow-black/30 backdrop-blur-md lg:w-60 lg:bg-primary-100/50 lg:shadow-none"
    >
      <div className="hidden pt-4 text-center lg:block">
        <Image
          src="/logo-sidebar.svg"
          width={226}
          height={196}
          alt="Logo"
          className="mx-auto w-3/5"
          loading="eager"
        />
        <div className="mb-1 mt-3 text-2xl">{t("title")}</div>
        <div className="text-sm text-gray-400/80">{t("motto")}</div>
      </div>
      <div className="mt-4 flex flex-col gap-2 lg:mt-16">
        {Object.entries(menuItems).map(([key, value]) => (
          <MenuItem
            key={key}
            name={key}
            href={localizedPath(locale, value)}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-1 border-t border-primary-200 pb-6 pt-4">
        {Object.entries(legalMenuItems).map(([key, value]) => (
          <MenuItem
            key={key}
            name={key}
            href={localizedPath(locale, value)}
            compact
            onNavigate={onNavigate}
          />
        ))}
        <div
          aria-label="Переключение языка"
          className="mt-2 flex items-center px-4 gap-2 text-gray-400/60"
        >
          {supportedLocales.map((item) => {
            const isActive = item === locale;

            return (
              <div key={item} className="flex items-center text-sm gap-2">
                <Link
                  href={getLocalizedCurrentPath(item, pathname)}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    document.cookie = `locale=${item}; path=/; max-age=31536000; SameSite=Lax`;
                    onNavigate();
                  }}
                  className={`transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-gray-400/60 hover:text-gray-400"
                  }`}
                >
                  {localesNames[item]}
                </Link>
                {item !== supportedLocales[supportedLocales.length - 1] ? (
                  <span aria-hidden="true">|</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function getLocalizedCurrentPath(locale: SupportedLocale, pathname: string) {
  const pathWithoutLocale = supportedLocales.reduce((path, item) => {
    if (path === `/${item}`) {
      return "/";
    }

    if (path.startsWith(`/${item}/`)) {
      return path.slice(item.length + 1);
    }

    return path;
  }, pathname);

  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }

  return localizedPath(locale, pathWithoutLocale);
}

function MenuItem({
  name,
  href,
  compact = false,
  onNavigate,
}: {
  name: string;
  href: string;
  compact?: boolean;
  onNavigate: () => void;
}) {
  const t = useTranslations("Menu");
  return (
    <LinkStated href={href}
                exact={true}
                activeClassName="bg-primary/15 text-primary"
                className="flex items-center justify-start text-left
                gap-3 px-4 text-gray-400/80
                hover:bg-primary/10 rounded-lg
                transition-colors transition-duration-300"
                onClick={onNavigate}
                style={{ paddingTop: compact ? "0.625rem" : "1rem", paddingBottom: compact ? "0.625rem" : "1rem" }}>
      {MenuIcon(name)}
      <span className="text-sm">{ t(name) }</span>
    </LinkStated>
  )
}

function MenuIcon(name: string) {
  switch (name) {
    case 'checkin':
      return <Cloud size={22} />
    case 'exercises':
      return <Sunrise size={22} />
    case 'about':
      return <BadgeInfo size={22} />
    case 'tests':
      return <ThermometerSun size={22} />
    case 'diary':
      return <MoonStar size={22} />
    case 'settings':
      return <Settings size={22} />
    default:
      return null;
  }
}
