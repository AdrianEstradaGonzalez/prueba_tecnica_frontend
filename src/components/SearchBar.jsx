/**
 * Campo de búsqueda controlado. Avisa en cada pulsación para filtrar en tiempo real.
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search" className="visually-hidden">
        Buscar por marca o modelo
      </label>
      <svg className="search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="search"
        type="search"
        placeholder="Buscar por marca o modelo"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
