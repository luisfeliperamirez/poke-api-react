function Stats({ totalPokemon = 0, totalFavoritos = 0, totalBloqueados = 0 }) {
  return (
    <section className="stats-panel">
      <h2>Estadísticas</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{totalPokemon}</span>
          <span className="stat-label">Total Pokémon</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalFavoritos}</span>
          <span className="stat-label">Favoritos</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalBloqueados}</span>
          <span className="stat-label">Bloqueados</span>
        </div>
      </div>
    </section>
  )
}

export default Stats
