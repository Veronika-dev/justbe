import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalPage from "@/components/legal/legal-page";
import type { LegalPageContent } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tPrivacy = await getTranslations({ locale, namespace: "Privacy" });

  return createPageMetadata({
    locale,
    path: "/privacy",
    title: tPrivacy("title"),
    description: tPrivacy("description"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tApp = await getTranslations({ locale, namespace: "App" });
  const tPrivacy = await getTranslations({ locale, namespace: "Privacy" });
  const content: LegalPageContent = {
    title: tPrivacy("title"),
    description: tPrivacy("description"),
    updatedAt: tPrivacy("updatedAt"),
    sections: tPrivacy.raw("sections"),
  };

  return (
    <LegalPage
      homeLabel={tApp("title")}
      content={content}
      path="/privacy"
    />
  );
}
