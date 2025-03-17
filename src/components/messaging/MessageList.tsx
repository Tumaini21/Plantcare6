import React from 'react';
import { Message } from '../../types';
import { formatDate } from '../../lib/utils';

interface MessageListProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
}

export function MessageList({ messages, onMessageClick }: MessageListProps) {
  return (
    <div className="divide-y">
      {messages.map((message) => (
        <button
          key={message.id}
          onClick={() => onMessageClick(message)}
          className={`block w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
            !message.read ? 'bg-green-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className={`font-medium ${!message.read ? 'text-green-900' : 'text-gray-900'}`}>
              {message.subject}
            </h3>
            <span className="text-sm text-gray-500">
              {formatDate(message.createdAt)}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-600">
            {message.content}
          </p>
          {!message.read && (
            <span className="mt-2 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              New
            </span>
          )}
        </button>
      ))}
    </div>
  );
}