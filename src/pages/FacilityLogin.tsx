import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Shield,
  Lock,
  Building2,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Layers,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const features = [
  { icon: Shield, text: "256-bit encrypted sessions" },
  { icon: Layers, text: "Role-based access control" },
  { icon: Users, text: "Multi-department workspace" },
];

const FacilityLogin = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginId.trim() || !password.trim()) {
      setError("Please enter your login ID and password.");
      return;
    }

    setLoading(true);
    // Simulated login
    setTimeout(() => {
      setLoading(false);
      navigate("/staff-portal", {
        state: {
          staffName: "Staff Member",
          loginId,
          role: "Doctor",
          department: "General Medicine",
          facilityName: "Lagos General Hospital",
        },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />

        {/* Decorative shapes */}
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                HIS<span className="text-white/60">.Pro</span>
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-3">
                Your facility workspace awaits
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-sm">
                Sign in with the credentials provided by your facility administrator to access your clinical workspace.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <f.icon className="h-4 w-4 text-white/80" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} HIS.Pro — HIPAA & HL7 compliant
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <HeartPulse className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-gradient">HIS</span><span className="text-foreground">.Pro</span>
            </span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Staff Sign In</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the credentials provided by your administrator
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Login ID or Work Email
              </Label>
              <Input
                placeholder="e.g. sarah.johnson412"
                value={loginId}
                onChange={(e) => { setLoginId(e.target.value); setError(""); }}
                className="mt-1.5 h-11"
                autoComplete="username"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="h-11 pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-11 gradient-cta text-primary-foreground border-0 gap-2 font-semibold text-sm shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50">
            <div className="flex items-start gap-2.5">
              <Lock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">First time signing in?</span>{" "}
                  Use the login ID and temporary password provided by your facility administrator. You'll be prompted to set a new password.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Need help?{" "}
            <a href="#" className="text-primary font-medium hover:underline">Contact your admin</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FacilityLogin;
