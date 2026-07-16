import { comparison } from "@/content/content";
import { Reveal, SectionHeading } from "./ui/motion";

function Check({ yes }: { yes: boolean }) {
  return yes ? (
    <svg viewBox="0 0 20 20" className="mx-auto h-5 w-5 text-azure" aria-hidden fill="none">
      <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" className="mx-auto h-5 w-5 text-frost-2" aria-hidden fill="none">
      <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Comparison() {
  return (
    <section id={comparison.id} className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <SectionHeading kicker={comparison.kicker}>
          {comparison.headline}
        </SectionHeading>

        <Reveal delay={0.1} as="p">
          <span className="mt-6 block max-w-2xl text-lg leading-relaxed text-muted">
            {comparison.body}
          </span>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Load-bearing content: a real table, readable without JS or motion */}
          <div className="mt-14 overflow-x-auto rounded-lg border border-frost">
            <table className="w-full min-w-[640px] border-collapse bg-white/60 text-left">
              <thead>
                <tr className="border-b border-frost">
                  <th scope="col" className="anno p-5 text-muted">
                    Company
                  </th>
                  {comparison.columns.map((col) => (
                    <th scope="col" key={col} className="anno p-5 text-center text-muted">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr
                    key={row.name}
                    className={
                      row.highlight
                        ? "border-b border-frost bg-ink text-paper"
                        : "border-b border-frost last:border-b-0"
                    }
                  >
                    <th scope="row" className="p-5 font-medium">
                      <span className={row.highlight ? "font-semibold" : ""}>
                        {row.name}
                      </span>
                      {"sub" in row && row.sub ? (
                        <span
                          className={`anno mt-1 block ${
                            row.highlight ? "text-paper/60" : "text-muted"
                          }`}
                        >
                          {row.sub}
                        </span>
                      ) : null}
                    </th>
                    {row.marks.map((yes, i) => (
                      <td key={i} className="p-5 text-center">
                        <span className="sr-only">{yes ? "Yes" : "No"}</span>
                        {row.highlight ? (
                          <svg viewBox="0 0 20 20" className="mx-auto h-5 w-5 text-azure-soft" aria-hidden fill="none">
                            <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <Check yes={yes} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.2} as="p">
          <span className="anno mt-6 block text-steel-deep">
            The only one that returns editable CAD — without a laser scanner.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
