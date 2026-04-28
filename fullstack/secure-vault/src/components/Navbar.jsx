import SearchBar from './SearchBar'

function Navbar({ searchQuery, onSearchChange }) {
  return (
    <header className="ds-shell-padding grid grid-cols-[1fr_minmax(320px,520px)_1fr] items-center gap-4 border-b border-border-subtle bg-panel-bg">
      <h2 className="ds-app-title m-0">SecureVault Explorer</h2>
      {/* Search lives in the center column to match file explorer conventions. */}
      <SearchBar className="border-b-0 p-0" value={searchQuery} onChange={onSearchChange} />
      <div className="min-h-px" />
    </header>
  )
}

export default Navbar
