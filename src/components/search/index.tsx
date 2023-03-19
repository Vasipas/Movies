/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getListOfMoviesRequest } from '../redux/reducers/films/reducer'
import { getFilms } from '../redux/reducers/films/selectors'
import { IParams } from '../services/api/types'

const MoviesListSearch = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(getFilms)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('title')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [sortBy, setSortBy] = useState('id')

  useEffect(() => {
    const params = {
      [searchType]: searchTerm,
      sort: sortBy,
      order: sortOrder,
    } as IParams

    dispatch(getListOfMoviesRequest(params))
  }, [searchTerm, searchType, sortOrder, sortBy, dispatch])

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value)
  }

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value)
  }

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <div>
      <div>
        <label htmlFor="searchTerm">Search:</label>
        <input id="searchTerm" type="text" value={searchTerm} onChange={handleSearchTermChange} />
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="title">Title</option>
          <option value="actor">Actor</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortOrder">Sort by:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="year">Year</option>
        </select>
      </div>
    </div>
  )
}

export default MoviesListSearch
