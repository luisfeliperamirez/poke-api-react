import { useState } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import Sidebar from './components/Sidebar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'
import useFetch from './hooks/useFetch'

function App() {
  const [searchText, setSearchText] = useState('')
  const [favoritos, setFavoritos] = useState([])
  const { data, loading, error } = useFetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )

  const pokemons = data?.results || []
  const filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  })

  function toggleFavorito(pokemon) {
    setFavoritos((current) => {
      const alreadyFavorito = current.some((item) => item.name === pokemon.name)
      if (alreadyFavorito) {
        return current.filter((item) => item.name !== pokemon.name)
      }
      return [...current, pokemon]
    })
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Explora Pokémons, busca por nombre y revisa su número de pokédex.</p>
      </header>

      <main className="app-layout">
        <section className="main-content">
          <SearchBar
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          {loading && <p className="status-message">Cargando...</p>}
          {error && (
            <p className="status-message status-error">
              Error al cargar los Pokémon. Intenta de nuevo más tarde.
            </p>
          )}

          {!loading && !error && filteredPokemons.length === 0 && (
            <p className="status-message status-empty">
              No se encontraron Pokémon con ese nombre.
            </p>
          )}

          {!loading && !error && filteredPokemons.length > 0 && (
            <PokemonList
              pokemons={filteredPokemons}
              favoritos={favoritos}
              onToggleFavorito={toggleFavorito}
            />
          )}

          <Stats />
        </section>

        <aside className="sidebar">
          <Sidebar favoritos={favoritos} />
        </aside>
      </main>

      <footer className="app-footer">
        <p>Creado por Luis-Felipe Ramirez Santander</p>
      </footer>
    </div>
  )
}

export default App
