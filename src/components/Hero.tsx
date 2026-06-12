import { FileDown, Mail, MapPin } from "lucide-react";
import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  return (
    <section id="home" className="px-5 pb-16 pt-28 md:px-6 md:pb-20 md:pt-32 scroll-mt-24">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_280px] md:items-start">
        <div className="space-y-7">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Assistant Professor of Strategy, IE Business School
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Danilo Messinese
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              I study how data and artificial intelligence shape strategic decision-making,
              innovation, and entrepreneurship.
            </p>
          </div>

          <div className="space-y-4 text-base leading-8 text-foreground/85">
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
            <a
              href="mailto:danilo.messinese@ie.edu"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail size={16} />
              danilo.messinese@ie.edu
            </a>
            <a
              href="/Messinese Danilo_Academic_cv_October 2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <FileDown size={16} />
              CV
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} />
              Madrid, Spain
            </span>
          </div>
        </div>

        <aside className="space-y-4 md:pt-2">
          <img
            src={professorPortrait}
            alt="Danilo Messinese"
            className="aspect-[4/5] w-full max-w-[280px] rounded-sm object-cover shadow-elegant"
          />
          <div className="max-w-[280px] space-y-1 text-sm leading-6 text-muted-foreground">
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
