import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";

export type LegalPageContent = {
  title: string;
  description: string;
  updatedAt?: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

export default function LegalPage({
  homeLabel,
  content,
  path,
}: {
  homeLabel: string;
  content: LegalPageContent;
  path: string;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel, path: "/" },
          { name: content.title, path },
        ]}
      />
      <main className="container mx-auto px-10 py-10">
        <p className="mb-3 text-sm text-tx-secondary">
          {content.updatedAt}
        </p>
        <h1 className="mb-4 text-4xl font-semibold text-tx-primary">
          {content.title}
        </h1>
        <p className="mb-8 text-lg text-tx-secondary">
          {content.description}
        </p>
        <div className="space-y-6">
          {content.sections.map((section) => (
            <section key={section.title} className="card-background">
              <h2 className="mb-3 text-2xl font-semibold text-tx-primary">
                {section.title}
              </h2>
              <div className="space-y-3 text-base leading-7 text-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
