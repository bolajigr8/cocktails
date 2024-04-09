import React, { useState, useContext, useEffect, createContext } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const cl = console.log.bind(console)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [drinks, setDrinks] = useState([])

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const resp = await fetch(`${url}${searchTerm}`)
      const data = await resp.json()
      const { drinks } = data
      if (drinks) {
        const newDrinks = drinks.map((drink) => {
          const { idDrink, strAlcoholic, strDrink, strGlass, strDrinkThumb } =
            drink
          return {
            id: idDrink,
            name: strDrink,
            glass: strGlass,
            image: strDrinkThumb,
            alcohol: strAlcoholic,
          }
        })
        setDrinks(newDrinks)
      } else {
        setDrinks([])
      }
      setLoading(false)
    } catch (error) {
      cl(error)
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks])

  return (
    <AppContext.Provider
      value={{ loading, searchTerm, cl, drinks, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
