import React from 'react';

const Messages = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex h-[600px]">
            {/* Sidebar with conversations */}
            <div className="w-1/3 border-r border-gray-200">
              {/* Conversations list will go here */}
            </div>
            
            {/* Message area */}
            <div className="flex-1 flex flex-col">
              {/* Message header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium">Conversation</h3>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Messages will be displayed here */}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Type a message..."
                  />
                  <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
