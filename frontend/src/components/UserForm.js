import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles/form.css';

const UserForm = ({ addUser }) => {
  const initialValues = {
    username: '',
    email: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.status}`);
      }
  
      const data = await response.json();
      addUser(data); // Add the new user to the user list
      setSubmitting(false);
    } catch (error) {
      console.error('Error adding user:', error.message);
      // Handle error state or display error message to the user
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="username">Username</label>
        <Field name="username" type="text" />
        <ErrorMessage name="username" component="div" className="error" />
        
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" component="div" className="error" />
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default UserForm;
