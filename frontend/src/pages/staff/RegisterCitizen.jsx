import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { AppContext } from "@/context/AppContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
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

import { UserPlus, ArrowLeft, Loader2 } from "lucide-react";

const RegisterCitizen = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
     ...prev, 
     [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "ninId",
      "email",
      "password",
      "originalLga",
    ];

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
          <h1 className="text-2xl font-semibold">Register Citizen</h1>
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
                  />
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
                    <Input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
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
                    <Input
                      name="originalLga"
                      value={formData.originalLga}
                      onChange={handleChange}
                    />
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
