import { useMutation } from '@tanstack/react-query';
import { Login } from '../../services/apiLogin';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: apiLogin, isLoading: isLogginIn } = useMutation({
    mutationFn: ({ email, password }) => Login({ email, password }),
    onSuccess: () => {
      toast.success('Welcome back!');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.log('Login Error', error);
      toast.error('Provided email or password is not correct');
    },
  });
  return { apiLogin, isLogginIn };
}
