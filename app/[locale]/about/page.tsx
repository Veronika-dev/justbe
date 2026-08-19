import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AlertTriangle, Heart, Info, Phone } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMenu = await getTranslations({ locale, namespace: "Menu" });
  const tAbout = await getTranslations({ locale, namespace: "About" });

  return createPageMetadata({
    locale,
    path: "/about",
    title: tMenu("about"),
    description: tAbout("description"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tApp = await getTranslations({ locale, namespace: "App" });
  const tMenu = await getTranslations({ locale, namespace: "Menu" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const stepItems = [
    {
      title: tAbout("steps.checkin.title"),
      text: tAbout("steps.checkin.text"),
      image: "/logo-sidebar.svg",
    },
    {
      title: tAbout("steps.selection.title"),
      text: tAbout("steps.selection.text"),
      image: "/mascot/yes2.svg",
    },
    {
      title: tAbout("steps.start.title"),
      text: tAbout("steps.start.text"),
      image: "/mascot/lay-down.svg",
    },
  ];
  const featureItems = [
    {
      title: tAbout("features.grounding.title"),
      text: tAbout("features.grounding.text"),
      icon: 'grounding',
      tone: "bg-green-400/10 text-green-200",
    },
    {
      title: tAbout("features.breathing.title"),
      text: tAbout("features.breathing.text"),
      icon: 'breathing',
      tone: "bg-amber-400/10 text-amber-200",
    },
    {
      title: tAbout("features.relaxation.title"),
      text: tAbout("features.relaxation.text"),
      icon: 'pmr',
      tone: "bg-yellow-300/10 text-yellow-200",
    },
    {
      title: tAbout("features.video.title"),
      text: tAbout("features.video.text"),
      icon: 'video',
      tone: "bg-orange-400/10 text-orange-200",
    },
    {
      title: tAbout("features.interactive.title"),
      text: tAbout("features.interactive.text"),
      icon: 'interactive',
      tone: "bg-rose-300/10 text-rose-200",
    },
    {
      title: tAbout("features.creativity.title"),
      text: tAbout("features.creativity.text"),
      icon: 'creative',
      tone: "bg-red-300/10 text-red-200",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp("title"), path: "/" },
          { name: tMenu("about"), path: "/about" },
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <section className="mb-8 grid items-center gap-8 lg:grid-cols-[1fr_420px] ps-7 sm:ps-10">
          <div className="pt-8 lg:pt-20">
            <h1 className="mb-5 text-4xl font-medium tracking-normal text-foreground sm:text-5xl">
              {tMenu("about")}
            </h1>
            <p className="max-w-xl text-lg leading-7 text-foreground/70 mb-3">
              {tAbout("hero.description")}
            </p>
            <p className="max-w-xl text-lg leading-7 text-foreground/70">
              {tAbout("hero.description1")}
            </p>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-4xl">
            <div className="absolute bottom-3 right-4 h-44 w-80 rounded-full bg-foreground/5 blur-sm" />
            <Image
              src="/mascot/calm.svg"
              width={430}
              height={300}
              alt=""
              className="relative ml-auto h-auto w-full max-w-3/4"
              loading="eager"
            />
          </div>
        </section>

        <div className="space-y-4">
          <section className="card-background grid items-center gap-8 rounded-2xl px-7 py-8 sm:px-10 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="mb-5 text-2xl font-medium text-primary">
                {tAbout("why.title")}
              </h2>
              <div className="max-w-2xl space-y-4 text-base leading-6 text-foreground/70">
                <p>{tAbout("why.paragraph1")}</p>
                <p>{tAbout("why.paragraph2")}</p>
                <p>{tAbout("why.paragraph3")}</p>
              </div>
            </div>
            <Image
              src="/mascot/sleepy-cushion.svg"
              width={250}
              height={143}
              alt=""
              className="mx-auto h-auto w-full max-w-64"
            />
          </section>

          <section className="card-background rounded-2xl px-7 py-8 sm:px-10">
            <h2 className="mb-8 text-2xl font-medium text-primary">
              {tAbout("how.title")}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {stepItems.map((step, index) => (
                <div key={step.title} className="relative text-center">
                  {index < 2 ? (
                    <div className="absolute left-[68%] top-4 hidden w-[64%] border-t border-dashed border-primary/35 md:block" />
                  ) : null}
                  <div className="relative mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-lg font-semibold text-primary">
                    {index + 1}
                  </div>
                  <Image
                    src={step.image}
                    width={126}
                    height={104}
                    alt=""
                    className="mx-auto mb-4 h-24 w-auto"
                  />
                  <h3 className="mb-3 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mx-auto max-w-56 text-sm leading-4 text-foreground/60">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="card-background rounded-2xl px-7 py-8 sm:px-10">
            <h2 className="mb-8 text-2xl font-medium text-primary">
              {tAbout("features.title")}
            </h2>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {featureItems.map((feature) => (
                <div key={feature.title} className="grid grid-cols-[64px_1fr] gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${feature.tone}`}>
                    <Image src={`/exercises/ic-${feature.icon}.svg`} className="h-14 w-14" width={40} height={40} alt={feature.title} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-4 text-foreground/60">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card-background grid items-center gap-6 rounded-2xl px-7 py-7 sm:grid-cols-[56px_1fr_160px] sm:px-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary ring-8 ring-primary/5">
              <Info className="h-7 w-7" />
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-medium text-primary">
                {tAbout("important.title")}
              </h2>
              <div className="space-y-4 text-sm leading-4 text-foreground/70">
                <p>{tAbout("important.paragraph1")}</p>
                <p>{tAbout("important.paragraph2")}</p>
              </div>
            </div>
            <Image
              src="/mascot/yes.svg"
              width={150}
              height={150}
              alt=""
              className="mx-auto h-auto w-36"
            />
          </section>

          <section className="grid items-center gap-6 rounded-2xl border border-red-400/20 bg-red-950/25 px-7 py-7 shadow-[0_20px_70px_rgba(100,20,30,0.18)] sm:grid-cols-[56px_1fr_150px] sm:px-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400/15 text-red-300 ring-8 ring-red-400/5">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-medium text-red-300">
                {tAbout("urgent.title")}
              </h2>
              <p className="text-sm leading-4 text-red-200/85">
                {tAbout("urgent.text")}
              </p>
            </div>
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-400/10 text-red-300 ring-[28px] ring-red-400/5">
              <Phone className="h-12 w-12" />
            </div>
          </section>

          <section className="card-background grid items-center gap-6 rounded-2xl bg-primary/15 px-7 py-7 sm:grid-cols-[72px_1fr_160px] sm:px-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/25 text-primary">
              <Heart className="h-9 w-9 fill-current" />
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-medium text-primary">
                {tAbout("support.title")}
              </h2>
              <p className="text-base leading-7 text-foreground/70">
                {tAbout("support.text")}
              </p>
            </div>
            <Image
              src="/mascot/lay-down.svg"
              width={160}
              height={100}
              alt=""
              className="mx-auto h-auto w-40"
            />
          </section>
        </div>
      </main>
    </>
  );
}
