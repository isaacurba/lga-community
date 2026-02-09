import { Link } from "react-router-dom";
import { ArrowRight, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-24 -left-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold bg-primary/10 text-primary">
                <ShieldAlert className="h-4 w-4" />
                Page Not Found
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                This route doesn’t exist in the LGA network.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                The page you’re looking for has moved, was retired, or never existed. You can return to the home page or open the documentation to continue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/">
                  <Button size="lg" className="h-12 px-8 text-base gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/documentation">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2">
                    View Documentation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border bg-card/80 shadow-lg backdrop-blur-md p-6 space-y-4">
              <div className="text-sm font-semibold">Suggested Destinations</div>
              <div className="grid gap-3">
                <Link to="/" className="flex items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm">
                  <span className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Home Dashboard
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link to="/documentation" className="flex items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm">
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-primary" />
                    Project Documentation
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link to="/login" className="flex items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm">
                  <span className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Access Portal
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
                If you reached this page from a public link, the service may have been relocated. Check the documentation for the updated navigation paths.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound
