function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="pokemon-search">Buscar Pokémon</label>
      <input
        id="pokemon-search"
        type="search"
        placeholder="Escribe un nombre"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar
