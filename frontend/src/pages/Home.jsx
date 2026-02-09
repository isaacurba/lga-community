import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Building2, ArrowRight, Activity, Database, Globe2, BadgeCheck } from "lucide-react";

const features = [
  {
    Icon: Users,
    title: "Citizen Registry",
    description: "Secure digital enrollment and record keeping for all local residents.",
    colorClasses: "bg-sky-100 text-sky-700",
  },
  {
    Icon: Shield,
    title: "Identity Verification",
    description: "Real-time NIN verification and status tracking to prevent fraud.",
    colorClasses: "bg-emerald-100 text-emerald-700",
  },
  {
    Icon: Building2,
    title: "Administrative Tools",
    description: "Comprehensive dashboard for staff to manage LGA operations efficiently.",
    colorClasses: "bg-amber-100 text-amber-700",
  },
];

const stats = [
  { label: "Active LGAs", value: "128" },
  { label: "Verified Records", value: "1.8M" },
  { label: "Avg. Verification", value: "12s" },
];

const steps = [
  { Icon: Database, title: "Enroll", desc: "Capture citizen data with guided forms and validation." },
  { Icon: BadgeCheck, title: "Verify", desc: "Cross-check NIN in real time with audit trails." },
  { Icon: Activity, title: "Operate", desc: "Manage services, approvals, and staff workflows." },
];

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 px-4 py-16 md:py-24">
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
            <div className="absolute top-32 -left-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                Official Government Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                Identity & Services <span className="text-primary">Built for Local Government</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                A secure, centralized platform to verify citizens, streamline enrollments, and make local service delivery transparent and measurable.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 text-base gap-2"
                  onClick={() => navigate("/documentation")}
                >
                  View our Docs
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Link to="/login">
                  <Button size="lg" className="bg-primary text-primary-foreground h-12 px-8 text-base">
                    Login to your Portal
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border bg-card/60 px-3 py-4 text-center">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border bg-card/80 shadow-lg backdrop-blur-md p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-foreground">Live Operations</div>
                  <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                    Active
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Globe2 className="h-5 w-5 text-sky-600" />
                      <div>
                        <div className="text-sm font-medium">LGA Service Window</div>
                        <div className="text-xs text-muted-foreground">Registry + Permits</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">98% uptime</div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="text-sm font-medium">Verification Queue</div>
                        <div className="text-xs text-muted-foreground">Auto-checks enabled</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2,814 processed</div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-amber-600" />
                      <div>
                        <div className="text-sm font-medium">Department Sync</div>
                        <div className="text-xs text-muted-foreground">Finance + Health</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Real-time</div>
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="text-xs text-muted-foreground mb-2">Today</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-md bg-background px-3 py-2 text-center">
                      <div className="text-sm font-semibold">312</div>
                      <div className="text-[11px] text-muted-foreground">Enrollments</div>
                    </div>
                    <div className="rounded-md bg-background px-3 py-2 text-center">
                      <div className="text-sm font-semibold">79</div>
                      <div className="text-[11px] text-muted-foreground">Approvals</div>
                    </div>
                    <div className="rounded-md bg-background px-3 py-2 text-center">
                      <div className="text-sm font-semibold">14</div>
                      <div className="text-[11px] text-muted-foreground">Alerts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col p-6 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className={`w-fit p-3 rounded-full mb-4 ${feature.colorClasses}`}>
                  <feature.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 p-8">
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="rounded-xl bg-background p-3 shadow-sm border">
                    <step.Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Home;
