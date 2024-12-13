import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import FormRow from '../../ui/FormRow';
import Label from '../../ui/Label';
import StyledError from '../../ui/StyledError';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  console.log('edit values:::', editValues);

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: isEditSession ? editValues : '',
  });

  const { errors, isCreating, mutate } = useCreateCabin();

  const { isEditing, updateCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);

    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(editValues),
        }
      );
    else
      mutate(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />

        {errors?.name?.message && (
          <StyledError>{errors.name.message}</StyledError>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
        {errors?.maxCapacity?.message && (
          <StyledError>{errors.maxCapacity.message}</StyledError>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Price should be at least 1' },
          })}
        />
        {errors?.regularPrice?.message && (
          <StyledError>{errors.regularPrice.message}</StyledError>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value < getValues('regularPrice') ||
              'Discount must be less than the regular price',
          })}
        />
        {errors?.discount?.message && (
          <StyledError>{errors.discount.message}</StyledError>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
        {errors?.description?.message && (
          <StyledError>{errors.description.message}</StyledError>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? 'Update Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
