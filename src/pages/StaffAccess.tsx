import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Shield,
  LinkIcon,
  Copy,
  Check,
  X,
  Search,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
  Activity,
  CalendarDays,
  Layers,
  Stethoscope,
  FlaskConical,
  Pill,
  Receipt,
  FileHeart,
  ScanLine,
  Package,
  BedDouble,
  Eye,
  EyeOff,
  ChevronDown,
  Building2,
  UserCheck,
  Mail,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const moduleIcons: Record<string, React.ElementType> = {
  opd: Stethoscope, ipd: BedDouble, lab: FlaskConical, pharmacy: Pill,
  billing: Receipt, ehr: FileHeart, radiology: ScanLine, inventory: Package,
};
const moduleLabels: Record<string, string> = {
  opd: "OPD", ipd: "IPD", lab: "Laboratory", pharmacy: "Pharmacy",
  billing: "Billing", ehr: "EHR", radiology: "Radiology", inventory: "Inventory",
};

const roles = ["Doctor", "Nurse", "Receptionist", "Pharmacist", "Lab Technician", "Radiologist", "Admin"];
const departments = ["General Medicine", "Pediatrics", "Surgery", "Emergency", "Obstetrics", "Orthopedics", "Cardiology", "Pharmacy", "Laboratory", "Radiology", "Front Desk"];

const roleBadgeColors: Record<string, string> = {
  Doctor: "bg-blue-100 text-blue-700 border-blue-200",
  Nurse: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Receptionist: "bg-amber-100 text-amber-700 border-amber-200",
  Pharmacist: "bg-purple-100 text-purple-700 border-purple-200",
  "Lab Technician": "bg-cyan-100 text-cyan-700 border-cyan-200",
  Radiologist: "bg-rose-100 text-rose-700 border-rose-200",
  Admin: "bg-slate-100 text-slate-700 border-slate-200",
};

interface StaffMember {
  id: string;
  fullName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  loginId: string;
  tempPassword: string;
  createdAt: Date;
}

function generateLoginId(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, ".").replace(/[^a-z.]/g, "");
  return slug + Math.floor(100 + Math.random() * 900);
}
function generateTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const StaffAccess = () => {
  const location = useLocation();
  const data = (location.state as Record<string, unknown>) || {};
  const facilityName = (data.facilityName as string) || "My Facility";
  const facilityType = (data.facilityType as string) || "clinic";
  const selectedModules = (data.selectedModules as string[]) || ["opd", "billing"];
  const fullName = (data.fullName as string) || "Admin";

  const facilitySlug = facilityName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const loginLink = `https://his.pro/login/${facilitySlug}`;

  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ fullName: "", role: "", department: "", email: "", phone: "" });
  const [justCreated, setJustCreated] = useState<StaffMember | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddStaff = () => {
    if (!newStaff.fullName || !newStaff.role || !newStaff.department) return;
    const member: StaffMember = {
      id: crypto.randomUUID(),
      ...newStaff,
      loginId: generateLoginId(newStaff.fullName),
      tempPassword: generateTempPassword(),
      createdAt: new Date(),
    };
    setStaffList((prev) => [member, ...prev]);
    setJustCreated(member);
    setNewStaff({ fullName: "", role: "", department: "", email: "", phone: "" });
    setShowAddModal(false);
  };

  const rolesProvisioned = new Set(staffList.map((s) => s.role)).size;
  const filteredStaff = staffList.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <p className="text-xs text-muted-foreground mt-1 capitalize">{facilityType} Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <SidebarLink icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
          <SidebarLink icon={Users} label="Staff & Access" active />
          <SidebarLink icon={Activity} label="Analytics" />
          <SidebarLink icon={CalendarDays} label="Appointments" />
          <div className="pt-3 pb-1 px-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Modules</p>
          </div>
          {selectedModules.map((id) => {
            const Icon = moduleIcons[id] || Layers;
            return <SidebarLink key={id} icon={Icon} label={moduleLabels[id] || id} />;
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <SidebarLink icon={Settings} label="Settings" />
          <SidebarLink icon={LogOut} label="Log Out" />
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
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm">
              {fullName.charAt(0).toUpperCase()}
            </div>
          </div>
        </motion.header>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">
            {/* Page header */}
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{facilityName}</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Staff & Access</h1>
              </div>
              <Button onClick={() => setShowAddModal(true)} className="gradient-cta text-primary-foreground border-0 gap-2 shadow-lg">
                <UserPlus className="h-4 w-4" /> Add Staff
              </Button>
            </motion.div>

            {/* Summary cards */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-border/60">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-foreground">{staffList.length}</p>
                    <p className="text-xs text-muted-foreground">Staff Accounts</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-foreground">{rolesProvisioned}</p>
                    <p className="text-xs text-muted-foreground">Roles Provisioned</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground font-medium">Staff Login Link</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1.5 rounded-lg flex-1 truncate text-foreground font-mono">
                      {loginLink}
                    </code>
                    <Button
                      variant="ghost" size="icon" className="h-8 w-8 shrink-0"
                      onClick={() => handleCopy(loginLink, "link")}
                    >
                      {copiedField === "link" ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Credential handoff card */}
            <AnimatePresence>
              {justCreated && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                >
                  <Card className="border-accent/30 bg-accent/5 shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <UserCheck className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm">Staff Account Created</p>
                            <p className="text-xs text-muted-foreground">{justCreated.fullName} — {justCreated.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setJustCreated(null)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <CredentialBlock label="Login Link" value={loginLink} field="cred-link" copiedField={copiedField} onCopy={handleCopy} />
                        <CredentialBlock label="Login ID" value={justCreated.loginId} field="cred-id" copiedField={copiedField} onCopy={handleCopy} />
                        <CredentialBlock label="Temp Password" value={justCreated.tempPassword} field="cred-pw" copiedField={copiedField} onCopy={handleCopy} sensitive />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-3">
                        Share these credentials securely with the staff member. They will be prompted to change their password on first login.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Staff directory */}
            <motion.div variants={item}>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-base font-bold">Staff Directory</CardTitle>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search staff…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 bg-muted/50 border-0"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredStaff.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-2xl bg-muted/80 flex items-center justify-center mx-auto mb-4">
                        <Users className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <p className="font-semibold text-foreground mb-1">
                        {staffList.length === 0 ? "No staff accounts yet" : "No results found"}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {staffList.length === 0
                          ? "Add your first staff member to get started."
                          : "Try a different search term."}
                      </p>
                      {staffList.length === 0 && (
                        <Button onClick={() => setShowAddModal(true)} variant="outline" className="gap-2">
                          <UserPlus className="h-4 w-4" /> Add First Staff
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Table header */}
                      <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        <div className="col-span-3">Name</div>
                        <div className="col-span-2">Role</div>
                        <div className="col-span-2">Department</div>
                        <div className="col-span-2">Login ID</div>
                        <div className="col-span-2">Contact</div>
                        <div className="col-span-1"></div>
                      </div>
                      {filteredStaff.map((member, i) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-3 px-4 py-3 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-muted/30 transition-all items-center"
                        >
                          <div className="col-span-3 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                              {member.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-foreground">{member.fullName}</p>
                              <p className="text-[11px] text-muted-foreground md:hidden">{member.role} · {member.department}</p>
                            </div>
                          </div>
                          <div className="col-span-2 hidden md:block">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${roleBadgeColors[member.role] || "bg-muted text-foreground border-border"}`}>
                              {member.role}
                            </span>
                          </div>
                          <div className="col-span-2 hidden md:block text-sm text-muted-foreground">{member.department}</div>
                          <div className="col-span-2 hidden md:block">
                            <code className="text-xs bg-muted px-2 py-1 rounded-md font-mono text-foreground">{member.loginId}</code>
                          </div>
                          <div className="col-span-2 hidden md:block text-xs text-muted-foreground">
                            {member.email && <span className="block truncate">{member.email}</span>}
                            {member.phone && <span className="block">{member.phone}</span>}
                          </div>
                          <div className="col-span-1 hidden md:flex justify-end">
                            <Button variant="ghost" size="sm" className="text-xs h-8">Manage</Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Add Staff Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <UserPlus className="h-5 w-5 text-primary" /> Add Staff Member
            </DialogTitle>
            <DialogDescription>
              Create an account and generate login credentials for a new staff member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name *</Label>
              <Input
                placeholder="Dr. Sarah Johnson"
                value={newStaff.fullName}
                onChange={(e) => setNewStaff((p) => ({ ...p, fullName: e.target.value }))}
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role *</Label>
                <Select value={newStaff.role} onValueChange={(v) => setNewStaff((p) => ({ ...p, role: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department *</Label>
                <Select value={newStaff.department} onValueChange={(v) => setNewStaff((p) => ({ ...p, department: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select dept" /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Work Email</Label>
              <Input
                type="email"
                placeholder="sarah@facility.com"
                value={newStaff.email}
                onChange={(e) => setNewStaff((p) => ({ ...p, email: e.target.value }))}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</Label>
              <Input
                placeholder="+234 800 000 0000"
                value={newStaff.phone}
                onChange={(e) => setNewStaff((p) => ({ ...p, phone: e.target.value }))}
                className="mt-1.5"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button
                className="flex-1 gradient-cta text-primary-foreground border-0"
                onClick={handleAddStaff}
                disabled={!newStaff.fullName || !newStaff.role || !newStaff.department}
              >
                Create Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, active, to }: { icon: React.ElementType; label: string; active?: boolean; to?: string }) => {
  const cls = `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }`;
  if (to) return <Link to={to} className={cls}><Icon className="h-4 w-4 shrink-0" />{label}</Link>;
  return <button className={cls}><Icon className="h-4 w-4 shrink-0" />{label}</button>;
};

const CredentialBlock = ({
  label, value, field, copiedField, onCopy, sensitive
}: {
  label: string; value: string; field: string; copiedField: string | null;
  onCopy: (text: string, field: string) => void; sensitive?: boolean;
}) => {
  const [show, setShow] = useState(!sensitive);
  return (
    <div className="bg-background rounded-lg p-3 border border-border/50">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      <div className="flex items-center gap-1.5">
        <code className="text-xs font-mono text-foreground flex-1 truncate">
          {show ? value : "••••••••••"}
        </code>
        {sensitive && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onCopy(value, field)}>
          {copiedField === field ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
    </div>
  );
};

export default StaffAccess;
