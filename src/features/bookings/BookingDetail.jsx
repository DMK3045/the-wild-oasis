import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useGetBooking } from './useGetBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking = [], isLoading } = useGetBooking();
  const navigate = useNavigate();

  const { status, id } = booking;

  const moveBack = useMoveBack();
  const { apiDeleteBooking, isDeletingBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (booking.length > 1) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === 'unconfirmed' && (
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            icon={<HiArrowDownOnSquare />}
          >
            Check in{' '}
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            disabled={isCheckingOut}
            onClick={() => checkout(id)}
            icon={<HiArrowUpOnSquare />}
          >
            Check Out{' '}
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button
              variations="danger"
              disabled={isDeletingBooking}
              icon={<HiTrash />}
            >
              Delete{' '}
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => apiDeleteBooking(Number(bookingId))}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
