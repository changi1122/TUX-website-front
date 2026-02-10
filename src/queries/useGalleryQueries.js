import { useQuery } from '@tanstack/react-query';
import { fetchGalleryList } from '../api/gallery';

export const useGalleryList = (page, size, query) => {
  return useQuery({
    queryKey: ['galleryList', page, size, query],
    queryFn: () => fetchGalleryList(page, size, query),
  });
};
