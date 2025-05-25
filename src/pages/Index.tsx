
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Stethoscope, Shield, Star, MessageCircle, Calendar, TrendingUp, Settings, LogOut } from 'lucide-react';
import { RoleSelection } from '@/components/RoleSelection';
import { NutritionDashboard } from '@/components/NutritionDashboard';
import { HealthProfile } from '@/components/HealthProfile';
import { CommunicationCenter } from '@/components/CommunicationCenter';
import { ProgressTracker } from '@/components/ProgressTracker';
import { AuthPage } from '@/components/AuthPage';
import { RoleManagement } from '@/components/RoleManagement';
import { RealTimeChat } from '@/components/RealTimeChat';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedRole, setSelectedRole] = useState('');
  const { user, profile, userRoles, loading, signOut, hasRole } = useAuth();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentPage('dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentPage('landing');
    setSelectedRole('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading Vitalink...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!user && currentPage !== 'landing') {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return <AuthPage />;
      case 'role-selection':
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
      case 'dashboard':
        return <NutritionDashboard userRole={selectedRole} onNavigate={setCurrentPage} />;
      case 'health-profile':
        return <HealthProfile onBack={() => setCurrentPage('dashboard')} />;
      case 'communication':
        return <CommunicationCenter onBack={() => setCurrentPage('dashboard')} />;
      case 'progress':
        return <ProgressTracker onBack={() => setCurrentPage('dashboard')} />;
      case 'role-management':
        return <RoleManagement onBack={() => setCurrentPage('dashboard')} />;
      case 'real-time-chat':
        return <RealTimeChat onBack={() => setCurrentPage('dashboard')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-green-600" />
                    <h1 className="text-2xl font-bold text-green-800">Vitalink</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    {user ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Welcome, {profile?.full_name || user.email}</span>
                          <div className="flex space-x-1">
                            {userRoles.map((role) => (
                              <Badge key={role.id} variant="outline" className="text-xs">
                                {role.role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => setCurrentPage('role-management')}
                          size="sm"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Roles
                        </Button>
                        <Button 
                          onClick={() => setCurrentPage('real-time-chat')}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button 
                          onClick={() => setCurrentPage('role-selection')}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          Dashboard
                        </Button>
                        <Button 
                          variant="ghost"
                          onClick={handleSignOut}
                          size="sm"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => setCurrentPage('auth')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-4">
              <div className="container mx-auto text-center max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                  Smart Nutrition Bridge for 
                  <span className="text-green-600"> Recovery</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Connecting patients, families, and nutritionists for seamless dietary recovery. 
                  Real-time communication, personalized nutrition plans, and accessible health tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <>
                      <Button 
                        onClick={() => setCurrentPage('role-selection')}
                        size="lg" 
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full"
                      >
                        Go to Dashboard
                      </Button>
                      <Button 
                        onClick={() => setCurrentPage('real-time-chat')}
                        variant="outline" 
                        size="lg"
                        className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full"
                      >
                        Start Chatting
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => setCurrentPage('auth')}
                        size="lg" 
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full"
                      >
                        Start Your Journey
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full"
                      >
                        Learn More
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* User Types */}
            <section className="py-16 px-4 bg-white/50">
              <div className="container mx-auto">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Designed for Everyone in Your Care Circle
                </h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="text-center hover:shadow-lg transition-shadow border-green-100">
                    <CardHeader>
                      <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <CardTitle className="text-green-800">Families & Guardians</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Track your loved one's nutrition journey with simple, accessible tools designed for all ages.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow border-green-100">
                    <CardHeader>
                      <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-blue-800">Healthcare Professionals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Collaborate seamlessly with nutritionists and monitor patient progress in real-time.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow border-green-100">
                    <CardHeader>
                      <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <CardTitle className="text-purple-800">Nutritionists</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Create personalized nutrition plans and maintain direct communication with families.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4">
              <div className="container mx-auto">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Everything You Need for Nutritional Recovery
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <div className="text-center p-6">
                    <MessageCircle className="h-10 w-10 text-green-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-800 mb-2">Real-time Communication</h4>
                    <p className="text-sm text-gray-600">Secure chat and video calls between all care team members</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <Calendar className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-800 mb-2">Meal Planning</h4>
                    <p className="text-sm text-gray-600">Interactive recipes with voice instructions and nutrition tracking</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-800 mb-2">Progress Tracking</h4>
                    <p className="text-sm text-gray-600">Visual charts for weight, symptoms, and recovery milestones</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <Shield className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-800 mb-2">Accessible Design</h4>
                    <p className="text-sm text-gray-600">Large fonts, voice commands, and multilingual support</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4 bg-green-50">
              <div className="container mx-auto text-center max-w-4xl">
                <h3 className="text-3xl font-bold text-gray-800 mb-12">Trusted by Families Worldwide</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-6 bg-white">
                    <CardContent className="pt-0">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">
                        "Vitalink made my mother's post-surgery recovery so much easier. The nutritionist could see exactly what she was eating and adjust her plan immediately."
                      </p>
                      <p className="font-semibold text-gray-800">Sarah M., Family Guardian</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-6 bg-white">
                    <CardContent className="pt-0">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">
                        "The communication features allow me to collaborate effectively with doctors and maintain close contact with my patients' families."
                      </p>
                      <p className="font-semibold text-gray-800">Dr. Priya K., Clinical Nutritionist</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 px-4">
              <div className="container mx-auto text-center">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Heart className="h-6 w-6 text-green-400" />
                  <span className="text-xl font-bold">Vitalink</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Bridging the gap between patients, families, and healthcare professionals for better nutritional recovery.
                </p>
                <p className="text-sm text-gray-500">
                  Supporting UN SDGs: Zero Hunger • Good Health • Reduced Inequalities • Strong Institutions
                </p>
              </div>
            </footer>
          </div>
        );
    }
  };

  return renderPage();
};

export default Index;
