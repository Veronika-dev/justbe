import { useLocale } from "next-intl";
import {
  createBreadcrumbJsonLd,
  getSupportedLocale,
} from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";

export default function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const locale = getSupportedLocale(useLocale());

  return <JsonLd data={createBreadcrumbJsonLd({ locale, items })} />;
}
