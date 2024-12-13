import styled from 'styled-components';
import { useGetUser } from '../features/authentication/useGetUser';
// import imageDefault from '../../public/img/default-user.jpg';
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { user } = useGetUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || '../../public/img/default-user.jpg'}
        alt={`avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}
