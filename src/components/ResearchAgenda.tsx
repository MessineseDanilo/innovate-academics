interface ResearchAgendaProps {
  onCategoryClick: (category: string) => void;
}

const ResearchAgenda = ({ onCategoryClick }: ResearchAgendaProps) => {
  const researchAreas = [
    {
      id: "decisions",
      title: "Entrepreneurial Strategy and Decision-Making",
      description:
        "How entrepreneurs form beliefs, use information, and update strategies when facing uncertainty.",
      questions: [
        "How do theory-based and design-based approaches affect commitment, termination, and pivoting?",
        "When does a scientific approach improve entrepreneurial search and forecasting?",
        "How do entrepreneurs respond to information that violates their expectations?",
      ],
    },
    {
      id: "ai",
      title: "Artificial Intelligence and Causal Reasoning",
      description:
        "How AI and causal machine learning can support explanation, theory development, and strategic judgment.",
      questions: [
        "Can algorithms detect anomalies that reveal new opportunities or hidden causal structures?",
        "How can machine learning complement social scientific theory rather than replace it?",
        "What forms of human judgment remain essential when AI systems generate predictions?",
      ],
    },
    {
      id: "entrepreneurship",
      title: "Innovation, Discovery, and Computational Creativity",
      description:
        "How humans and machines discover new ideas, interpret surprise, and transform anomalies into innovation.",
      questions: [
        "How do data-rich environments alter the process of entrepreneurial discovery?",
        "What distinguishes extrapolating from the past from identifying genuinely novel opportunities?",
        "How should organizations combine algorithmic signals with human causal interpretation?",
      ],
    },
  ];

  const handleAreaClick = (id: string) => {
    onCategoryClick(id);
    document.getElementById("publications")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="border-y border-border bg-secondary/40 px-5 py-16 md:px-6 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Research</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              My work sits at the intersection of strategy, entrepreneurship, and artificial
              intelligence.
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-base leading-8 text-foreground/85">
              I use randomized field experiments, longitudinal data, computational methods, and
              theory development to understand how individuals and organizations reason under
              uncertainty. A central theme across my work is the complementarity between structured
              causal thinking and algorithmic discovery.
            </p>

            <div className="divide-y divide-border border-y border-border">
              {researchAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => handleAreaClick(area.id)}
                  className="group block w-full py-6 text-left"
                >
                  <div className="grid gap-4 md:grid-cols-[260px_1fr]">
                    <div>
                      <h3 className="text-lg font-semibold leading-7 text-foreground group-hover:text-primary">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                    <ul className="space-y-2 text-sm leading-6 text-foreground/80">
                      {area.questions.map((question) => (
                        <li key={question} className="pl-4">
                          <span className="-ml-4 mr-2 text-primary">-</span>
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid gap-5 text-sm leading-6 text-muted-foreground md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-base font-semibold text-foreground">Cross-Cutting Themes</h3>
                <p>
                  Human-AI complementarity, causal inference, theory generation, entrepreneurial
                  cognition, and the strategic use of anomalous evidence.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-foreground">Methods</h3>
                <p>
                  Randomized controlled trials, longitudinal field studies, causal discovery,
                  machine learning, and computational modeling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchAgenda;
