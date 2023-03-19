/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import { useAppDispatch } from '../redux/hooks'
import { signInRequest } from '../redux/reducers/auth/reducer'

const initialValues = {
  email: '',
  password: '',
}

export type TLoginData = typeof initialValues

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(signInRequest(values))
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form-wrapper">
          <div className="item-row">
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" required className="item-row" />
            <ErrorMessage name="email" />
          </div>
          <div className="item-row">
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" required className="item-row" />
            <ErrorMessage name="password" />
          </div>
          <button type="submit" className="button button--update" disabled={isSubmitting}>
            Log In
          </button>
          <button type="button" className="button button--redirect" onClick={() => navigate('/')}>
            Go Back
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
