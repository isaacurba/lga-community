import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { UserPlus, Users, Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StaffCitizens = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* PAGE CONTENT ONLY */}
      <div className="flex flex-col gap-4">

        {/* --- Header Section --- */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/staff/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button> */}

            <h1 className="text-xl font-semibold">Citizen Management</h1>
          </div>

          <Button
            onClick={() => navigate('/staff/register-citizen')}
            className="text-base font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
            <UserPlus className="h-4 w-4" />
            Register New Citizen
          </Button>
        </header>

        {/* --- Search Bar --- */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by NIN or Name..."
              className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>

        {/* --- Citizen List Area --- */}
        <Card>
          <CardHeader>
            <CardTitle>Citizen Directory</CardTitle>
            <CardDescription>
              View and manage all registered citizens in your LGA.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg bg-muted/10">
              <div className="bg-background p-4 rounded-full mb-3 shadow-sm">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Citizens Found</h3>
              <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-4">
                Start by registering the first citizen into the database.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/staff/register-citizen')}
                className="cursor-pointer"
              >
                Register Now
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default StaffCitizens;
