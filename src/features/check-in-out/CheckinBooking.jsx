import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking } from '../bookings/useGetBooking';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useGetSettings } from '../settings/useGetSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking = {}, isLoading } = useGetBooking();
  const { checkin, isCheckingin } = useCheckin();
  const { settings = {}, isLoadingSettings } = useGetSettings();
  console.log('This is settings:::', settings);

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid || false);
    },
    [booking.isPaid]
  );
  console.log('This is booking::', booking);

  if (isLoading || isLoadingSettings || !booking || !settings)
    return <Spinner />;

  const {
    id: bookingId,
    Guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(settings.breakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid || isCheckingin}
          onChange={() => setConfirmPaid((paid) => !paid)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {Guests.fullName} has paid the total amount of{' '}
          {formatCurrency(
            !addBreakfast ? totalPrice : totalPrice + optionalBreakfast
          )}
          {addBreakfast &&
            ` (${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfast
            )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
