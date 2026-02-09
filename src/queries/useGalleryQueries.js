import { useQuery } from '@tanstack/react-query';
import { fetchGalleryList } from '../apis/GalleryAPI';

export const useGalleryList = (page, size, query) => {
  return useQuery({
    queryKey: ['galleryList', page, size, query],
    queryFn: () => fetchGalleryList(page, size, query),
  });
};
