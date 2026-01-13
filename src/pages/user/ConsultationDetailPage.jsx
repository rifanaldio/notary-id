import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ArrowLeft, Send, Paperclip, X } from 'lucide-react';
import { io } from 'socket.io-client';
import { setCurrentConsultation, addMessage, setTyping, setMessages, addFile } from '../../store/chatSlice';
import FileList from '../../components/user/FileList';
import FileIcon from '../../components/common/FileIcon';
import { formatFileSize, formatRelativeTime } from '../../utils/formatters';

const ConsultationDetailPage = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { consultations } = useAppSelector((state) => state.consultation);
  const { user } = useAppSelector((state) => state.auth);
  const { messages, typing, files } = useAppSelector((state) => state.chat);
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const consultation = consultations.find(c => c.id === consultationId);
  const consultationMessages = messages[consultationId] || [];
  const consultationFiles = files[consultationId] || [];

  // Initialize Socket.io connection
  useEffect(() => {
    if (!consultationId || !user) return;

    // Connect to Socket.io server
    // In production, replace with your actual server URL
    const newSocket = io('http://localhost:3001', {
      query: {
        consultationId,
        userId: user.id,
        userType: 'user' // or 'notary'
      }
    });

    setSocket(newSocket);
    dispatch(setCurrentConsultation(consultationId));

    // Listen for messages
    newSocket.on('message', (data) => {
      dispatch(addMessage({
        consultationId,
        message: {
          id: data.id || Date.now().toString(),
          text: data.text,
          senderId: data.senderId,
          senderName: data.senderName,
          senderType: data.senderType,
          timestamp: data.timestamp || new Date().toISOString(),
          files: data.files || []
        }
      }));
    });

    // Listen for typing indicators
    newSocket.on('typing', (data) => {
      dispatch(setTyping({
        consultationId,
        userId: data.userId,
        isTyping: data.isTyping
      }));
    });

    // Load previous messages (dummy data for now)
    // In production, fetch from your API
    const dummyMessages = [
      {
        id: '1',
        text: 'Selamat pagi, saya ingin berkonsultasi mengenai pendirian PT.',
        senderId: user.id,
        senderName: user.name || 'User',
        senderType: 'user',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        files: []
      },
      {
        id: '2',
        text: 'Baik, saya siap membantu. Silakan kirim dokumen yang diperlukan.',
        senderId: consultation?.notaryId || 'notary-1',
        senderName: consultation?.notaryName || 'Notaris',
        senderType: 'notary',
        timestamp: new Date(Date.now() - 3300000).toISOString(),
        files: []
      }
    ];

    // Load dummy messages
    dispatch(setMessages({ consultationId, messages: dummyMessages }));

    // Files will be empty initially, only show when user uploads

    return () => {
      newSocket.close();
    };
  }, [consultationId, user, dispatch, files]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consultationMessages]);

  // Handle send message
  const handleSendMessage = async () => {
    if (!message.trim() && selectedFiles.length === 0) return;
    if (!socket || !user) return;

    // Upload files if any
    const uploadedFiles = [];
    for (const file of selectedFiles) {
      // In production, upload to your file storage (e.g., Firebase Storage, AWS S3)
      // For now, create a file object with preview
      const fileId = Date.now().toString() + Math.random();
      const fileData = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // Temporary URL for preview
        uploaded: false, // Mark as not uploaded yet
        status: 'reviewing', // Default status: sedang diperiksa
        uploadedAt: new Date().toISOString()
      };
      uploadedFiles.push(fileData);
      
      // Add file to Redux store for file list
      dispatch(addFile({
        consultationId,
        file: fileData
      }));
    }

    // Create message object
    const messageData = {
      id: Date.now().toString(),
      text: message,
      senderId: user.id,
      senderName: user.name || user.phone || 'User',
      senderType: 'user',
      timestamp: new Date().toISOString(),
      files: uploadedFiles
    };

    // Emit message to server
    socket.emit('message', {
      consultationId,
      ...messageData
    });

    // Add message to local state immediately
    dispatch(addMessage({
      consultationId,
      message: messageData
    }));

    // Clear input and files
    setMessage('');
    setSelectedFiles([]);
    setIsTyping(false);
    
    // Stop typing indicator
    if (socket) {
      socket.emit('typing', {
        consultationId,
        userId: user.id,
        isTyping: false
      });
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert(`File ${file.name} terlalu besar. Maksimal 10MB.`);
        return false;
      }
      return true;
    });
    setSelectedFiles([...selectedFiles, ...validFiles]);
  };

  // Remove selected file
  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  // Handle typing indicator
  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    if (!socket || !user) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', {
        consultationId,
        userId: user.id,
        isTyping: true
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (socket) {
        socket.emit('typing', {
          consultationId,
          userId: user.id,
          isTyping: false
        });
      }
    }, 3000);
  };


  if (!consultation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted dark:text-brand-light/70 mb-4">
            Konsultasi tidak ditemukan
          </p>
          <button
            onClick={() => navigate('/konsultasi-aktif')}
            className="px-6 py-2 rounded-xl bg-brand-primary text-white font-semibold hover:opacity-90 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const isUserMessage = (msg) => msg.senderType === 'user';
  const typingUsers = typing[consultationId] || {};

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark/50 flex flex-col">
      {/* Header - Sticky mentok dengan navbar */}
      <div className="bg-white dark:bg-brand-dark border-b border-brand-muted/20 dark:border-brand-light/10 sticky top-0 z-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/konsultasi-aktif')}
              className="p-2 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
            >
              <ArrowLeft size={20} className="text-brand-dark dark:text-brand-light" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-brand-dark dark:text-brand-light">
                {consultation.notaryName}
              </h1>
              <p className="text-xs text-brand-muted dark:text-brand-light/70">
                {consultation.notarySpecialization}
              </p>
            </div>
            <div className="text-xs text-brand-muted dark:text-brand-light/70">
              ID: {consultation.id}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Columns Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Chat Messages */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-3xl mx-auto space-y-4">
          {consultationMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${isUserMessage(msg) ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm ${
                  isUserMessage(msg)
                    ? 'bg-brand-primary text-white ml-auto'
                    : 'bg-white dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 text-brand-dark dark:text-brand-light'
                }`}
              >
                {!isUserMessage(msg) && (
                  <p className="text-xs font-semibold mb-1.5 text-brand-dark dark:text-brand-light opacity-90">
                    {msg.senderName}
                  </p>
                )}
                
                {msg.text && (
                  <p className={`text-sm sm:text-base leading-relaxed ${isUserMessage(msg) ? 'text-white' : 'text-brand-dark dark:text-brand-light'} whitespace-pre-wrap break-words`}>
                    {msg.text}
                  </p>
                )}

                {msg.files && msg.files.length > 0 && (
                  <div className="mt-2.5 space-y-2">
                    {msg.files.map((file) => (
                      <a
                        key={file.id}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg ${
                          isUserMessage(msg)
                            ? 'bg-white/20 text-white hover:bg-white/30'
                            : 'bg-brand-muted/10 dark:bg-brand-muted/20 hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30'
                        } transition-colors`}
                      >
                        <FileIcon fileType={file.type} size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{file.name}</p>
                          <p className="text-[10px] opacity-70 mt-0.5">{formatFileSize(file.size)}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                <p className={`text-[10px] mt-2.5 pt-1 ${isUserMessage(msg) ? 'text-white/70' : 'text-brand-muted dark:text-brand-light/60'}`}>
                  {formatRelativeTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {Object.keys(typingUsers).length > 0 && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand-muted dark:bg-brand-light/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-brand-muted dark:bg-brand-light/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-brand-muted dark:bg-brand-light/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-brand-muted dark:text-brand-light/70">Mengetik...</span>
                </div>
              </div>
            </div>
          )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-8 py-3 bg-white dark:bg-brand-dark border-t border-brand-muted/20 dark:border-brand-light/10">
              <div className="max-w-3xl mx-auto">
                <p className="text-xs font-medium text-brand-muted dark:text-brand-light/70 mb-2">
                  File yang akan dikirim ({selectedFiles.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-brand-muted/10 dark:bg-brand-muted/20 rounded-lg border border-brand-muted/20 dark:border-brand-light/10 hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition-colors"
                    >
                      <FileIcon fileType={file.type} size={16} />
                      <span className="text-xs truncate max-w-[150px] text-brand-dark dark:text-brand-light">{file.name}</span>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="p-1 rounded hover:bg-brand-muted/30 dark:hover:bg-brand-muted/40 transition-colors"
                        aria-label="Hapus file"
                      >
                        <X size={14} className="text-brand-muted dark:text-brand-light/70" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-white dark:bg-brand-dark border-t border-brand-muted/20 dark:border-brand-light/10 shadow-lg">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {/* File Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 sm:p-3 rounded-xl bg-brand-muted/10 dark:bg-brand-muted/20 hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 active:scale-95 transition-all flex-shrink-0"
                  title="Lampirkan File"
                  aria-label="Lampirkan File"
                >
                  <Paperclip size={20} className="text-brand-dark dark:text-brand-light" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                />

                {/* Message Input */}
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={handleTyping}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ketik pesan..."
                    rows={1}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-brand-muted/30 dark:border-brand-light/10 bg-brand-muted/5 dark:bg-brand-dark text-brand-dark dark:text-brand-light placeholder-brand-muted dark:placeholder-brand-light/50 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all"
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] text-brand-muted dark:text-brand-light/50">
                    Enter untuk kirim, Shift+Enter untuk baris baru
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!message.trim() && selectedFiles.length === 0}
                  className="p-2.5 sm:p-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 active:scale-95 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0 shadow-md hover:shadow-lg"
                  title="Kirim Pesan"
                  aria-label="Kirim Pesan"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - File List */}
        <div className="hidden lg:flex w-80 border-l border-brand-muted/20 dark:border-brand-light/10 bg-white dark:bg-brand-dark flex-col shadow-lg">
          <FileList 
            files={consultationFiles}
            onFileClick={(file) => {
              // Open file in new tab
              if (file.url) {
                window.open(file.url, '_blank');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetailPage;
