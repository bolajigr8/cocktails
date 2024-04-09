import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const { loading, drinks } = useGlobalContext()

  if (loading) {
    return <Loading />
  }
  if (drinks.length < 1) {
    return (
      <section>
        <h1 className='section-title'>
          no cocktails match your search criteria
        </h1>
      </section>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {drinks.map((cocktail) => {
          return <Cocktail {...cocktail} key={cocktail.id} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
