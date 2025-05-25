
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Bell, 
  Clock,
  Heart,
  Star
} from 'lucide-react';

interface NutritionDashboardProps {
  userRole: string;
  onNavigate: (page: string) => void;
}

export const NutritionDashboard = ({ userRole, onNavigate }: NutritionDashboardProps) => {
  const getRoleSpecificContent = () => {
    switch (userRole) {
      case 'family':
        return {
          title: 'Family Dashboard',
          subtitle: 'Caring for your loved one\'s nutrition journey',
          primaryColor: 'green'
        };
      case 'nutritionist':
        return {
          title: 'Nutritionist Dashboard',
          subtitle: 'Managing your patients\' dietary plans',
          primaryColor: 'purple'
        };
      case 'healthcare':
        return {
          title: 'Healthcare Dashboard',
          subtitle: 'Coordinating patient care and nutrition',
          primaryColor: 'blue'
        };
      default:
        return {
          title: 'Admin Dashboard',
          subtitle: 'Overseeing healthcare operations',
          primaryColor: 'orange'
        };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Vitalink</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {userRole[0].toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h2>
          <p className="text-gray-600 text-lg">{content.subtitle}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => onNavigate('health-profile')}
            className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white"
          >
            <Users className="h-6 w-6 mb-2" />
            <span className="text-sm">Health Profile</span>
          </Button>
          
          <Button 
            onClick={() => onNavigate('communication')}
            className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MessageCircle className="h-6 w-6 mb-2" />
            <span className="text-sm">Communication</span>
          </Button>
          
          <Button 
            onClick={() => onNavigate('progress')}
            className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white"
          >
            <TrendingUp className="h-6 w-6 mb-2" />
            <span className="text-sm">Progress</span>
          </Button>
          
          <Button className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 text-white">
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">Schedule</span>
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Meals */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Today's Nutrition Plan
                </CardTitle>
                <CardDescription>Track meals and nutrition progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { meal: 'Breakfast', time: '8:00 AM', status: 'completed', items: 'Oatmeal with berries, Green tea' },
                    { meal: 'Lunch', time: '1:00 PM', status: 'in-progress', items: 'Grilled chicken salad, Brown rice' },
                    { meal: 'Snack', time: '4:00 PM', status: 'pending', items: 'Nuts and fruits' },
                    { meal: 'Dinner', time: '7:00 PM', status: 'planned', items: 'Baked salmon, Steamed vegetables' }
                  ].map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-800">{meal.meal}</h4>
                          <Badge 
                            variant={meal.status === 'completed' ? 'default' : 'secondary'}
                            className={meal.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {meal.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{meal.items}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {meal.time}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {meal.status === 'completed' ? 'View' : 'Update'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { from: 'Dr. Sarah Johnson', message: 'How is the new meal plan working?', time: '2 hours ago' },
                    { from: 'Nutritionist Maria', message: 'Please upload today\'s meal photos', time: '5 hours ago' },
                    { from: 'Care Team', message: 'Appointment reminder for tomorrow', time: '1 day ago' }
                  ].map((msg, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-sm text-gray-800">{msg.from}</p>
                      <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => onNavigate('communication')}
                >
                  View All Messages
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Meals Completed</span>
                    <span className="font-semibold text-green-600">1/4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Water Intake</span>
                    <span className="font-semibold text-blue-600">6/8 glasses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weight</span>
                    <span className="font-semibold text-purple-600">68.5 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Energy Level</span>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
