/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-plusplus */

import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAuthToken } from '../../redux/reducers/auth/selectors'
import { getFilms, getMeta } from '../../redux/reducers/films/selectors'
import { getListOfMoviesWithDebounceRequest } from '../../redux/reducers/films/reducer'
import { IParams } from '../../services/api/types'
import FileUpload from '../../FileUpload'
import Actions from '../../Actions'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const auth = useAppSelector(getAuthToken)
  const movies = useAppSelector(getFilms)
  const meta = useAppSelector(getMeta)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('title')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [sortBy, setSortBy] = useState('id')
  const [offset, setOffset] = useState('0')
  const [limit, setLimit] = useState('20')

  const handleGoToLogin = () => {
    navigate('/login')
  }
  const handleGoToRegistration = () => {
    navigate('/signup')
  }

  useEffect(() => {
    if (auth) {
      let params = {
        sort: sortBy,
        order: sortOrder,
      } as IParams

      if (searchTerm && searchTerm.length > 1) {
        params = { ...params, [searchType]: searchTerm }
      }
      if (offset && Number(offset) !== 0) {
        params = { ...params, offset }
      }
      if (limit && Number(limit) !== 20) {
        params = { ...params, limit }
      }

      dispatch(getListOfMoviesWithDebounceRequest(params))
    }
  }, [auth, searchTerm, searchType, sortOrder, sortBy, offset, limit, dispatch])

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value)
  }

  const handleSortByChange = (value: string) => {
    setSortBy(value)
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value)
  }

  const countPages = () => {
    const total = meta?.total || 0
    const count = Math.ceil(total / +limit)
    return { pages: count, currentPage: +offset + 1 }
  }
  const renderPaginationButtons = () => {
    const pagesData = countPages()
    const buttonLabels = []
    for (let i = 0; i < pagesData.pages; i++) {
      buttonLabels.push(String(i + 1))
    }
    if (buttonLabels.length === 1) {
      return null
    }
    return buttonLabels.map((item) => {
      return (
        <button
          key={item}
          onClick={() => setOffset(String((+item - 1) * Number(limit)))}
          type="button"
        >
          {item}
        </button>
      )
    })
  }

  return (
    <div>
      {auth ? (
        <>
          <div className="flex link-row">
            <FileUpload />
            <Actions />
            <div className="flex">
              <label htmlFor="searchTerm" className="align-center">
                Search:
              </label>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="item-row"
              />
              <select value={searchType} onChange={handleSearchTypeChange}>
                <option value="title">Title</option>
                <option value="actor">Actor</option>
              </select>
            </div>
          </div>
          <div className="link-row">
            <div className="pagination">
              {renderPaginationButtons()}
              <select value={limit} onChange={handleLimitChange} className="select">
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className="link-row">
            <div className="row__cell" onClick={() => handleSortByChange('id')}>
              ID {sortBy === 'id' && sortOrder === 'ASC' && '(A-Z)'}
              {sortBy === 'id' && sortOrder === 'DESC' && '(Z-A)'}
            </div>
            <div className="row__cell" onClick={() => handleSortByChange('title')}>
              TITLE {sortBy === 'title' && sortOrder === 'ASC' && '(A-Z)'}
              {sortBy === 'title' && sortOrder === 'DESC' && '(Z-A)'}
            </div>
            <div className="row__cell" onClick={() => handleSortByChange('year')}>
              YEAR {sortBy === 'year' && sortOrder === 'ASC' && '(A-Z)'}
              {sortBy === 'year' && sortOrder === 'DESC' && '(Z-A)'}
            </div>
            <div className="row__cell">FORMAT</div>
          </div>
          {movies?.map((movie) => {
            return (
              <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                <div className="link-row">
                  <div className="row__cell">{movie.id}</div>
                  <div className="row__cell">{movie.title}</div>
                  <div className="row__cell">{movie.year}</div>
                  <div className="row__cell">{movie.format}</div>
                </div>
              </NavLink>
            )
          })}
        </>
      ) : (
        <div className="form-wrapper form-wrapper--login">
          <button type="button" className="button button--redirect" onClick={handleGoToLogin}>
            Login
          </button>
          <button type="button" className="button button--update" onClick={handleGoToRegistration}>
            Registration
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
