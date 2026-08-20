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
      tone: "border-primary/25 bg-primary/10 text-primary ring-primary/10",
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
        <section className="mb-8 grid items-center md:grid-cols-[1fr_440px] xl:ps-10">
          <div className="pt-12 lg:pt-24">
            <h1 className="mb-5 text-3xl font-medium tracking-normal text-foreground md:mb-7 md:text-5xl">
              {tMenu("contacts")}
            </h1>
            <p className="max-w-lg whitespace-pre-line text-base leading-6 text-foreground/75 md:text-lg md:leading-7">
              {tContacts("hero.description")}
            </p>
          </div>
          <div className="relative mt-4 overflow-hidden rounded-4xl md:mt-0 md:min-h-72">
            <div className="absolute bottom-5 right-0 h-56 w-96 rounded-full bg-foreground/5 blur-sm" />
            <Image
              src="/mascot/yes2.svg"
              width={440}
              height={320}
              alt=""
              className="relative ml-auto h-auto w-full max-w-2xs md:max-w-md"
              loading="eager"
            />
          </div>
        </section>

        <section className="card-background mb-8 rounded-2xl px-7 py-8 sm:px-10 md:rounded-3xl">
          <h2 className="mb-4 text-2xl font-medium text-primary md:text-3xl">
            {tContacts("connect.title")}
          </h2>
          <p className="mb-7 text-base text-foreground/60 md:mb-9 md:text-lg">
            {tContacts("connect.description")}
          </p>
          <div className="space-y-4">
            {contactItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="grid items-center gap-5 rounded-2xl border border-primary-200 bg-background/10 px-4 py-4 sm:px-5 sm:py-6 transition-colors hover:bg-primary/10 grid-cols-[48px_1fr_28px] md:grid-cols-[112px_1fr_28px] md:rounded-3xl md:px-6 md:py-7"
              >
                <span
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-current ring-8 md:h-24 md:w-24 md:ring-18 ${item.tone}`}
                >
                  <item.icon className="h-6 w-6 md:h-12 md:w-12" />
                </span>
                <span>
                  <span className="md:mb-3 block wrap-break-word text-xl font-medium text-primary md:text-2xl">
                    {item.value}
                  </span>
                  <span className="block text-sm text-foreground/60 md:text-base leading-5">
                    {item.description}
                  </span>
                </span>
                <ChevronRight className="mx-auto hidden h-8 w-8 text-primary sm:block" />
              </a>
            ))}
          </div>
        </section>

        <section className="card-background grid items-center gap-6 rounded-2xl px-7 py-8 sm:grid-cols-[96px_1fr] sm:px-10 md:grid-cols-[120px_1fr] md:rounded-3xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary ring-[18px] ring-primary/5 md:h-28 md:w-28 md:ring-24">
            <Heart className="h-10 w-10 fill-current md:h-14 md:w-14" />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-medium text-primary md:text-3xl">
              {tContacts("support.title")}
            </h2>
            <div className="space-y-4 text-base leading-6 text-foreground/75 md:text-lg md:leading-7">
              <p>{tContacts("support.paragraph1")}</p>
              <p>{tContacts("support.paragraph2")}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
