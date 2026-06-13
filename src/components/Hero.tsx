import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="px-4 pb-8 pt-20 md:px-6 md:pb-12 md:pt-28 scroll-mt-24">
      <div className="mx-auto grid max-w-[1160px] gap-7 md:grid-cols-[360px_1fr] md:items-start md:gap-12">
        <aside className="hidden space-y-3 md:block md:pt-1">
          <img
            src={professorPortrait}
            alt="Danilo Messinese"
            className="aspect-[4/5] w-full max-w-[360px] rounded-[2px] object-cover shadow-elegant"
          />
          <div className="max-w-[360px] space-y-1 text-[12.5px] leading-5 text-muted-foreground">
            <p className="font-medium text-foreground">IE Business School</p>
            <p>Strategy Department</p>
            <p>IE Tower, Office 22.09</p>
          </div>
        </aside>

        <div className="space-y-4 md:space-y-5">
          <div className="space-y-2.5">
            <h1 className="text-[30px] font-semibold leading-[1.12] text-foreground md:text-[38px]">
              Danilo Messinese
            </h1>
            <p className="max-w-[720px] text-[14px] leading-[1.55] text-muted-foreground md:text-[14.5px] md:leading-[1.65]">
              I study how human and artificial intelligence shape strategic decision-making,
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

          <div className="max-w-[720px] space-y-2.5 text-[13.5px] leading-[1.55] text-foreground md:space-y-3 md:text-[14px] md:leading-[1.65]">
            <p>
              Danilo is a professor in the strategy area at IE Business School.
              His research focuses on how data and artificial intelligence (AI) impact firm
              decisions, and the implications for how firms and startups navigate and shape their
              information landscape. He combines experimental and formal models to study these
              questions.
            </p>
            <p>
              Danilo holds degrees in Theoretical Physics and Mathematical Finance from the University of
              Bologna, and a Ph.D. in Management from Bocconi University. Before academia, he worked
              at Bain & Company and UniCredit Group. He co-organizes IEStrat, an annual conference on
              strategy and AI at IE Business School.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
