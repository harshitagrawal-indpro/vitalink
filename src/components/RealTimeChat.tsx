
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  Users,
  Paperclip,
  Image,
  File,
  Download,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string | null;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  message_type: 'text' | 'file' | 'image';
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
}

interface RealTimeChatProps {
  onBack: () => void;
}

export const RealTimeChat = ({ onBack }: RealTimeChatProps) => {
  const { user, profile } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchChatRooms();
    }
  }, [user]);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom);
      subscribeToMessages(selectedRoom);
    }
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatRooms = async () => {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else if (data) {
      setChatRooms(data);
      if (data.length > 0 && !selectedRoom) {
        setSelectedRoom(data[0].id);
      }
    }
  };

  const fetchMessages = async (roomId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      setError(error.message);
    } else if (data) {
      setMessages(data);
    }
  };

  const subscribeToMessages = (roomId: string) => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        },
        async (payload) => {
          // Fetch the complete message with profile data
          const { data } = await supabase
            .from('messages')
            .select(`
              *,
              profiles:user_id (
                full_name,
                email
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            setMessages(prev => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user!.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('chat-files')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('chat-files')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const sendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedRoom || !user) return;

    setLoading(true);
    setError('');

    try {
      let fileUrl = null;
      let messageType: 'text' | 'file' | 'image' = 'text';

      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile);
        messageType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
      }

      const { error } = await supabase
        .from('messages')
        .insert({
          room_id: selectedRoom,
          user_id: user.id,
          content: newMessage.trim() || null,
          file_url: fileUrl,
          file_name: selectedFile?.name || null,
          file_type: selectedFile?.type || null,
          message_type: messageType
        });

      if (error) throw error;

      setNewMessage('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const refreshData = () => {
    fetchChatRooms();
    if (selectedRoom) {
      fetchMessages(selectedRoom);
    }
  };

  const renderMessage = (message: Message) => {
    const isOwn = message.user_id === user?.id;
    const senderName = message.profiles?.full_name || message.profiles?.email || 'Unknown User';

    return (
      <div
        key={message.id}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
          {!isOwn && (
            <p className="text-xs text-gray-500 mb-1 px-1">{senderName}</p>
          )}
          <div className={`px-4 py-2 rounded-lg ${
            isOwn 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {message.content && (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            )}
            
            {message.file_url && (
              <div className="mt-2">
                {message.message_type === 'image' ? (
                  <img 
                    src={message.file_url} 
                    alt={message.file_name || 'Image'}
                    className="max-w-full rounded cursor-pointer"
                    onClick={() => window.open(message.file_url!, '_blank')}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-white/10 rounded">
                    <File className="h-4 w-4" />
                    <span className="text-sm truncate">{message.file_name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(message.file_url!, '_blank')}
                      className="h-6 w-6 p-0"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <p className={`text-xs mt-1 ${
              isOwn ? 'text-green-100' : 'text-gray-500'
            }`}>
              {new Date(message.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert>
          <AlertDescription>Please sign in to access the chat.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Real-Time Chat</h1>
                <p className="text-gray-600">Connect with your care team</p>
              </div>
            </div>
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[600px]">
          {/* Chat Rooms List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Chat Rooms
              </CardTitle>
              <CardDescription>Select a room to join</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {chatRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                      selectedRoom === room.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                    }`}
                  >
                    <h4 className="font-semibold text-gray-800">{room.name}</h4>
                    {room.description && (
                      <p className="text-sm text-gray-600 truncate">{room.description}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      {new Date(room.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                
                {chatRooms.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No chat rooms available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-3 flex flex-col">
            {selectedRoom ? (
              <>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {chatRooms.find(r => r.id === selectedRoom)?.name || 'Chat Room'}
                      </CardTitle>
                      <CardDescription>Real-time communication</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messages.map(renderMessage)}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* File Preview */}
                  {selectedFile && (
                    <div className="px-4 py-2 bg-gray-50 border-t border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {selectedFile.type.startsWith('image/') ? (
                            <Image className="h-4 w-4" />
                          ) : (
                            <File className="h-4 w-4" />
                          )}
                          <span className="text-sm">{selectedFile.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button 
                        onClick={sendMessage} 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={loading || (!newMessage.trim() && !selectedFile)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a chat room to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {error && (
          <Alert className="mt-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
