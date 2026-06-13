import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="scroll-mt-24 px-5 pb-7 pt-24 md:flex md:flex-1 md:items-center md:px-8 md:pb-4 md:pt-[72px]">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="grid gap-6 md:grid-cols-[minmax(320px,350px)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-[86px]">
          <aside>
            <img
              src={professorPortrait}
              alt="Danilo Messinese"
              className="mx-auto aspect-[4/5] w-full max-w-[300px] rounded-[2px] object-cover shadow-elegant md:mx-0 md:max-w-[350px]"
            />
          </aside>

          <div className="space-y-4 text-foreground md:pt-0">
            <h1 className="text-[32px] font-normal leading-[1.08] text-foreground md:text-[38px]">
              Danilo Messinese
            </h1>

            <div className="space-y-2.5 text-[14.5px] leading-[1.52] md:space-y-2 md:text-[15px] md:leading-[1.4] md:[text-align:justify]">
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
      </div>
    </section>
  );
};

export default Hero;
