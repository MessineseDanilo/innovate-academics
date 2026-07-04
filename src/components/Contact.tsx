import { Building2, FileDown, GraduationCap, Mail } from "lucide-react";

const Contact = () => {
  const links = [
    {
      icon: Mail,
      label: "danilo.messinese@ie.edu",
      href: "mailto:danilo.messinese@ie.edu",
    },
    {
      icon: GraduationCap,
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=p5Wj5nkAAAAJ&hl=en&authuser=1&oi=ao",
    },
    {
      icon: FileDown,
      label: "CV",
      href: "/Messinese Danilo_Academic_cv_Jul 26.pdf",
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-secondary/40 px-5 py-7 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
          <div>
            <h2 className="text-[24px] font-normal leading-tight text-foreground md:text-[19px] md:font-semibold">Contact</h2>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="grid gap-3 text-[13.5px] leading-5 text-foreground sm:grid-cols-3 md:text-[12.5px] md:text-muted-foreground">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-w-0 items-center gap-2 transition-colors hover:text-foreground"
                >
                  <item.icon size={14} className="shrink-0" />
                  <span className="break-words sm:truncate">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-start gap-2 text-[13.5px] leading-5 text-foreground md:text-[12.5px] md:text-muted-foreground">
              <Building2 className="mt-1 h-4 w-4 shrink-0" />
              <p>
                IE Business School, Strategy Department. IE Tower, Office 22.09, Madrid, Spain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
