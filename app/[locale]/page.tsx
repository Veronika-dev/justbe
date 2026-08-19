import type { Metadata } from "next";
import Checkin from "@/components/checkin";
import { getTranslations } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tApp = await getTranslations({ locale, namespace: "App" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });

  return createPageMetadata({
    locale,
    title: tApp("title"),
    description: tSeo("homeDescription"),
    absoluteTitle: true,
  });
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 pb-8 pt-16">
      <Checkin />
    </div>
  );
}
