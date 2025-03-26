
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send } from 'lucide-react';

// Mock data for conversations
const mockConversations = [
  {
    id: 'conv1',
    user: { id: 'u1', name: 'John Smith', avatar: '', role: 'provider' },
    lastMessage: 'When can you come to fix the sink?',
    timestamp: '10:30 AM',
    unread: 2,
  },
  {
    id: 'conv2',
    user: { id: 'u2', name: 'Alice Johnson', avatar: '', role: 'provider' },
    lastMessage: 'Your house cleaning is scheduled for tomorrow',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: 'conv3',
    user: { id: 'u3', name: 'Emma Davis', avatar: '', role: 'client' },
    lastMessage: 'Thanks for the quick service!',
    timestamp: 'Oct 25',
    unread: 0,
  },
];

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 'm1',
    senderId: 'u1',
    text: 'Hi there! I need help with my plumbing.',
    timestamp: '10:00 AM',
  },
  {
    id: 'm2',
    senderId: 'currentUser',
    text: 'Sure, what seems to be the problem?',
    timestamp: '10:05 AM',
  },
  {
    id: 'm3',
    senderId: 'u1',
    text: 'My sink is leaking. When can you come to fix it?',
    timestamp: '10:10 AM',
  },
  {
    id: 'm4',
    senderId: 'currentUser',
    text: 'I can come tomorrow morning around 9 AM if that works for you.',
    timestamp: '10:15 AM',
  },
  {
    id: 'm5',
    senderId: 'u1',
    text: 'That works perfectly, thank you!',
    timestamp: '10:20 AM',
  },
  {
    id: 'm6',
    senderId: 'u1',
    text: 'Also, can you give me an estimate of how much it might cost?',
    timestamp: '10:30 AM',
  },
];

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Select first conversation by default
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0].id);
    }
  }, [conversations, activeConversation]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `m${messages.length + 1}`,
      senderId: 'currentUser',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const activeConvo = conversations.find(c => c.id === activeConversation);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
      {/* Conversation List */}
      <Card className="md:col-span-1 overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto flex-grow p-0">
          <ul className="divide-y">
            {conversations.map(conversation => (
              <li 
                key={conversation.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-accent transition-colors ${
                  conversation.id === activeConversation ? 'bg-accent' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={conversation.user.avatar} />
                  <AvatarFallback>{getInitials(conversation.user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{conversation.user.name}</p>
                    <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="ml-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary-foreground">{conversation.unread}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Chat Window */}
      <Card className="md:col-span-2 flex flex-col h-full">
        {activeConversation ? (
          <>
            <CardHeader className="border-b px-4 py-2">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={activeConvo?.user.avatar} />
                  <AvatarFallback>{getInitials(activeConvo?.user.name || '')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{activeConvo?.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {activeConvo?.user.role === 'provider' ? 'Service Provider' : 'Client'}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex mb-4 ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === 'currentUser' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === 'currentUser' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Messages;
