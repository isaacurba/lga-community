import { Link } from "react-router-dom";
import { Shield, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute top-16 -left-16 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_40%)]" />
        </div>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg ring-1 ring-white/10">
                <Shield className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold text-white">LGA-Connect</span>
                <span className="text-xs text-slate-300">Verified local identity system</span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm">
              One trusted platform for citizen identity, service delivery, and transparent local governance.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-200 bg-emerald-500/10 w-fit px-3 py-1 rounded-full ring-1 ring-emerald-400/20">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Live services operational
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">Quick Links</div>
            <div className="grid gap-2 text-sm text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link>
              <Link to="/login" className="hover:text-white transition-colors">Access Portal</Link>
              <Link to="/staff/register" className="hover:text-white transition-colors">Staff Onboarding</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">Contact</div>
            <div className="grid gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <Mail className="h-4 w-4 text-amber-300" />
                <span>support@lga-connect.gov</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <Phone className="h-4 w-4 text-amber-300" />
                <span>+234 (0) 700 LGA 0000</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <MapPin className="h-4 w-4 text-amber-300" />
                <span>Local Government Headquarters</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
          <p>&copy; {year} LGA-Connect. Secured & Official.</p>
          <p>Built to strengthen trust in local services.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
