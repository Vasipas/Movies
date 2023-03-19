/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

import { signUpUserRequest } from '../redux/reducers/auth/reducer'
import { useAppDispatch } from '../redux/hooks'

const initialValues = { name: '', email: '', password: '', confirmPassword: '' }

export type TRegistrationData = typeof initialValues

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(signUpUserRequest(values))
        resetForm()
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form-wrapper">
          <div className="input-wrapper">
            <label className="label" htmlFor="name">
              Username:
            </label>
            <Field type="text" id="name" name="name" className="item-row item-row--high" />
            <ErrorMessage name="name" />
          </div>
          <div className="input-wrapper">
            <label className="label" htmlFor="email">
              Email:
            </label>
            <Field type="email" id="email" name="email" className="item-row item-row--high" />
            <ErrorMessage name="email" />
          </div>
          <div className="input-wrapper">
            <label className="label" htmlFor="password">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="item-row item-row--high"
            />
            <ErrorMessage name="password" />
          </div>
          <div className="input-wrapper">
            <label className="label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="item-row item-row--high"
            />
            <ErrorMessage name="confirmPassword" />
          </div>
          <button type="submit" className="button button--update" disabled={isSubmitting}>
            Register
          </button>
          <button type="button" className="button button--redirect" onClick={() => navigate('/')}>
            Go Back
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default RegistrationForm
