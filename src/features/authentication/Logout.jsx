import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogoutUser } from './useLogoutUser';
import SpinnerMini from '../../ui/SpinnerMini';

export default function Logout() {
  const { logout, isLoading } = useLogoutUser();

  // function handleLogout() {
  //   logout;
  // }

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
