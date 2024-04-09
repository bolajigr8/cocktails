import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const searchItem = useRef('')
  useEffect(() => searchItem.current.focus(), [])
  const searchDrink = () => {
    setSearchTerm(searchItem.current.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const { setSearchTerm, searchTerm } = useGlobalContext()
  return (
    <section className='search section'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='search'>search your favourite cocktail</label>
          <input type='text' ref={searchItem} onChange={searchDrink} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
