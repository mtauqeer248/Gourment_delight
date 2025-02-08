/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { db, auth } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";
import { useReactMediaRecorder } from "react-media-recorder";

const RestaurantSocialChat = () => {
  // Core state
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  
  // Online users state
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastActive, setLastActive] = useState(null);
  
  // Voice recording state
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  const [isRecording, setIsRecording] = useState(false);

  // Track current user's online status
  useEffect(() => {
    if (!auth.currentUser) return;

    const updateOnlineStatus = async (status) => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        isOnline: status,
        lastActive: serverTimestamp(),
        currentRestaurant: currentRestaurant
      });
    };

    // Set online when component mounts
    updateOnlineStatus(true);

    // Handle window/tab close
    const handleBeforeUnload = () => {
      updateOnlineStatus(false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      updateOnlineStatus(false);
    };
  }, [currentRestaurant]);

  // Track all online users
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("isOnline", "==", true)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastActive: doc.data().lastActive?.toDate()
      }));
      setOnlineUsers(users);
    });

    return () => unsubscribe();
  }, []);

  // Get current user's restaurant
  useEffect(() => {
    if (!auth.currentUser) return;
    
    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      if (!snapshot.empty) {
        setCurrentRestaurant(snapshot.docs[0].data().currentRestaurant);
      }
    });
    return () => unsubscribe();
  }, []);

  // Get nearby users in same restaurant
  useEffect(() => {
    if (!currentRestaurant) return;
    
    const usersQuery = query(
      collection(db, "users"),
      where("currentRestaurant", "==", currentRestaurant),
      where("uid", "!=", auth.currentUser?.uid),
      where("isOnline", "==", true)
    );
    
    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastActive: doc.data().lastActive?.toDate()
      }));
      setNearbyUsers(users);
    });
    return () => unsubscribe();
  }, [currentRestaurant]);

  // Get chat messages
  useEffect(() => {
    if (!selectedUser || !currentRestaurant) return;
    
    const chatId = [auth.currentUser?.uid, selectedUser.uid].sort().join('_');
    const messagesQuery = query(
      collection(db, `restaurants/${currentRestaurant}/chats/${chatId}/messages`),
      orderBy("timestamp", "asc")
    );
    
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const chatMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(chatMessages);
    });
    return () => unsubscribe();
  }, [selectedUser, currentRestaurant]);

  // Send text message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !currentRestaurant) return;
    
    const chatId = [auth.currentUser?.uid, selectedUser.uid].sort().join('_');
    await addDoc(collection(db, `restaurants/${currentRestaurant}/chats/${chatId}/messages`), {
      text: newMessage,
      userId: auth.currentUser?.uid,
      userName: auth.currentUser?.displayName || "Guest",
      timestamp: serverTimestamp(),
      type: 'text'
    });
    setNewMessage("");
  };

  // Send voice message
  const sendVoiceMessage = async () => {
    if (!mediaBlobUrl || !selectedUser || !currentRestaurant) return;
    
    const chatId = [auth.currentUser?.uid, selectedUser.uid].sort().join('_');
    await addDoc(collection(db, `restaurants/${currentRestaurant}/chats/${chatId}/messages`), {
      audioUrl: mediaBlobUrl,
      userId: auth.currentUser?.uid,
      userName: auth.currentUser?.displayName || "Guest",
      timestamp: serverTimestamp(),
      type: 'audio'
    });
  };

  return (
    <div className="h-screen bg-gray-100">
      {!currentRestaurant ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <p className="text-lg text-gray-600 text-center">Please check in to a restaurant to chat with nearby users</p>
          </div>
        </div>
      ) : (
        <>
          {/* Chat Icon */}
          {!listOpen && !chatOpen && (
            <button
              onClick={() => setListOpen(true)}
              className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {nearbyUsers.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {nearbyUsers.length}
                  </span>
                )}
              </div>
            </button>
          )}

          {/* Users List Modal */}
          {listOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Nearby Users</h2>
                  <button onClick={() => setListOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Online Users Section */}
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-700">Online Users ({onlineUsers.length})</h3>
                  <div className="mt-2 space-y-2">
                    {onlineUsers.map(user => (
                      <div key={user.id} className="flex items-center space-x-3 p-2 rounded bg-gray-50">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{user.displayName || 'Guest'}</span>
                        <span className="text-xs text-gray-500">
                          {user.lastActive?.toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Users Section */}
                <div className="p-4 max-h-96 overflow-y-auto">
                  <h3 className="font-medium text-gray-700 mb-3">In This Restaurant</h3>
                  {nearbyUsers.map(user => (
                    <div
                      key={user.id}
                      onClick={() => {
                        setSelectedUser(user);
                        setListOpen(false);
                        setChatOpen(true);
                      }}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer mb-2 border"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
                        {user.displayName?.[0] || 'G'}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{user.displayName || 'Guest'}</h3>
                        <p className="text-sm text-gray-500">Last active: {user.lastActive?.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                  {nearbyUsers.length === 0 && (
                    <p className="text-center text-gray-500">No nearby users found</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Chat Modal */}
          {chatOpen && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {selectedUser.displayName?.[0] || 'G'}
                  </div>
                  <div className="ml-3 flex-1">
                    <h2 className="font-semibold">{selectedUser.displayName || 'Guest'}</h2>
                    <p className="text-sm text-gray-500">
                      Last active: {selectedUser.lastActive?.toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setChatOpen(false);
                      setSelectedUser(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.userId === auth.currentUser?.uid ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.userId === auth.currentUser?.uid ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                        <p className="text-sm font-medium mb-1">{msg.userName}</p>
                        {msg.type === 'text' && <p>{msg.text}</p>}
                        {msg.type === 'audio' && (
                          <audio controls src={msg.audioUrl} className="mt-2 w-full" />
                        )}
                        <p className="text-xs mt-1 opacity-70">
                          {msg.timestamp?.toDate().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => {
                        if (isRecording) {
                          stopRecording();
                          setIsRecording(false);
                        } else {
                          startRecording();
                          setIsRecording(true);
                        }
                      }}
                      className={`p-2 rounded-lg transition-colors ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                    >
                      {isRecording ? '⏹' : '🎤'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantSocialChat;