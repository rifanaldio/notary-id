import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {}, // { consultationId: [messages] }
  typing: {}, // { consultationId: { userId: boolean } }
  onlineUsers: {}, // { consultationId: [userIds] }
  currentConsultationId: null,
  files: {} // { consultationId: [files] } - files with status
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentConsultation: (state, action) => {
      state.currentConsultationId = action.payload;
    },
    addMessage: (state, action) => {
      const { consultationId, message } = action.payload;
      if (!state.messages[consultationId]) {
        state.messages[consultationId] = [];
      }
      state.messages[consultationId].push(message);
    },
    setMessages: (state, action) => {
      const { consultationId, messages } = action.payload;
      state.messages[consultationId] = messages;
    },
    setTyping: (state, action) => {
      const { consultationId, userId, isTyping } = action.payload;
      if (!state.typing[consultationId]) {
        state.typing[consultationId] = {};
      }
      if (isTyping) {
        state.typing[consultationId][userId] = true;
      } else {
        delete state.typing[consultationId][userId];
      }
    },
    setOnlineUsers: (state, action) => {
      const { consultationId, userIds } = action.payload;
      state.onlineUsers[consultationId] = userIds;
    },
    addFile: (state, action) => {
      const { consultationId, file } = action.payload;
      if (!state.files[consultationId]) {
        state.files[consultationId] = [];
      }
      // Add file with default status 'reviewing'
      state.files[consultationId].push({
        ...file,
        status: file.status || 'reviewing', // reviewing, revision, failed, approved
        uploadedAt: file.uploadedAt || new Date().toISOString()
      });
    },
    updateFileStatus: (state, action) => {
      const { consultationId, fileId, status, comment } = action.payload;
      if (state.files[consultationId]) {
        const fileIndex = state.files[consultationId].findIndex(f => f.id === fileId);
        if (fileIndex !== -1) {
          state.files[consultationId][fileIndex].status = status;
          if (comment) {
            state.files[consultationId][fileIndex].comment = comment;
          }
          state.files[consultationId][fileIndex].updatedAt = new Date().toISOString();
        }
      }
    },
    setFiles: (state, action) => {
      const { consultationId, files } = action.payload;
      state.files[consultationId] = files;
    },
    clearChat: (state, action) => {
      const consultationId = action.payload;
      if (consultationId) {
        delete state.messages[consultationId];
        delete state.typing[consultationId];
        delete state.onlineUsers[consultationId];
        delete state.files[consultationId];
      } else {
        state.messages = {};
        state.typing = {};
        state.onlineUsers = {};
        state.files = {};
      }
    }
  }
});

export const {
  setCurrentConsultation,
  addMessage,
  setMessages,
  setTyping,
  setOnlineUsers,
  addFile,
  updateFileStatus,
  setFiles,
  clearChat
} = chatSlice.actions;

export default chatSlice.reducer;
