import { useMutation } from '@tanstack/react-query';
import { signUp as apisignup } from '../../services/apiLogin';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: apisignup,
    onSuccess: (data) => {
      console.log('Sign up data', data);
      toast.success(
        "Signed up successfully. Please verify account in the user's email address"
      );
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login Error:::', error);
    },
  });

  return { signup, isLoading };
}
