import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deleteMovieRequest, showMovieRequest } from '../../redux/reducers/films/reducer'
import { getOneFilm } from '../../redux/reducers/films/selectors'

const MoviePage = () => {
  const dispatch = useAppDispatch()
  const params = useParams() as { id: string }
  const navigate = useNavigate()
  const movie = useAppSelector(getOneFilm)
  const { id } = params

  useEffect(() => {
    dispatch(showMovieRequest(id))
  }, [dispatch, id])

  const handleUpdateMovie = () => {
    navigate(`/update/${id}`)
  }

  const handleDeleteMovie = () => {
    dispatch(deleteMovieRequest(id))
    navigate('/')
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="item-wrapper">
      <div className="item-row">Title: {movie?.title}</div>
      <div className="item-row">Format: {movie?.format}</div>
      <div className="item-row">Production Year: {movie?.year}</div>
      <div className="item-row item-row--actors">
        Actors:
        {movie?.actors.map((actor) => {
          return (
            <div className="actor" key={actor.id}>
              {actor.name}
            </div>
          )
        })}
      </div>
      <button className="button button--update" type="button" onClick={handleUpdateMovie}>
        Update
      </button>
      <button className="button button--delete" type="button" onClick={handleDeleteMovie}>
        Delete
      </button>
      <button className="button button--redirect" type="submit" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  )
}

export default MoviePage
