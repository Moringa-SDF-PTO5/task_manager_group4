import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProjectForm = ({ addProject }) => {
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('http://localhost:5000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            addProject(data);
            setSubmitting(false);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setSubmitting(false);
          });
      }}
    >
      <Form>
        <label htmlFor="name">Project Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ProjectForm;
