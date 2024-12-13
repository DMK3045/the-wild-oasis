import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../services/apiLogin';
import { useNavigate } from 'react-router-dom';

export function useLogoutUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isLoading };
}
