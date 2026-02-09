import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCurrentUser, login, logout, updateUser, deleteUser } from '../apis/UserAPI';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
