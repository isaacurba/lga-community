import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import{ Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, BadgeCheck, ClipboardCheck, FileText, Globe2, Shield, Users, Building2, ArrowRight } from "lucide-react";

const highlights = [
  { label: "Active LGAs", value: "128" },
  { label: "Verified Records", value: "1.8M" },
  { label: "Avg. Verification", value: "12s" },
  { label: "Audit Confidence", value: "99.2%" },
];

const portals = [
  {
    title: "Staff Operations Portal",
    points: [
      "OTP-secured access for officials and supervisors.",
      "Register citizens, update records, and approve services.",
      "Monitor queues and resolve verification exceptions fast.",
      "Generate audit-ready reports per department or LGA.",
    ],
  },
  {
    title: "Citizen Access Portal",
    points: [
      "Secure sign-in for residents to view their profile.",
      "Track verification status and service requests.",
      "Receive official notices and renewal reminders.",
      "Self-service updates with approval workflow.",
    ],
  },
];

const processSteps = [
  { Icon: FileText, title: "Collect", desc: "Capture identity details with validation and evidence." },
  { Icon: BadgeCheck, title: "Verify", desc: "Check NIN status in real time with full audit trails." },
  { Icon: ClipboardCheck, title: "Approve", desc: "Route records to the right office for final sign-off." },
  { Icon: Activity, title: "Operate", desc: "Deliver services and track outcomes across departments." },
];

const safeguards = [
  "Role-based access keeps sensitive data restricted.",
  "Clear audit logs on every record and update.",
  "Data quality checks reduce duplicate and invalid entries.",
  "Traceable approvals to support transparency mandates.",
];

const Documentation = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-24 -left-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 md:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                LGA-Connect Documentation
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                A Living Record System for Local Government
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                LGA-Connect strengthens trust in local services by unifying identity verification, citizen records, and service delivery into one verified source of truth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start a Verification
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Explore Citizen Journeys
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-card/80 border shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Operations Snapshot</div>
                  <div className="text-xs text-muted-foreground">Real-time LGA activity</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-lg border bg-background px-4 py-3">
                    <div className="text-xl font-semibold">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Today:</span> 312 enrollments, 79 approvals, 14 alerts resolved.
              </div>
            </Card>
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {portals.map((portal) => (
            <Card key={portal.title} className="p-6 border rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{portal.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {portal.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-2xl border bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 p-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">How the System Works</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.title} className="bg-background rounded-xl border p-4 shadow-sm">
                <div className="rounded-lg bg-primary/10 text-primary w-fit p-2 mb-3">
                  <step.Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm text-muted-foreground">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <Card className="p-6 rounded-2xl border">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold">Trust & Safeguards</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {safeguards.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 rounded-2xl border">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-semibold">Impact the LGA Can Measure</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm font-semibold">Reduced Walk-ins</div>
                <div className="text-sm text-muted-foreground">Citizens complete requests digitally before arrival.</div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm font-semibold">Faster Verifications</div>
                <div className="text-sm text-muted-foreground">Real-time identity checks replace manual lookups.</div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm font-semibold">Transparent Audits</div>
                <div className="text-sm text-muted-foreground">Every record is traceable to staff actions.</div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm font-semibold">Service Equity</div>
                <div className="text-sm text-muted-foreground">Consistent delivery across wards and departments.</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <Card className="p-6 rounded-2xl border bg-muted/20">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Ready to deploy in your LGA?</div>
              <div className="text-2xl font-semibold mb-2">Bring every citizen record into one verified system.</div>
              <div className="text-sm text-muted-foreground">
                LGA-Connect is built for consistent operations, audit readiness, and public trust.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <Button size="lg" className="h-12 px-8 text-base">Request an Onboarding</Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">Download Project Brief</Button>
            </div>
          </div>
        </Card>
      </section>
     </div>
    </>  
  );
};

export default Documentation;
