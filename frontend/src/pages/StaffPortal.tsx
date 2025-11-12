import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, Shield } from 'lucide-react';

interface Citizen {
  nin_id: string;
  first_name: string;
  last_name: string;
  dob: string | null;
  current_address: string | null;
  original_lga: string | null;
  is_verified: boolean;
  created_at: string;
}

export default function StaffPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Citizen[]>([]);
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        variant: 'destructive',
        title: 'Search Error',
        description: 'Please enter a NIN ID or Last Name to search.',
      });
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('citizens')
        .select('*')
        .or(`nin_id.eq.${searchQuery},last_name.ilike.%${searchQuery}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSearchResults(data || []);
      setSelectedCitizen(null);

      if (!data || data.length === 0) {
        toast({
          title: 'No Results',
          description: 'No citizens found matching your search.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: error.message || 'An error occurred during search.',
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">LGA-Connect Staff Portal</h1>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Citizen Management</h2>
            <p className="text-muted-foreground mt-1">Search and manage citizen records</p>
          </div>
          <Button onClick={() => navigate('/staff/register')} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Register New Citizen
          </Button>
        </div>

        <Card className="shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <CardTitle>Search Citizens</CardTitle>
            <CardDescription>Search by NIN ID or Last Name</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter NIN ID or Last Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {searchResults.length > 0 && (
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle>Search Results ({searchResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NIN ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Original LGA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((citizen) => (
                    <TableRow key={citizen.nin_id}>
                      <TableCell className="font-mono text-sm">{citizen.nin_id}</TableCell>
                      <TableCell>{`${citizen.first_name} ${citizen.last_name}`}</TableCell>
                      <TableCell>{citizen.dob ? new Date(citizen.dob).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>{citizen.original_lga || 'N/A'}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          citizen.is_verified 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {citizen.is_verified ? 'Verified' : 'Unverified'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCitizen(citizen)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {selectedCitizen && (
          <Card className="shadow-[var(--shadow-elegant)] border-primary/20">
            <CardHeader className="bg-accent/50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {selectedCitizen.first_name} {selectedCitizen.last_name}
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Detailed Citizen Profile
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCitizen(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NIN ID</p>
                  <p className="font-mono font-semibold">{selectedCitizen.nin_id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                  <p className="font-medium">
                    {selectedCitizen.dob ? new Date(selectedCitizen.dob).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not provided'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Current Address</p>
                  <p className="font-medium">{selectedCitizen.current_address || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Original LGA</p>
                  <p className="font-medium">{selectedCitizen.original_lga || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Verification Status</p>
                  <p className="font-medium">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCitizen.is_verified 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {selectedCitizen.is_verified ? 'Verified' : 'Unverified'}
                    </span>
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                  <p className="font-medium">
                    {new Date(selectedCitizen.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
