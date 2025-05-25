
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Stethoscope, Heart, Shield } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

export const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const roles = [
    {
      id: 'family',
      title: 'Family Member / Guardian',
      description: 'I am caring for a family member and want to track their nutrition and recovery',
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      id: 'nutritionist',
      title: 'Nutritionist',
      description: 'I am a nutritionist providing dietary guidance and meal plans to patients',
      icon: Heart,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Professional',
      description: 'I am a doctor, nurse, or other healthcare provider working with patients',
      icon: Stethoscope,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      id: 'admin',
      title: 'Healthcare Administrator',
      description: 'I manage healthcare staff and oversee patient care coordination',
      icon: Shield,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Vitalink</h1>
          <p className="text-xl text-gray-600 mb-8">
            Please select your role to get started with your personalized experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className={`${role.bgColor} ${role.borderColor} border-2 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <IconComponent className={`h-16 w-16 ${role.textColor} group-hover:scale-110 transition-transform duration-200`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className={`w-full bg-${role.color}-600 hover:bg-${role.color}-700 text-white py-3 text-lg rounded-full`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.id);
                    }}
                  >
                    Continue as {role.title.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Don't worry, you can change your role later in settings
          </p>
        </div>
      </div>
    </div>
  );
};
