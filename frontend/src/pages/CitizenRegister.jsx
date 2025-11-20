import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { useToast } from '@/hooks/use-toast';

export default function CitizenRegister() {
  const [formData, setFormData] = useState({
    ninId: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    currentAddress: '',
    originalLga: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.ninId || !formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.originalLga) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(formData);
    setIsLoading(false);

    if (!error) {
      setFormData({
        ninId: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        currentAddress: '',
        originalLga: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Register New Citizen</CardTitle>
            <CardDescription>
              Create a new citizen account. They will receive login credentials via email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name *</label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name *</label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="ninId" className="text-sm font-medium">NIN ID *</label>
                <Input
                  id="ninId"
                  name="ninId"
                  type="text"
                  value={formData.ninId}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email *</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password *</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="originalLga" className="text-sm font-medium">Original LGA *</label>
                <Input
                  id="originalLga"
                  name="originalLga"
                  type="text"
                  value={formData.originalLga}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="currentAddress" className="text-sm font-medium">Current Address</label>
                <Input
                  id="currentAddress"
                  name="currentAddress"
                  type="text"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Citizen'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}