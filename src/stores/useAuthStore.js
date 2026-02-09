import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // 상태
  isInitialized: false,
  expiresIn: null,
  userId: null,
  username: '',
  nickname: '',
  role: '',
  isLoggedIn: false,
  email: '',
  phoneNumber: '',
  department: '',
  studentNumber: '',

  // 액션
  login: (payload) => set({
    isInitialized: true,
    expiresIn: payload.refreshToken.expiresIn,
    userId: payload.user.id,
    username: payload.user.username,
    nickname: payload.user.nickname,
    role: payload.user.role,
    isLoggedIn: true,
  }),
  logout: () => set({
    isInitialized: true, expiresIn: null, userId: null,
    username: '', nickname: '', role: '', isLoggedIn: false,
    email: '', phoneNumber: '', department: '', studentNumber: '',
  }),
  setUser: (payload) => set({
    isInitialized: true,
    expiresIn: payload.expiresIn,
    userId: payload.userId,
    username: payload.username,
    nickname: payload.nickname,
    role: payload.role,
    isLoggedIn: true,
  }),
  getUser: (payload) => set((state) => ({
    ...state, isInitialized: true, isLoggedIn: true,
    userId: payload.id, username: payload.username,
    nickname: payload.nickname, role: payload.role,
    email: payload.email, phoneNumber: payload.phoneNumber,
    department: payload.department, studentNumber: payload.studentNumber,
  })),
  initGuest: () => set((state) => ({ ...state, isInitialized: true })),
  updateUser: (key, value) => set((state) => ({ ...state, [key]: value })),
}));

export default useAuthStore;
