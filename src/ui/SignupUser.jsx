import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { useSignup } from '../features/authentication/useSignup';
import SpinnerMini from './SpinnerMini';

export default function SignupUser() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { signup, isLoading } = useSignup();

  function onSubmit(data) {
    console.log('Data from Signup', data);
    const { email, fullname, password } = data;
    signup(
      { fullname, email, password },
      {
        onSettled: reset,
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" error={errors?.fullname?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullname"
          {...register('fullname', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Email Address" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: emailRegex,
            message: 'Provide a valid email address',
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min Characters 8)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password must be atleast 8 characters',
            },
          })}
        />
      </FormRow>
      <FormRow label="Repeat Password" error={errors?.passwordconfirm?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="passwordconfirm"
          {...register('passwordconfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button variations="secondary" type="reset">
          Cancel
        </Button>
        <Button variations="primary" type="submit">
          {!isLoading ? 'Create New User' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}
