import * as yup from 'yup'

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
});

export const personalInfoSchema = yup.object({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  fullName: yup.string(),
  phoneNumber: yup.string()
});
