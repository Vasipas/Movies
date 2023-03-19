/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../redux/hooks'
import { createMovieRequest } from '../../redux/reducers/films/reducer'
import { EFilmFormat, ICreateMovieData } from '../../redux/reducers/films/types'

const initialValues = {
  title: '',
  year: '',
  format: EFilmFormat.VHS,
  actors: [],
}

const MovieForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {} as { [key: string]: string }
        if (!values.title) {
          errors.title = 'Required'
        }
        if (!values.year) {
          errors.year = 'Required'
        }
        if (!values.format) {
          errors.format = 'Required'
        }
        if (!values.actors || !values.actors.length) {
          errors.actors = 'At least one actor is required'
        }
        return errors
      }}
      onSubmit={(values) => {
        dispatch(
          createMovieRequest({
            data: { ...values, year: Number(values.year) } as ICreateMovieData,
            navigate,
          })
        )
        // Send data to server
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="form-wrapper item-wrapper">
          <div>
            <label htmlFor="title">Title:</label>
            <Field className="item-row" type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <Field className="item-row" type="text" name="year" />
            <ErrorMessage name="year" component="div" />
          </div>
          <div className="item-row">
            <label>Format:</label>
            <div role="group" aria-labelledby="format-label">
              <label>
                <Field type="radio" name="format" value="VHS" />
                VHS
              </label>
              <label>
                <Field type="radio" name="format" value="DVD" />
                DVD
              </label>
              <label>
                <Field type="radio" name="format" value="Blu-ray" />
                Blu-ray
              </label>
            </div>
            <ErrorMessage name="format" component="div" />
          </div>
          <div className="item-row field">
            <label htmlFor="actors">Actors:</label>
            <div className="actors-wrapper">
              {values.actors.map((actor, index) => (
                <div className="actor" key={index}>
                  {actor}
                </div>
              ))}
            </div>
            <Field
              className="item-row"
              type="text"
              name="actors"
              onChange={(event: { target: { value: string } }) => {
                const actors = event.target.value.split(',')
                setFieldValue('actors', actors)
              }}
            />
            <ErrorMessage name="actors" component="div" />
          </div>
          <button className="button button--update" type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <button className="button button--redirect" type="submit" onClick={handleGoBack}>
            Go Back
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MovieForm
