import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

export default function CitizenPanel() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to Citizen Portal</CardTitle>
            <CardDescription>
              Hello {user?.firstName} {user?.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email: {user?.email}</p>
            <Button onClick={signOut} className="mt-4">
              Sign Out
            </Button>
          </CardContent>
        </Card>
        {/* Add more citizen-specific content here */}
      </div>
    </div>
  );
}