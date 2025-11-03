import { BookOpen, Users, Trophy, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import simulationImage from "@/assets/simulation.jpg";

const Teaching = () => {
  const courses = [
    {
      title: "Strategic Management & AI",
      level: "MBA Core",
      description: "Exploring how AI transforms strategic decision-making in modern organizations",
    },
    {
      title: "Entrepreneurship & Innovation",
      level: "PhD Seminar",
      description: "Advanced research methods in entrepreneurship and innovation studies",
    },
    {
      title: "Decision-Making Under Uncertainty",
      level: "Executive Education",
      description: "Practical frameworks for strategic decisions in complex environments",
    },
  ];

  const simulations = [
    {
      title: "AI Strategy Simulator",
      description: "Interactive game exploring AI implementation decisions in various business contexts",
      participants: "2,500+",
      icon: Play,
    },
    {
      title: "Venture Decision Lab",
      description: "Hands-on simulation of entrepreneurial decision-making and resource allocation",
      participants: "1,800+",
      icon: Trophy,
    },
  ];

  return (
    <section id="teaching" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Teaching & Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engaging students through innovative pedagogy and experiential learning
            </p>
          </div>

          {/* Courses */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <BookOpen className="text-primary" size={28} />
              <h3 className="text-2xl font-serif font-semibold">Courses</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card
                  key={course.title}
                  className="p-6 hover:shadow-hover transition-smooth animate-slide-in"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-accent uppercase tracking-wide">
                      {course.level}
                    </div>
                    <h4 className="text-lg font-serif font-semibold">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Simulation Games */}
          <div className="space-y-6 pt-12">
            <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Users className="text-primary" size={28} />
              <h3 className="text-2xl font-serif font-semibold">Interactive Simulation Games</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {simulations.map((sim, index) => (
                <Card
                  key={sim.title}
                  className="overflow-hidden hover:shadow-hover transition-smooth animate-slide-in"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <div className="relative h-48">
                    <img
                      src={simulationImage}
                      alt={sim.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-primary-foreground">
                      <sim.icon size={24} />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-xl font-serif font-semibold">{sim.title}</h4>
                      <p className="text-sm text-muted-foreground">{sim.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm">
                        <span className="font-semibold text-primary">{sim.participants}</span>
                        <span className="text-muted-foreground"> participants</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaching;
