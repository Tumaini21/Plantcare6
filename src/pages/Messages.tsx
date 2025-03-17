import React, { useState } from 'react';
import { Message } from '../types';
import { MessageForm } from '../components/messaging/MessageForm';
import { MessageList } from '../components/messaging/MessageList';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

export function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleSendMessage = async (data: any) => {
    if (!user) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: user.id,
      recipientId: data.recipientId,
      subject: data.subject,
      content: data.content,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages([newMessage, ...messages]);
    toast.success('Message sent successfully');
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      // Mark message as read
      setMessages(messages.map(msg =>
        msg.id === message.id ? { ...msg, read: true } : msg
      ));
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">New Message</h2>
          <p className="text-sm text-gray-600">Send a message to another employee</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <MessageForm
            recipients={[]} // You would populate this with actual employees
            onSubmit={handleSendMessage}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Inbox</h2>
          <p className="text-sm text-gray-600">Your received messages</p>
        </div>

        <div className="rounded-lg bg-white shadow">
          {messages.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : (
            <MessageList
              messages={messages}
              onMessageClick={handleMessageClick}
            />
          )}
        </div>

        {selectedMessage && (
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-medium">{selectedMessage.subject}</h3>
            <p className="mt-2 text-sm text-gray-600">{selectedMessage.content}</p>
            <p className="mt-4 text-sm text-gray-500">
              Sent on {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}