
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  MessageCircle, 
  Video, 
  Phone, 
  Send, 
  Calendar,
  Bell,
  Users,
  Clock
} from 'lucide-react';

interface CommunicationCenterProps {
  onBack: () => void;
}

export const CommunicationCenter = ({ onBack }: CommunicationCenterProps) => {
  const [selectedChat, setSelectedChat] = useState('nutritionist-maria');
  const [newMessage, setNewMessage] = useState('');

  const chatContacts = [
    {
      id: 'nutritionist-maria',
      name: 'Maria Rodriguez',
      role: 'Clinical Nutritionist',
      avatar: 'MR',
      status: 'online',
      lastMessage: 'How are the new meal plans working out?',
      lastSeen: '2 min ago',
      unread: 2
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Sarah Johnson',
      role: 'Primary Care Physician',
      avatar: 'SJ',
      status: 'online',
      lastMessage: 'Lab results look good. Let\'s discuss.',
      lastSeen: '15 min ago',
      unread: 0
    },
    {
      id: 'nurse-david',
      name: 'David Kim',
      role: 'Registered Nurse',
      avatar: 'DK',
      status: 'away',
      lastMessage: 'Reminder: Medication schedule updated',
      lastSeen: '1 hour ago',
      unread: 1
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'nutritionist-maria',
      content: 'Good morning! How are you feeling after yesterday\'s meal plan adjustments?',
      timestamp: '9:15 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'me',
      content: 'Much better! The portion sizes feel more manageable now.',
      timestamp: '9:22 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'nutritionist-maria',
      content: 'That\'s wonderful to hear! I noticed you uploaded photos of yesterday\'s meals. They look perfect.',
      timestamp: '9:25 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'me',
      content: 'Thank you! I have a question about the evening snack options.',
      timestamp: '9:30 AM',
      isOwn: true
    },
    {
      id: 5,
      sender: 'nutritionist-maria',
      content: 'Of course! What would you like to know?',
      timestamp: '9:32 AM',
      isOwn: false
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      with: 'Maria Rodriguez',
      role: 'Nutritionist',
      date: 'Today',
      time: '2:00 PM',
      type: 'video',
      duration: '30 min'
    },
    {
      id: 2,
      with: 'Dr. Sarah Johnson',
      role: 'Primary Care',
      date: 'Tomorrow',
      time: '10:30 AM',
      type: 'phone',
      duration: '15 min'
    },
    {
      id: 3,
      with: 'Care Team',
      role: 'Weekly Check-in',
      date: 'Friday',
      time: '3:00 PM',
      type: 'video',
      duration: '45 min'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
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
              <h1 className="text-2xl font-bold text-gray-800">Communication Center</h1>
              <p className="text-gray-600">Stay connected with your care team</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
              {/* Chat List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Care Team
                  </CardTitle>
                  <CardDescription>Your healthcare professionals</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {chatContacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => setSelectedChat(contact.id)}
                        className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                          selectedChat === contact.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {contact.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-800 truncate">{contact.name}</p>
                              {contact.unread > 0 && (
                                <Badge className="bg-green-600 text-white text-xs">
                                  {contact.unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{contact.role}</p>
                            <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                            <p className="text-xs text-gray-400">{contact.lastSeen}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Window */}
              <Card className="lg:col-span-2 flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        MR
                      </div>
                      <div>
                        <CardTitle>Maria Rodriguez</CardTitle>
                        <CardDescription>Clinical Nutritionist • Online</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{appointment.with}</h4>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{appointment.role}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.time} ({appointment.duration})
                          </span>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Join Call
                          </Button>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Schedule New Appointment</CardTitle>
                  <CardDescription>Book a consultation with your care team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 py-6">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule with Nutritionist
                    </Button>
                    <Button variant="outline" className="w-full py-6">
                      <Video className="h-5 w-5 mr-2" />
                      Schedule with Doctor
                    </Button>
                    <Button variant="outline" className="w-full py-6">
                      <Users className="h-5 w-5 mr-2" />
                      Team Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Stay updated with your care plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'meal', message: 'Time for your afternoon snack!', time: '2 hours ago', urgent: false },
                    { type: 'appointment', message: 'Upcoming video call with Maria Rodriguez in 30 minutes', time: '30 min ago', urgent: true },
                    { type: 'update', message: 'Your nutrition plan has been updated', time: '3 hours ago', urgent: false },
                    { type: 'medication', message: 'Medication reminder: Take evening supplements', time: '5 hours ago', urgent: false },
                    { type: 'progress', message: 'Great job! You\'ve completed 3/4 meals today', time: '6 hours ago', urgent: false }
                  ].map((notification, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${notification.urgent ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
