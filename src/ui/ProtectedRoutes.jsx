import { useGetUser } from '../features/authentication/useGetUser';
import { styled } from 'styled-components';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-items: center;
`;

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useGetUser();
  // 2. If there is no authenticated user redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3. While loading show the spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. if there is user, render the app
  if (isAuthenticated) return children;
}
