import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="px-4 pb-8 pt-20 md:flex md:flex-1 md:items-center md:px-6 md:py-24 scroll-mt-24">
      <div className="mx-auto grid max-w-[1160px] gap-7 md:grid-cols-[360px_1fr] md:items-start md:gap-12">
        <aside className="hidden space-y-3 md:block md:pt-1">
          <img
            src={professorPortrait}
            alt="Danilo Messinese"
            className="aspect-[4/5] w-full max-w-[360px] rounded-[2px] object-cover shadow-elegant"
          />
        </aside>

        <div className="space-y-4 md:space-y-5">
          <div className="space-y-2.5">
            <h1 className="text-[30px] font-semibold leading-[1.12] text-foreground md:text-[38px]">
              Danilo Messinese
            </h1>
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
              His research focuses on how data and artificial intelligence (AI) impact firm and
              startup decisions, and the implications for how they navigate and shape the
              information landscape to innovate. He usually leverages field experiments and formal
              models to explore these questions.
            </p>
            <p>
              Danilo holds degrees in Theoretical Physics and Mathematical Finance from the University of
              Bologna, and a Ph.D. in Management from Bocconi University. Before academia, he worked
              at Bain & Company and UniCredit Group. He co-organizes{" "}
              <a
                href="https://www.ie.edu/iestrat/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                IEStrat
              </a>
              , an annual conference on strategy and AI at IE Business School.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
