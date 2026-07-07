function getPokemonId(url) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/)
  return match ? match[1] : null
}

function PokemonList({ pokemons, favoritos = [], onToggleFavorito }) {
  return (
    <section className="pokemon-list">
      <h2>Pokémon</h2>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => {
          const id = getPokemonId(pokemon.url)
          const imageUrl = id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            : ''
          const isFavorito = favoritos.some((item) => item.name === pokemon.name)

          return (
            <article key={pokemon.name} className="pokemon-card">
              <div className="pokemon-card__image">
                {imageUrl ? (
                  <img src={imageUrl} alt={pokemon.name} />
                ) : (
                  <div className="pokemon-card__placeholder">No image</div>
                )}
              </div>
              <div className="pokemon-card__body">
                <span className="pokemon-card__id">#{id}</span>
                <h3>{pokemon.name}</h3>
                <button
                  type="button"
                  className={`pokemon-card__favorite ${isFavorito ? 'active' : ''}`}
                  onClick={() => onToggleFavorito(pokemon)}
                >
                  {isFavorito ? 'Quitar favorito' : 'Agregar favorito'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default PokemonList
