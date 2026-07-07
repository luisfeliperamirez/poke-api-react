function getPokemonId(url) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/)
  return match ? match[1] : null
}

function Sidebar({ favoritos = [] }) {
  return (
    <section className="sidebar-panel">
      <h2>Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes Pokémon favoritos.</p>
      ) : (
        <ul className="favorites-list">
          {favoritos.map((pokemon) => {
            const id = getPokemonId(pokemon.url)
            const thumb = id
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
              : ''

            return (
              <li key={pokemon.name} className="favorite-item">
                <div className="favorite-thumb">
                  {thumb ? (
                    <img src={thumb} alt={pokemon.name} />
                  ) : (
                    <span>?</span>
                  )}
                </div>
                <div>
                  <strong>{pokemon.name}</strong>
                  <span>#{id}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Sidebar
