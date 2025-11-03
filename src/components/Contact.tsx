import { Mail, Linkedin, FileDown, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "professor@university.edu",
      link: "mailto:professor@university.edu",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      link: "https://linkedin.com/in/professor",
    },
    {
      icon: Building2,
      label: "Office",
      value: "Baker Library, Room 265",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always interested in new research collaborations and speaking opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <Card
                key={item.label}
                className="p-6 hover:shadow-hover transition-smooth animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-foreground hover:text-primary transition-smooth font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-8 flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="lg" variant="outline" className="group">
              <FileDown className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-smooth" />
              Download CV (PDF)
            </Button>
          </div>

          <div className="text-center pt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p>Harvard Business School</p>
            <p>Boston, MA 02163</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
