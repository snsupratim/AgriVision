import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  Leaf,
} from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello farmer! How can I help you with your agricultural queries today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  // Send user message to backend
  const sendMessageToBackend = async (userMessage) => {
    try {
      const response = await fetch("http://127.0.0.1:9000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      return response.ok ? data.reply : "Sorry, something went wrong!";
    } catch (error) {
      console.error("Server error:", error);
      return "Server unreachable. Please check your connection.";
    }
  };

  // Handle message sending
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Update UI with user message
    const newMessages = [...messages, { text: inputValue, sender: "user" }];
    setMessages(newMessages);
    setInputValue("");

    // Fetch response from backend
    const botReply = await sendMessageToBackend(inputValue);
    setMessages([...newMessages, { text: botReply, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-200"
          aria-label="Open farmer assistance chat"
        >
          <Leaf size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 md:w-96 border border-gray-200 overflow-hidden">
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <Leaf size={28} />
              <span>Farmer Support</span>
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-green-700 rounded p-1"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-700 rounded p-1"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-green-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.sender === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3/4 p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-green-600 text-white rounded-br-none"
                          : "bg-green-100 text-green-800 rounded-bl-none"
                      }`}
                      style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }} // Ensures text formatting is applied
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSendMessage}
                className="border-t border-gray-200 p-3 flex"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about crops, weather, or farming..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ color: "black", placeholderColor: "black" }}
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                  disabled={!inputValue.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
