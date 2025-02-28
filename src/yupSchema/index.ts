import * as yup from 'yup'

export const passwordSchema = yup.object({
  currentPassword: yup.string()
    .required('Current password is required')
    .min(6, 'Password must be at least 6 characters'),
  newPassword: yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const personalInfoSchema = yup.object({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  fullName: yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must not exceed 50 characters'),
  phoneNumber: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 characters')
});
