import './App.css'
import PokemonList from './components/PokemonList'
import Sidebar from './components/Sidebar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Explora Pokémon, busca por nombre y revisa estadísticas.</p>
      </header>

      <main className="app-layout">
        <section className="main-content">
          <SearchBar />
          <PokemonList />
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
