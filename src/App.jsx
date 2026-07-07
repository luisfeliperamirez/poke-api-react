import './App.css'
import PokemonList from './components/PokemonList'
import Sidebar from './components/Sidebar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'
import useFetch from './hooks/useFetch'

function App() {
  const { data, loading, error } = useFetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Explora Pokémon, busca por nombre y revisa estadísticas.</p>
      </header>

      <main className="app-layout">
        <section className="main-content">
          <SearchBar />

          {loading && <p className="status-message">Cargando...</p>}
          {error && (
            <p className="status-message status-error">
              Error al cargar los Pokémon. Intenta de nuevo más tarde.
            </p>
          )}

          {!loading && !error && <PokemonList pokemons={data?.results || []} />}

          <Stats />
        </section>

        <aside className="sidebar">
          <Sidebar />
        </aside>
      </main>

      <footer className="app-footer">
        <p>Creado por Luis-Felipe Ramirez Santander</p>
      </footer>
    </div>
  )
}

export default App
