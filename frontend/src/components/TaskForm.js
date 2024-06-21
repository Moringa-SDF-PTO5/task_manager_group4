import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ addTask }) => {
  return (
    <Formik
      initialValues={{ title: '', description: '', user_id: '', project_id: '' }}
      validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string(),
        user_id: Yup.number().required('Required'),
        project_id: Yup.number().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then(data => {
            addTask(data);
            setSubmitting(false);
          });
      }}
    >
      <Form>
        <label htmlFor="title">Task Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" />

        <label htmlFor="description">Description</label>
        <Field name="description" type="text" />
        <ErrorMessage name="description" />

        <label htmlFor="user_id">User ID</label>
        <Field name="user_id" type="number" />
        <ErrorMessage name="user_id" />

        <label htmlFor="project_id">Project ID</label>
        <Field name="project_id" type="number" />
        <ErrorMessage name="project_id" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
