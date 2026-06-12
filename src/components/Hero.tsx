import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="px-5 pb-10 pt-24 md:px-6 md:pb-12 md:pt-28 scroll-mt-24">
      <div className="mx-auto grid max-w-[940px] gap-9 md:grid-cols-[1fr_250px] md:items-start">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold text-muted-foreground">
              Assistant Professor of Strategy, IE Business School
            </p>
            <h1 className="text-[32px] font-semibold leading-[1.12] text-foreground md:text-[38px]">
              Danilo Messinese
            </h1>
            <p className="max-w-[620px] text-[14.5px] leading-[1.65] text-muted-foreground">
              I study how data and artificial intelligence shape strategic decision-making,
              innovation, and entrepreneurship.
            </p>
          </div>

          <div className="max-w-[660px] space-y-3 text-[14px] leading-[1.65] text-foreground/85">
            <p>
              My research examines how human decision-makers and algorithms learn, reason, and
              adapt under uncertainty. I combine experimental and computational methods to study
              entrepreneurial strategy, theory-based reasoning, causal machine learning, and the
              role of anomalies in discovery and innovation.
            </p>
            <p>
              Viewing social scientific and business theories as causal structures, I investigate
              how AI can support managers, entrepreneurs, and scientists in challenging existing
              explanations through surprising evidence and generating new hypotheses. My work has
              appeared in leading management journals and has been featured in Harvard Business
              Review.
            </p>
            <p>
              Before academia, I worked at Bain & Company and UniCredit. I hold degrees in Physics,
              Theoretical Physics, and Mathematical Finance from the University of Bologna, and a
              Ph.D. in Management from Bocconi University.
            </p>
          </div>
        </div>

        <aside className="space-y-3 md:pt-1">
          <img
            src={professorPortrait}
            alt="Danilo Messinese"
            className="aspect-[4/5] w-full max-w-[250px] rounded-[2px] object-cover shadow-elegant"
          />
          <div className="max-w-[250px] space-y-1 text-[12.5px] leading-5 text-muted-foreground">
            <p className="font-medium text-foreground">IE Business School</p>
            <p>Strategy Department</p>
            <p>IE Tower, Office 22.09</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
