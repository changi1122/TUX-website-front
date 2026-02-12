import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set) => ({
      // 커뮤니티 + 자료실 공통
      viewMode: 'list', // 'list' | 'detail'
      setViewMode: (mode) => set({ viewMode: mode }),
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === 'list' ? 'detail' : 'list',
        })),

      // 갤러리 별도
      galleryViewMode: 'gallery', // 'gallery' | 'list' | 'detail'
      setGalleryViewMode: (mode) => set({ galleryViewMode: mode }),
    }),
    {
      name: 'ui-storage', // localStorage key
    }
  )
);

export default useUIStore;
