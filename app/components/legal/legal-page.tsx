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
      <main className="container mx-auto px-5 py-8 sm:px-8 lg:px-10">
        <div className="mt-12 lg:mt-0">
          {content.updatedAt ? (
            <p className="mb-3 text-sm text-tx-secondary">
              {content.updatedAt}
            </p>
          ) : null}
          <h1 className="mb-4 text-3xl">{content.title}</h1>
          <p className="mb-8 text-base opacity-80">{content.description}</p>
        </div>
        <div className="space-y-6">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="card-background rounded-2xl px-6 py-6 sm:px-8 sm:py-8"
            >
              <h2 className="mb-4 text-xl font-semibold leading-snug text-tx-primary sm:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-6 text-foreground/80 sm:text-base sm:leading-7">
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
