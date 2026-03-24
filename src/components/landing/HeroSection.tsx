import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden hero-pattern">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Now available in Africa & expanding globally
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Build Your Custom{" "}
            <span className="text-gradient">Health Information System</span>{" "}
            — In Minutes
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Empower your clinic or hospital with a fully modular, cloud-powered HIS tailored to your needs. Select workflows, choose modules, and go live today.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button size="lg" className="gradient-cta text-primary-foreground shadow-xl animate-pulse-glow border-0 gap-2 text-base px-8">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 border-primary/30 text-foreground hover:bg-primary/5">
              <Play className="h-4 w-4" /> Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" /> Setup in 5 minutes
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative animate-float">
            {/* Main dashboard mockup */}
            <div className="glass-card rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-cta-warm/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <span className="ml-2 text-xs text-muted-foreground">HIS.Pro Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Patients Today", value: "147", color: "bg-primary/10 text-primary" },
                  { label: "Appointments", value: "52", color: "bg-accent/10 text-accent" },
                  { label: "Lab Results", value: "38", color: "bg-cta-warm/10 text-cta-warm" },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl p-3 ${stat.color}`}>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs opacity-70 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {["Dr. Amina Yusuf — OPD Consultation", "Lab: CBC for Patient #1042", "Pharmacy: Prescription Ready"].map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Floating module card */}
            <div className="absolute -bottom-4 -left-8 glass-card rounded-xl p-4 shadow-xl w-48">
              <p className="text-xs text-muted-foreground mb-1">Active Modules</p>
              <div className="flex flex-wrap gap-1.5">
                {["OPD", "Lab", "Pharmacy", "Billing"].map((m) => (
                  <span key={m} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
