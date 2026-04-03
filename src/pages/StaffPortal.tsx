import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  ClipboardList,
  CalendarDays,
  FileText,
  Pill,
  FlaskConical,
  Activity,
  Clock,
  ArrowRight,
  Bell,
  Search,
  Settings,
  LogOut,
  LayoutDashboard,
  HeartPulse,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  User,
  BedDouble,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

const quickActions = [
  { label: "New Consultation", icon: Stethoscope, color: "bg-blue-500/10 text-blue-600" },
  { label: "Patient Lookup", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Write Prescription", icon: Pill, color: "bg-purple-500/10 text-purple-600" },
  { label: "Order Lab Test", icon: FlaskConical, color: "bg-cyan-500/10 text-cyan-600" },
  { label: "View Schedule", icon: CalendarDays, color: "bg-amber-500/10 text-amber-600" },
  { label: "Medical Records", icon: FileText, color: "bg-emerald-500/10 text-emerald-600" },
];

const upcomingAppointments = [
  { patient: "Adewale Okonkwo", time: "9:00 AM", type: "Follow-up", status: "confirmed" },
  { patient: "Fatima Ibrahim", time: "9:30 AM", type: "New Patient", status: "confirmed" },
  { patient: "James Okoro", time: "10:15 AM", type: "Lab Review", status: "pending" },
  { patient: "Blessing Adekunle", time: "11:00 AM", type: "Check-up", status: "confirmed" },
  { patient: "Emeka Nwosu", time: "11:45 AM", type: "Consultation", status: "pending" },
];

const recentActivity = [
  { action: "Completed consultation", patient: "Mary Chukwu", time: "2 min ago", icon: CheckCircle2 },
  { action: "Prescription sent to pharmacy", patient: "Usman Bello", time: "15 min ago", icon: Pill },
  { action: "Lab results received", patient: "Grace Obi", time: "1 hr ago", icon: FlaskConical },
  { action: "Admitted to ward", patient: "David Ajayi", time: "2 hrs ago", icon: BedDouble },
];

const alerts = [
  { text: "3 lab results pending review", severity: "warning" as const },
  { text: "Drug interaction alert — Patient #4821", severity: "critical" as const },
];

const StaffPortal = () => {
  const location = useLocation();
  const data = (location.state as Record<string, unknown>) || {};
  const staffName = (data.staffName as string) || "Dr. Sarah Johnson";
  const role = (data.role as string) || "Doctor";
  const department = (data.department as string) || "General Medicine";
  const facilityName = (data.facilityName as string) || "Lagos General Hospital";

  const firstName = staffName.split(" ").pop() || staffName.split(" ")[0];
  const initials = staffName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }} animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="hidden lg:flex flex-col w-64 border-r border-border bg-card"
      >
        <div className="p-5 border-b border-border">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            <span className="text-gradient">HIS</span><span className="text-foreground">.Pro</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{facilityName}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <SidebarLink icon={LayoutDashboard} label="My Dashboard" active />
          <SidebarLink icon={Users} label="Patients" />
          <SidebarLink icon={CalendarDays} label="Schedule" />
          <SidebarLink icon={Stethoscope} label="Consultations" />
          <SidebarLink icon={ClipboardList} label="Tasks" />
          <div className="pt-3 pb-1 px-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Tools</p>
          </div>
          <SidebarLink icon={Pill} label="Prescriptions" />
          <SidebarLink icon={FlaskConical} label="Lab Orders" />
          <SidebarLink icon={FileText} label="Medical Records" />
          <SidebarLink icon={MessageSquare} label="Messages" badge="3" />
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <SidebarLink icon={Settings} label="Preferences" />
          <SidebarLink icon={LogOut} label="Sign Out" />
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-6"
        >
          <div className="flex items-center gap-3">
            <div className="lg:hidden text-xl font-extrabold tracking-tight">
              <span className="text-gradient">HIS</span><span className="text-foreground">.Pro</span>
            </div>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients, records…" className="pl-9 h-9 w-72 bg-muted/50 border-0" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xs">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-tight">{staffName}</p>
                <p className="text-[11px] text-muted-foreground">{role} · {department}</p>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">
            {/* Greeting */}
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {greeting}, <span className="text-gradient">Dr. {firstName}</span>
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  <span className="text-border">·</span>
                  <span className="text-sm">{upcomingAppointments.length} appointments today</span>
                </p>
              </div>
              <Button className="gradient-cta text-primary-foreground border-0 gap-2 shadow-lg">
                <Stethoscope className="h-4 w-4" /> Start Consultation
              </Button>
            </motion.div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <motion.div variants={item} className="space-y-2">
                {alerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${
                      alert.severity === "critical"
                        ? "bg-destructive/5 border-destructive/20 text-destructive"
                        : "bg-amber-50 border-amber-200 text-amber-700"
                    }`}
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {alert.text}
                    <Button variant="ghost" size="sm" className="ml-auto text-xs h-7">Review</Button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Quick actions */}
            <motion.div variants={item}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md transition-all group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-foreground text-center leading-tight">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Appointments */}
              <motion.div variants={item} className="lg:col-span-3">
                <Card className="border-border/60 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-bold flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" /> Today's Schedule
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                        View All <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {upcomingAppointments.map((appt, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/40 transition-colors group"
                      >
                        <div className="w-14 text-center shrink-0">
                          <p className="text-xs font-bold text-foreground">{appt.time}</p>
                        </div>
                        <div className="w-px h-8 bg-border/60" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{appt.patient}</p>
                          <p className="text-[11px] text-muted-foreground">{appt.type}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          appt.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        }`}>
                          {appt.status === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-7">
                          Open
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats + Activity */}
              <motion.div variants={item} className="lg:col-span-2 space-y-4">
                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border-border/60">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-xl font-extrabold text-foreground">24</p>
                      <p className="text-[11px] text-muted-foreground">Patients Today</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/60">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="h-5 w-5 text-accent" />
                      </div>
                      <p className="text-xl font-extrabold text-foreground">18</p>
                      <p className="text-[11px] text-muted-foreground">Completed</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent activity */}
                <Card className="border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-primary" /> Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivity.map((act, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                          <act.icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">{act.action}</p>
                          <p className="text-[11px] text-muted-foreground">{act.patient} · {act.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, active, badge }: { icon: React.ElementType; label: string; active?: boolean; badge?: string }) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`}
  >
    <Icon className="h-4 w-4 shrink-0" />
    <span className="flex-1 text-left">{label}</span>
    {badge && (
      <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

export default StaffPortal;
