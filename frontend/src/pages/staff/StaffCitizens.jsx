import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserPlus, Users, Search, ArrowLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from '@/components/layout/DashboardLayout';
import useCitizens from "@/hooks/useCitizens";

const StaffCitizens = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { citizens, loading } = useCitizens();

  // Filter logic for search
  const filteredCitizens = citizens.filter(citizen => 
    citizen.firstName.toLowerCase().includes(search.toLowerCase()) ||
    citizen.lastName.toLowerCase().includes(search.toLowerCase()) ||
    citizen.ninId.includes(search)
  );

  return (
    <DashboardLayout>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => navigate('/staff/dashboard')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold">Citizen Management</h1>
            </div>
            <Button onClick={() => navigate('/staff/register-citizen')} className="gap-2 shadow-sm bg-black">
              <UserPlus className="h-4 w-4" />
              Register New Citizen
            </Button>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            
            {/* Search */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by NIN or Name..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Citizen Table */}
            <Card>
              <CardHeader>
                <CardTitle>Citizen Directory</CardTitle>
                <CardDescription>
                  {citizens.length} registered citizens found.
                </CardDescription>
              </CardHeader>
              <CardContent>
                
                {loading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredCitizens.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>NIN ID</TableHead>
                          <TableHead>Full Name</TableHead>
                          <TableHead>LGA Origin</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCitizens.map((citizen) => (
                          <TableRow key={citizen._id}>
                            <TableCell className="font-medium">{citizen.ninId}</TableCell>
                            <TableCell>{citizen.firstName} {citizen.lastName}</TableCell>
                            <TableCell>{citizen.originalLga}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${citizen.isAccountVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {citizen.isAccountVerified ? 'Verified' : 'Pending'}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="hover:bg-black text-black hover:text-white">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg bg-muted/10">
                    <div className="bg-background p-4 rounded-full mb-3 shadow-sm">
                        <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No Citizens Found</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-4">
                      {search ? "No matches for your search." : "Start by registering the first citizen."}
                    </p>
                    {!search && (
                      <Button variant="outline" onClick={() => navigate('/staff/register-citizen')}>
                        Register Now
                      </Button>
                    )}
                  </div>
                )}

              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffCitizens;