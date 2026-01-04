import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

function FormikForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Simulate API call to mock endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        
        // Show success message
        setSubmitSuccess(true);
        setStatus({ success: true });
        
        // Reset form
        resetForm();

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setStatus(null);
        }, 3000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setStatus({ error: 'Registration failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">
            Register using Formik
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, errors, touched }) => (
            <>
              {/* Success Message */}
              {submitSuccess && status?.success && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-700 font-semibold">
                      Registration successful! 🎉
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status?.error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700">{status.error}</p>
                </div>
              )}

              <Form className="space-y-6">
                {/* Username Field */}
                <div>
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.username && touched.username
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                    }`}
                    placeholder="Enter your username"
                  />
                  <ErrorMessage 
                    name="username" 
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    {msg => (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email && touched.email
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage 
                    name="email" 
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    {msg => (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                {/* Password Field */}
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.password && touched.password
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage 
                    name="password" 
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    {msg => (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-md transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    'Register'
                  )}
                </button>
              </Form>
            </>
          )}
        </Formik>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
            Sign in
          </a>
        </p>

        {/* Formik Benefits Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Formik Benefits:
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Less boilerplate code</li>
            <li>✓ Built-in validation with Yup</li>
            <li>✓ Automatic error handling</li>
            <li>✓ Form state management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FormikForm;