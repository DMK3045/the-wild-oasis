import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import StyledAppLayout from './StyledAppLayout';
import Main from './Main';
import Container from './Container';

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
