/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { showMovieRequest, updateMovieRequest } from '../../redux/reducers/films/reducer'
import { getOneFilm } from '../../redux/reducers/films/selectors'
import { EFilmFormat, ICreateMovieData } from '../../redux/reducers/films/types'

const UpdatePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams() as { id: string }
  const movie = useAppSelector(getOneFilm)
  const { id } = params

  useEffect(() => {
    dispatch(showMovieRequest(id))
  }, [dispatch, id])

  const initialValues: ICreateMovieData = {
    title: movie?.title || '',
    year: Number(movie?.year || 0),
    format: movie?.format || EFilmFormat.VHS,
    actors: movie?.actors.map((actor) => actor.name) || [],
  }

  const handleGoBack = () => {
    navigate(`/movie/${id}`)
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
        dispatch(updateMovieRequest({ data: { ...values, id }, navigate }))
      }}
      enableReinitialize
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="form-wrapper item-wrapper">
          <div className="field">
            <label htmlFor="title">Title:</label>
            <Field className="item-row" type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div className="field">
            <label htmlFor="year">Year:</label>
            <Field className="item-row" type="text" name="year" />
            <ErrorMessage name="year" component="div" />
          </div>
          <div className="item-row field">
            <label>Format:</label>
            <div role="group" aria-labelledby="format-label">
              <label>
                <Field type="radio" name="format" value={EFilmFormat.VHS} />
                VHS
              </label>
              <label>
                <Field type="radio" name="format" value={EFilmFormat.DVD} />
                DVD
              </label>
              <label>
                <Field type="radio" name="format" value={EFilmFormat['Blu-ray']} />
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
              className="item-row field"
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
            Update
          </button>
          <button className="button button--redirect" type="submit" onClick={handleGoBack}>
            Cancel and Go Back
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default UpdatePage
