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
      href: "/Messinese Danilo_Academic_cv_October 2025.pdf",
    },
  ];

  return (
    <section id="contact" className="border-t border-border bg-secondary/40 px-4 py-8 md:px-6 md:py-10 scroll-mt-24">
      <div className="mx-auto max-w-[940px]">
        <div className="grid gap-5 md:grid-cols-[170px_1fr] md:gap-8">
          <div>
            <h2 className="text-[19px] font-semibold text-foreground">Contact</h2>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="grid gap-3 text-[12.5px] leading-5 text-muted-foreground sm:grid-cols-3">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-w-0 items-center gap-2 transition-colors hover:text-foreground"
                >
                  <item.icon size={14} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-start gap-2 text-[12.5px] leading-5 text-muted-foreground">
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
