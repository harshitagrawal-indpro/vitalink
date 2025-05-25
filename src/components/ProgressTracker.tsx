
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Heart,
  Target,
  Star,
  Calendar,
  Plus
} from 'lucide-react';

interface ProgressTrackerProps {
  onBack: () => void;
}

export const ProgressTracker = ({ onBack }: ProgressTrackerProps) => {
  const weightData = [
    { date: '2024-01-01', weight: 72.5 },
    { date: '2024-01-08', weight: 71.8 },
    { date: '2024-01-15', weight: 71.2 },
    { date: '2024-01-22', weight: 70.9 },
    { date: '2024-01-29', weight: 70.5 }
  ];

  const vitalSigns = [
    { metric: 'Weight', current: '70.5 kg', change: -2.0, trend: 'down', target: '68 kg', unit: 'kg' },
    { metric: 'Blood Pressure', current: '118/76', change: 0, trend: 'stable', target: '120/80', unit: 'mmHg' },
    { metric: 'Blood Sugar', current: '95', change: -8, trend: 'down', target: '< 100', unit: 'mg/dL' },
    { metric: 'Energy Level', current: '8/10', change: 2, trend: 'up', target: '9/10', unit: 'scale' }
  ];

  const symptoms = [
    { symptom: 'Appetite', status: 'Improved', severity: 'Good', date: 'Today' },
    { symptom: 'Digestion', status: 'Normal', severity: 'Good', date: 'Today' },
    { symptom: 'Sleep Quality', status: 'Good', severity: 'Good', date: 'Yesterday' },
    { symptom: 'Fatigue', status: 'Mild', severity: 'Fair', date: 'Yesterday' },
    { symptom: 'Nausea', status: 'None', severity: 'Good', date: '2 days ago' }
  ];

  const nutritionGoals = [
    { goal: 'Daily Protein Intake', target: '60g', current: '58g', progress: 97, status: 'on-track' },
    { goal: 'Water Consumption', target: '8 glasses', current: '7 glasses', progress: 88, status: 'on-track' },
    { goal: 'Fiber Intake', target: '25g', current: '20g', progress: 80, status: 'needs-attention' },
    { goal: 'Meal Frequency', target: '4 meals', current: '4 meals', progress: 100, status: 'achieved' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'needs-attention': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Progress Tracker</h1>
              <p className="text-gray-600">Monitor your health and nutrition journey</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Vitals
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Symptoms
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Key Metrics */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weight Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">70.5 kg</p>
                        <p className="text-sm text-gray-500">Current Weight</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-green-600">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          <span className="font-semibold">-2.0 kg</span>
                        </div>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                      <p className="text-green-700 text-sm font-medium">Weight trend: Decreasing steadily</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nutrition Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">85%</p>
                        <p className="text-sm text-gray-500">Today's Score</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="font-semibold">+5%</span>
                        </div>
                        <p className="text-xs text-gray-500">vs yesterday</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Meal Adherence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">3/4</p>
                        <p className="text-sm text-gray-500">Meals Completed</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">On Track</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">75% completed today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Energy Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">8/10</p>
                        <p className="text-sm text-gray-500">Current Level</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="font-semibold">+2</span>
                        </div>
                        <p className="text-xs text-gray-500">Improved</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`h-3 w-3 rounded-full ${i < 8 ? 'bg-green-500' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Updates
                  </CardTitle>
                  <CardDescription>Latest health entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Weight', value: '70.5 kg', time: 'This morning', change: '-0.3' },
                      { type: 'Appetite', value: 'Good', time: '2 hours ago', change: 'Improved' },
                      { type: 'Sleep', value: '7.5 hours', time: 'Last night', change: '+0.5h' },
                      { type: 'Meals', value: '3/4 completed', time: 'Today', change: 'On track' },
                      { type: 'Water', value: '6 glasses', time: 'Today', change: 'Good' }
                    ].map((update, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{update.type}</p>
                          <p className="text-sm text-gray-600">{update.value}</p>
                          <p className="text-xs text-gray-500">{update.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {update.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Entry
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vitals">
            <div className="grid md:grid-cols-2 gap-6">
              {vitalSigns.map((vital, index) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span>{vital.metric}</span>
                      {getTrendIcon(vital.trend)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-semibold text-xl">{vital.current}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Target:</span>
                        <span className="text-gray-800">{vital.target}</span>
                      </div>
                      {vital.change !== 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Change:</span>
                          <span className={vital.change > 0 ? 'text-green-600' : 'text-red-600'}>
                            {vital.change > 0 ? '+' : ''}{vital.change} {vital.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="symptoms">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Tracking</CardTitle>
                <CardDescription>Monitor how you're feeling over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{symptom.symptom}</h4>
                        <p className="text-sm text-gray-600">{symptom.status}</p>
                        <p className="text-xs text-gray-500">{symptom.date}</p>
                      </div>
                      <Badge className={getStatusColor(symptom.severity.toLowerCase())}>
                        {symptom.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Log New Symptom
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <div className="grid md:grid-cols-2 gap-6">
              {nutritionGoals.map((goal, index) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{goal.goal}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-semibold">{goal.current} / {goal.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            goal.progress >= 100 ? 'bg-green-500' : 
                            goal.progress >= 80 ? 'bg-blue-500' : 'bg-orange-500'
                          }`}
                          style={{width: `${Math.min(goal.progress, 100)}%`}}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{goal.progress}% completed</span>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
