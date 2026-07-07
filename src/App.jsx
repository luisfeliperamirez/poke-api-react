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
  const [bloqueados, setBloqueados] = useState([])
  const { data, loading, error } = useFetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )

  const pokemons = data?.results || []
  const filteredPokemons = pokemons
    .filter((pokemon) => !bloqueados.some((blocked) => blocked.name === pokemon.name))
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    )

  function toggleFavorito(pokemon) {
    if (bloqueados.some((blocked) => blocked.name === pokemon.name)) {
      return
    }

    setFavoritos((current) => {
      const alreadyFavorito = current.some((item) => item.name === pokemon.name)
      if (alreadyFavorito) {
        return current.filter((item) => item.name !== pokemon.name)
      }
      return [...current, pokemon]
    })
  }

  function toggleBloqueado(pokemon) {
    setBloqueados((current) => {
      const alreadyBloqueado = current.some((item) => item.name === pokemon.name)
      if (alreadyBloqueado) {
        return current.filter((item) => item.name !== pokemon.name)
      }

      setFavoritos((currentFavorites) =>
        currentFavorites.filter((item) => item.name !== pokemon.name)
      )

      return [...current, pokemon]
    })
  }

  function desbloquearPokemon(pokemon) {
    setBloqueados((current) =>
      current.filter((item) => item.name !== pokemon.name)
    )
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
              bloqueados={bloqueados}
              onToggleFavorito={toggleFavorito}
              onToggleBloqueado={toggleBloqueado}
            />
          )}

          <Stats
            totalPokemon={pokemons.length}
            totalFavoritos={favoritos.length}
            totalBloqueados={bloqueados.length}
          />
        </section>

        <aside className="sidebar">
          <Sidebar
            favoritos={favoritos}
            bloqueados={bloqueados}
            onDesbloquear={desbloquearPokemon}
          />
        </aside>
      </main>

      <footer className="app-footer">
        <p>Creado por Luis-Felipe Ramirez Santander</p>
      </footer>
    </div>
  )
}

export default App
