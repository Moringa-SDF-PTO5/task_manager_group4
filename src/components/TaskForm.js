import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ title: '', description: '', dueDate: '' }}
      validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        dueDate: Yup.date().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <Field name="dueDate" type="date" />
            <ErrorMessage name="dueDate" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
