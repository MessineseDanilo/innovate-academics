import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="scroll-mt-24 px-4 pb-8 pt-20 md:flex md:flex-1 md:items-start md:px-8 md:pb-4 md:pt-[72px]">
      <div className="mx-auto w-full max-w-[1160px] space-y-7 md:space-y-5">
        <h1 className="text-[30px] font-normal leading-[1.12] text-foreground md:text-[38px]">
          Danilo Messinese
        </h1>

        <div className="grid gap-7 md:grid-cols-[minmax(320px,350px)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-[86px]">
          <aside>
            <img
              src={professorPortrait}
              alt="Danilo Messinese"
              className="aspect-[4/5] w-full max-w-[260px] rounded-[2px] object-cover shadow-elegant md:max-w-[350px]"
            />
          </aside>

          <div className="space-y-2 text-[14px] leading-[1.55] text-foreground md:pt-1 md:text-[15px] md:leading-[1.4] md:[text-align:justify]">
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
