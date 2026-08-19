import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ChevronRight, Heart, Mail, Send } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMenu = await getTranslations({ locale, namespace: "Menu" });
  const tContacts = await getTranslations({ locale, namespace: "Contacts" });

  return createPageMetadata({
    locale,
    path: "/contacts",
    title: tMenu("contacts"),
    description: tContacts("description"),
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tApp = await getTranslations({ locale, namespace: "App" });
  const tMenu = await getTranslations({ locale, namespace: "Menu" });
  const tContacts = await getTranslations({ locale, namespace: "Contacts" });
  const contactItems = [
    {
      title: tContacts("methods.email.title"),
      value: tContacts("methods.email.value"),
      description: tContacts("methods.email.description"),
      href: `mailto:${tContacts("methods.email.value")}`,
      icon: Mail,
      tone: "border-primary/25 bg-primary/10 text-primary ring-primary/10",
    },
    {
      title: tContacts("methods.telegram.title"),
      value: tContacts("methods.telegram.value"),
      description: tContacts("methods.telegram.description"),
      href: tContacts("methods.telegram.href"),
      icon: Send,
      tone: "border-sky-300/25 bg-sky-400 text-white ring-sky-400/10",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp("title"), path: "/" },
          { name: tMenu("contacts"), path: "/contacts" },
        ]}
      />
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 lg:px-10">
        <section className="mb-8 grid items-center gap-8 lg:grid-cols-[1fr_440px]">
          <div className="pt-8 lg:pt-24">
            <h1 className="mb-7 text-5xl font-medium tracking-normal text-foreground sm:text-6xl">
              {tMenu("contacts")}
            </h1>
            <p className="max-w-lg whitespace-pre-line text-lg leading-7 text-foreground/75">
              {tContacts("hero.description")}
            </p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-4xl">
            <div className="absolute bottom-5 right-0 h-56 w-96 rounded-full bg-foreground/5 blur-sm" />
            <div className="absolute left-5 top-36 flex h-16 w-20 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <Heart className="h-8 w-8 fill-current" />
            </div>
            <Image
              src="/mascot/yes2.svg"
              width={440}
              height={320}
              alt=""
              className="relative ml-auto h-auto w-full max-w-md"
              loading="eager"
            />
          </div>
        </section>

        <section className="card-background mb-8 rounded-3xl px-7 py-8 sm:px-10">
          <h2 className="mb-4 text-3xl font-medium text-primary">
            {tContacts("connect.title")}
          </h2>
          <p className="mb-9 text-lg text-foreground/60">
            {tContacts("connect.description")}
          </p>
          <div className="space-y-4">
            {contactItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="grid items-center gap-5 rounded-3xl border border-primary-200 bg-background/10 px-6 py-7 transition-colors hover:bg-primary/10 sm:grid-cols-[112px_1fr_28px]"
              >
                <span
                  className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border text-current ring-[18px] ${item.tone}`}
                >
                  <item.icon className="h-12 w-12" />
                </span>
                <span>
                  <span className="mb-2 block text-2xl font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="mb-3 block text-2xl font-medium text-primary">
                    {item.value}
                  </span>
                  <span className="block text-base text-foreground/60">
                    {item.description}
                  </span>
                </span>
                <ChevronRight className="mx-auto hidden h-8 w-8 text-primary sm:block" />
              </a>
            ))}
          </div>
        </section>

        <section className="card-background grid items-center gap-6 rounded-3xl px-7 py-8 sm:grid-cols-[120px_1fr] sm:px-10">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/15 text-primary ring-24 ring-primary/5">
            <Heart className="h-14 w-14 fill-current" />
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-medium text-primary">
              {tContacts("support.title")}
            </h2>
            <div className="space-y-4 text-lg leading-7 text-foreground/75">
              <p>{tContacts("support.paragraph1")}</p>
              <p>{tContacts("support.paragraph2")}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
