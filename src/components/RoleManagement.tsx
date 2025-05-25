
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Shield, Heart, Stethoscope, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const roleIcons = {
  family: Users,
  nutritionist: Heart,
  healthcare: Stethoscope,
  admin: Shield
};

const roleColors = {
  family: 'bg-green-100 text-green-800',
  nutritionist: 'bg-purple-100 text-purple-800',
  healthcare: 'bg-blue-100 text-blue-800',
  admin: 'bg-orange-100 text-orange-800'
};

interface RoleManagementProps {
  onBack: () => void;
}

export const RoleManagement = ({ onBack }: RoleManagementProps) => {
  const { user, userRoles, hasRole, fetchUserRoles } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const addRole = async () => {
    if (!selectedRole || !user) return;
    
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: user.id, role: selectedRole });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Role added successfully!');
      setSelectedRole('');
      fetchUserRoles(user.id);
    }
    
    setLoading(false);
  };

  const removeRole = async (roleId: string) => {
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      setError(error.message);
    } else {
      setMessage('Role removed successfully!');
      fetchUserRoles(user!.id);
    }
    
    setLoading(false);
  };

  const availableRoles = ['family', 'nutritionist', 'healthcare', 'admin'].filter(
    role => !userRoles.some(userRole => userRole.role === role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Role Management</h1>
                <p className="text-gray-600">Manage your user roles</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Roles</CardTitle>
              <CardDescription>Your active roles in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userRoles.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No roles assigned yet</p>
                ) : (
                  userRoles.map((userRole) => {
                    const Icon = roleIcons[userRole.role];
                    return (
                      <div key={userRole.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <Badge className={roleColors[userRole.role]}>
                              {userRole.role.charAt(0).toUpperCase() + userRole.role.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRole(userRole.id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
              <CardDescription>Select a role to add to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => {
                      const Icon = roleIcons[role as keyof typeof roleIcons];
                      return (
                        <SelectItem key={role} value={role}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Button
                  onClick={addRole}
                  disabled={!selectedRole || loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>

                {availableRoles.length === 0 && (
                  <p className="text-center text-gray-500">All available roles have been assigned</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert className="mt-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert className="mt-4 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
