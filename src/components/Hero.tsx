import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="px-4 pb-8 pt-20 md:px-6 md:pb-12 md:pt-28 scroll-mt-24">
      <div className="mx-auto grid max-w-[1160px] gap-7 md:grid-cols-[1fr_300px] md:items-start md:gap-12">
        <div className="space-y-4 md:space-y-5">
          <div className="space-y-2.5">
            <p className="text-[12.5px] font-semibold text-muted-foreground">
              Assistant Professor of Strategy, IE Business School
            </p>
            <h1 className="text-[30px] font-semibold leading-[1.12] text-foreground md:text-[38px]">
              Danilo Messinese
            </h1>
            <p className="max-w-[720px] text-[14px] leading-[1.55] text-muted-foreground md:text-[14.5px] md:leading-[1.65]">
              I study how data and artificial intelligence shape strategic decision-making,
              innovation, and entrepreneurship.
            </p>
          </div>

          <div className="md:hidden">
            <img
              src={professorPortrait}
              alt="Danilo Messinese"
              className="aspect-[4/5] w-full max-w-[220px] rounded-[2px] object-cover shadow-elegant"
            />
          </div>

          <div className="max-w-[760px] space-y-2.5 text-[13.5px] leading-[1.55] text-foreground/85 md:space-y-3 md:text-[14px] md:leading-[1.65]">
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

        <aside className="hidden space-y-3 md:block md:pt-1">
          <img
            src={professorPortrait}
            alt="Danilo Messinese"
            className="aspect-[4/5] w-full max-w-[300px] rounded-[2px] object-cover shadow-elegant"
          />
          <div className="max-w-[300px] space-y-1 text-[12.5px] leading-5 text-muted-foreground">
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
