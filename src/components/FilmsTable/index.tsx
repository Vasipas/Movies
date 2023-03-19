import { useAppSelector } from '../redux/hooks'
import { getFilms } from '../redux/reducers/films/selectors'

const FilmsTable = () => {
  const fileContent = useAppSelector(getFilms)

  return (
    <div>
      {fileContent?.map((film) => {
        return (
          <div className="item-wrapper">
            <div className="item-cell">{film.title}</div>
            <div className="item-cell">{film.year}</div>
            <div className="item-cell">{film.format}</div>
            <div className="item-cell">{film.createdAt}</div>
          </div>
        )
      })}
    </div>
  )
}

export default FilmsTable
