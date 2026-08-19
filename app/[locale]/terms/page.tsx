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
  const tTerms = await getTranslations({ locale, namespace: "Terms" });

  return createPageMetadata({
    locale,
    path: "/terms",
    title: tTerms("title"),
    description: tTerms("description"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tApp = await getTranslations({ locale, namespace: "App" });
  const tTerms = await getTranslations({ locale, namespace: "Terms" });
  const content: LegalPageContent = {
    title: tTerms("title"),
    description: tTerms("description"),
    updatedAt: tTerms("updatedAt"),
    sections: tTerms.raw("sections"),
  };

  return (
    <LegalPage
      homeLabel={tApp("title")}
      content={content}
      path="/terms"
    />
  );
}
