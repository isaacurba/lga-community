import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserPlus, Users, Search, ArrowLeft, Loader2, X, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useCitizens from '@/hooks/useCitizens';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StaffCitizens = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { citizens, loading } = useCitizens();
  // --- NEW: State for the Selected Citizen (to show in Modal) ---
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  // Filter logic for search
  const filteredCitizens = citizens.filter(citizen => 
    citizen.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    citizen.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    citizen.ninId?.includes(search)
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
            <Button onClick={() => navigate('/staff/register-citizen')} className="gap-2 shadow-sm">
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
                            <span className={`px-2 py-1 rounded-full text-xs ${citizen.isAccountVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {citizen.isAccountVerified ? 'Verified' : 'Pending'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right ">
                            {/* --- UPDATED BUTTON: Opens the Modal --- */}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-black hover:text-white cursor-pointer"
                              onClick={() => setSelectedCitizen(citizen)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

        {/* --- CITIZEN DETAILS MODAL (Dialog) --- */}
        <Dialog open={!!selectedCitizen} onOpenChange={() => setSelectedCitizen(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Citizen Profile</DialogTitle>
              <DialogDescription>
                Full details for {selectedCitizen?.firstName} {selectedCitizen?.lastName}
              </DialogDescription>
            </DialogHeader>
            
            {selectedCitizen && (
              <div className="space-y-4 py-2">
                
                {/* Header Info */}
                <div className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{selectedCitizen.firstName} {selectedCitizen.lastName}</h4>
                    <p className="text-sm text-muted-foreground">NIN: {selectedCitizen.ninId}</p>
                  </div>
                  <div className={`ml-auto text-xs px-2 py-1 rounded-full ${selectedCitizen.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {selectedCitizen.isVerified ? 'Verified' : 'Pending'}
                  </div>
                </div>

                {/* Detail Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs uppercase">Email Address</span>
                    <p className="font-medium">{selectedCitizen.email}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs uppercase">Origin LGA</span>
                    <p className="font-medium">{selectedCitizen.originalLga}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs uppercase">Date of Birth</span>
                    <p className="font-medium">
                      {selectedCitizen.dob ? new Date(selectedCitizen.dob).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs uppercase">Gender</span>
                    <p className="font-medium">{selectedCitizen.gender || 'Not specified'}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <span className="text-muted-foreground text-xs uppercase">Current Address</span>
                    <p className="font-medium">{selectedCitizen.currentAddress || 'N/A'}</p>
                  </div>
                </div>

                {/* Action Footer within Modal */}
                <div className="flex justify-end pt-2">
                  <Button variant="outline" onClick={() => setSelectedCitizen(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </DashboardLayout>
  );
};

export default StaffCitizens;