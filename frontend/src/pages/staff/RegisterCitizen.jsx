import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { AppContext } from "@/context/AppContext";
import DashboardLayout from "@/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { UserPlus, ArrowLeft, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { nigeriaLGAs } from "@/lib/nigeria-lgas";

const RegisterCitizen = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ninId: "",
    email: "",
    password: "",
    originalLga: "",
    dob: "",
    currentAddress: "",
  });

  // Required fields for quick completeness feedback
  const requiredFields = [
    "firstName",
    "lastName",
    "ninId",
    "email",
    "password",
    "originalLga",
  ];
  const filledRequired = requiredFields.filter((field) => formData[field]).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Keep NIN numeric and capped at 11 digits for a smoother UX
    const nextValue =
      name === "ninId" ? value.replace(/\D/g, "").slice(0, 11) : value;
    setFormData((prev) => ({
     ...prev, 
     [name]: nextValue 
    }));
  };

  const generatePassword = () => {
    // Simple, readable password generator (can be upgraded later)
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    let result = "";
    for (let i = 0; i < 10; i += 1) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setFormData((prev) => ({ ...prev, password: result }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = requiredFields.some((field) => !formData[field]);
    if (missing) {
      return toast.error("Please fill in all required fields");
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/staff/auth/register-citizen`,
        formData,
        { withCredentials: true }
      );

      if (!data?.success) {
        throw new Error(data?.message || "Registration failed");
      }

      toast.success("Citizen registered successfully");
      navigate("/staff/citizens");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-3xl px-4 pb-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/staff/citizens")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Register Citizen</h1>
            <span className="text-xs text-muted-foreground">
              Completion: {filledRequired}/{requiredFields.length}
            </span>
          </div>
        </div>

        <Card className="shadow-md border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Citizen Information</CardTitle>
                <CardDescription>
                  Create an official citizen record and login account.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <section className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Personal Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>NIN *</Label>
                  <Input
                    name="ninId"
                    placeholder="11-digit NIN"
                    value={formData.ninId}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={11}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.ninId.length}/11 digits
                  </p>
                </div>
              </section>

              {/* Account Info */}
              <section className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Account Credentials
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Initial Password *</Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generatePassword}
                        className="shrink-0"
                      >
                        Generate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Share this password securely with the citizen.
                    </p>
                  </div>
                </div>
              </section>

              {/* Location */}
              <section className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Location & Bio
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>LGA of Origin *</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {formData.originalLga
                            ? nigeriaLGAs.find((lga) => lga === formData.originalLga)
                            : "Select LGA..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search LGA..." />
                          <CommandList>
                            <CommandEmpty>No LGA found.</CommandEmpty>
                            <CommandGroup>
                              {nigeriaLGAs.map((lga, index) => (
                                <CommandItem
                                  // Some LGA names are repeated across different states; ensure key is unique
                                  key={`${lga}-${index}`}
                                  value={lga}
                                  onSelect={(currentValue) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      originalLga: currentValue === formData.originalLga ? "" : currentValue,
                                    }));
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.originalLga === lga ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {lga}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Address</Label>
                  <Input
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Live Summary */}
              <section className="space-y-3 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Live Summary</h4>
                  <span className="text-xs text-muted-foreground">
                    Updates as you type
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    {formData.firstName || formData.lastName
                      ? `${formData.firstName} ${formData.lastName}`.trim()
                      : "—"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {formData.email || "—"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">NIN:</span>{" "}
                    {formData.ninId || "—"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">LGA:</span>{" "}
                    {formData.originalLga || "—"}
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/staff/citizens")}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isLoading} className="bg-black">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering…
                    </>
                  ) : (
                    "Register Citizen"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RegisterCitizen;
