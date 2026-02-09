import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCommunityList,
  fetchCommunityDetail,
  fetchMainList,
  deleteCommunity,
  addCommunityComment,
  deleteCommunityComment,
  postCommunityLike,
} from '../apis/CommunityAPI';

export const useCommunityList = (category, page, size, query) => {
  return useQuery({
    queryKey: ['communityList', category, page, size, query],
    queryFn: () => fetchCommunityList(category, page, size, query),
  });
};

export const useCommunityDetail = (postId) => {
  return useQuery({
    queryKey: ['communityDetail', postId],
    queryFn: () => fetchCommunityDetail(postId),
    enabled: !!postId,
  });
};

export const useMainPosts = () => {
  return useQuery({
    queryKey: ['mainPosts'],
    queryFn: fetchMainList,
  });
};

export const useCommunityDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => deleteCommunity(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityList'] });
    },
  });
};

export const useCommunityAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, comment }) => addCommunityComment(postId, comment),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['communityDetail', postId] });
    },
  });
};

export const useCommunityDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId }) => deleteCommunityComment(postId, commentId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['communityDetail', postId] });
    },
  });
};

export const useCommunityLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, dislike }) => postCommunityLike(postId, dislike),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['communityDetail', postId] });
    },
  });
};
