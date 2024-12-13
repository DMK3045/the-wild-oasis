import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiLogin';

export function useGetUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
  if (error) throw new Error(error.message);
  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
