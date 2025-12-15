import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, FileText, Shield, Users, Server, Database } from "lucide-react";

const Documentation = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border-0 overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary/5 border-b p-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-2 text-primary">
            <div className="bg-primary/10 p-2 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none">Project Documentation</h2>
              <p className="text-xs text-muted-foreground mt-1">LGA-Connect Overview</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* 1. Overview */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5 text-primary" />
              Overview
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong>LGA-Connect</strong> is a full-stack GovTech solution designed to digitize and streamline record management for Nigerian Local Government Areas. It bridges the gap between officials and citizens by providing a secure, centralized platform for identity verification and efficient service delivery.
            </p>
          </section>

          <hr className="border-border/50" />

          {/* 2. Key Portals */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-blue-500" />
              Key Portals
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">🏛️ Staff Portal</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Secure administrative login with OTP.</li>
                  <li>Register new citizens into the registry.</li>
                  <li>Manage records via a dedicated dashboard.</li>
                  <li>Verify citizen identities securely.</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">👤 Citizen Portal</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Secure individual login access.</li>
                  <li>View digital profile and LGA data.</li>
                  <li>Self-service password resets.</li>
                  <li>Real-time verification status tracking.</li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-border/50" />

          {/* 3. Technical Stack */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Server className="w-5 h-5 text-purple-500" />
              Technical Architecture    
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-card rounded-md border text-center">
                <div className="font-bold text-primary">Frontend</div>
                <div className="text-xs text-muted-foreground mt-1">React + Vite</div>
              </div>
              <div className="p-3 bg-card rounded-md border text-center">
                <div className="font-bold text-primary">Styling</div>
                <div className="text-xs text-muted-foreground mt-1">Tailwind + Shadcn</div>
              </div>
              <div className="p-3 bg-card rounded-md border text-center">
                <div className="font-bold text-primary">Backend</div>
                <div className="text-xs text-muted-foreground mt-1">Node + Express</div>
              </div>
              <div className="p-3 bg-card rounded-md border text-center">
                <div className="font-bold text-primary">Database</div>
                <div className="text-xs text-muted-foreground mt-1">MongoDB</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-sm text-yellow-700 dark:text-yellow-400">
              <Database className="w-4 h-4 mt-0.5 shrink-0" />
              <p>
                <strong>Security Focused:</strong> The system implements robust JWT authentication, HttpOnly cookies, and Nodemailer for automated OTP verification.
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="border-t bg-muted/10 p-4 flex justify-end">
          <Button onClick={onClose} className="min-w-[120px]">
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Documentation;