import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Spinner from '../../ui/Spinner';
import { useEditSettings } from './useEditSettings';
import { useGetSettings } from './useGetSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useGetSettings();

  const { isEditing, updateSettings } = useEditSettings();

  function handleEditSettings(e, field) {
    const value = e.target.value;
    updateSettings({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleEditSettings(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleEditSettings(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-guests">Max Guests per Booking</Label>
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={(e) => handleEditSettings(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfast-price">Breakfast Price</Label>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handleEditSettings(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
