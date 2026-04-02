import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Building2, User, Mail, Lock, Phone, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const modules = [
  { id: "opd", label: "OPD", desc: "Outpatient Department" },
  { id: "ipd", label: "IPD", desc: "Inpatient Department" },
  { id: "lab", label: "Laboratory", desc: "Lab & Diagnostics" },
  { id: "pharmacy", label: "Pharmacy", desc: "Drug Dispensing" },
  { id: "billing", label: "Billing", desc: "Invoicing & Payments" },
  { id: "ehr", label: "EHR", desc: "Electronic Health Records" },
  { id: "radiology", label: "Radiology", desc: "Imaging & Scans" },
  { id: "inventory", label: "Inventory", desc: "Stock Management" },
];

const GetStarted = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState<string[]>(["opd", "billing"]);
  const [form, setForm] = useState({
    facilityName: "",
    facilityType: "clinic",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    country: "",
  });

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const updateForm = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canProceed =
    step === 1
      ? selectedModules.length > 0
      : step === 2
      ? form.facilityName && form.facilityType
      : form.fullName && form.email && form.password;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-gradient">HIS</span>
            <span className="text-foreground">.Pro</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step > s
                    ? "gradient-cta text-primary-foreground"
                    : step === s
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 sm:w-24 h-1 rounded-full transition-all duration-300 ${
                    step > s ? "bg-accent" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8 text-xs text-muted-foreground mb-12 -mt-4">
          <span className={step >= 1 ? "text-foreground font-medium" : ""}>Select Modules</span>
          <span className={step >= 2 ? "text-foreground font-medium" : ""}>Facility Info</span>
          <span className={step >= 3 ? "text-foreground font-medium" : ""}>Your Account</span>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Module Selection */}
          {step === 1 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                  Choose Your <span className="text-gradient">Modules</span>
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Select the modules you need. You can always add or remove them later.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {modules.map((mod) => {
                  const selected = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`group relative glass-card rounded-xl p-5 text-left transition-all duration-200 border-2 ${
                        selected
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-transparent hover:border-primary/30"
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                      <p className="font-bold text-sm text-foreground">{mod.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{mod.desc}</p>
                    </button>
                  );
                })}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {selectedModules.length} module{selectedModules.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          )}

          {/* Step 2: Facility Info */}
          {step === 2 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                  Tell Us About Your <span className="text-gradient">Facility</span>
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We'll customize your HIS based on your facility type and size.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="facilityName" className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" /> Facility Name
                  </Label>
                  <Input
                    id="facilityName"
                    placeholder="e.g. Sunrise Medical Centre"
                    value={form.facilityName}
                    onChange={(e) => updateForm("facilityName", e.target.value)}
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Facility Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["clinic", "hospital", "lab"].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateForm("facilityType", type)}
                        className={`rounded-xl py-3 px-4 text-sm font-medium capitalize transition-all border-2 ${
                          form.facilityType === type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border/60 text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="e.g. Kenya"
                    value={form.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Account */}
          {step === 3 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                  Create Your <span className="text-gradient">Account</span>
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You're almost there! Set up your admin account to get started.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Dr. Amina Yusuf"
                    value={form.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="amina@hospital.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" /> Phone (optional)
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+254 700 000 000"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" /> Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={(e) => updateForm("password", e.target.value)}
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 max-w-md mx-auto">
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="gap-2 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed}
              className="gradient-cta text-primary-foreground border-0 shadow-lg gap-2 px-8"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              disabled={!canProceed}
              onClick={() =>
                navigate("/setting-up", {
                  state: { ...form, selectedModules },
                })
              }
              className="gradient-cta text-primary-foreground border-0 shadow-xl gap-2 px-8 animate-pulse-glow"
            >
              Launch My HIS <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Summary sidebar on step 3 */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 max-w-md mx-auto glass-card rounded-xl p-5"
          >
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Your Setup Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Facility</span>
                <span className="font-medium text-foreground">{form.facilityName || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium text-foreground capitalize">{form.facilityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modules</span>
                <span className="font-medium text-foreground">{selectedModules.length} selected</span>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-end mt-1">
                {selectedModules.map((id) => (
                  <span key={id} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">
                    {modules.find((m) => m.id === id)?.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
