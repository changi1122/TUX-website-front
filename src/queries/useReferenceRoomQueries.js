import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchReferenceRoomList,
  fetchReferenceRoomDetail,
  deleteReferenceRoom,
  addReferenceRoomComment,
  deleteReferenceRoomComment,
  postReferenceRoomLike,
} from '../apis/ReferenceRoomAPI';

export const useReferenceRoomList = (category, page, size, query) => {
  return useQuery({
    queryKey: ['referenceRoomList', category, page, size, query],
    queryFn: () => fetchReferenceRoomList(category, page, size, query),
  });
};

export const useReferenceRoomDetail = (postId) => {
  return useQuery({
    queryKey: ['referenceRoomDetail', postId],
    queryFn: () => fetchReferenceRoomDetail(postId),
    enabled: !!postId,
  });
};

export const useReferenceRoomDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => deleteReferenceRoom(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referenceRoomList'] });
    },
  });
};

export const useReferenceRoomAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, comment }) => addReferenceRoomComment(postId, comment),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['referenceRoomDetail', postId] });
    },
  });
};

export const useReferenceRoomDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId }) => deleteReferenceRoomComment(postId, commentId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['referenceRoomDetail', postId] });
    },
  });
};

export const useReferenceRoomLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, dislike }) => postReferenceRoomLike(postId, dislike),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['referenceRoomDetail', postId] });
    },
  });
};
