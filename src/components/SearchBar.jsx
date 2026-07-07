function SearchBar() {
  return (
    <div className="search-bar">
      <label htmlFor="pokemon-search">Buscar Pokémon</label>
      <input id="pokemon-search" type="search" placeholder="Escribe un nombre o número" />
    </div>
  )
}

export default SearchBar
