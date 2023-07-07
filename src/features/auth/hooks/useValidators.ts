import * as yup from 'yup'

export const useValidators = () => {
    const validators: ValidatorsType = {
        email: yup
            .string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password required')
            .min(7, 'Password must be more than 7 characters'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
        loginEmail: yup.string().required('Email is required'),
        loginPassword: yup.string().required('Password is required'),
        textInput: yup.string().required('Name Pack is required'),
    }
    return { validators }
}

// TYPES
export type ValidatorsType = {
    email?: yup.StringSchema<string, yup.AnyObject>
    password?: yup.StringSchema<string, yup.AnyObject>
    confirmPassword?: yup.StringSchema<string, yup.AnyObject>
    loginEmail?: yup.StringSchema<string, yup.AnyObject>
    loginPassword?: yup.StringSchema<string, yup.AnyObject>
    textInput?: yup.StringSchema<string, yup.AnyObject>
}
