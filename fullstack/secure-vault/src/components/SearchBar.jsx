function SearchBar({ value, onChange, className = '' }) {
  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <div className="relative">
        {/* Leading icon stays visible to anchor the input visually. */}
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-muted">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 3.47 9.77l2.63 2.63a.75.75 0 1 0 1.06-1.06l-2.63-2.63A5.5 5.5 0 0 0 9 3.5Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <input
          className="min-w-0 w-full rounded-md border border-border-subtle bg-app-bg py-2 pl-9 pr-10 text-[13px] text-text-main outline-none focus:outline-1 focus:outline-accent-focus"
          type="text"
          placeholder="Search files and folders..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        <span className="absolute inset-y-0 right-2 flex items-center">
          {value ? (
            // Reuses the right slot when there is text, so Clear stays in-place.
            <button
              type="button"
              className="rounded px-1.5 py-0.5 text-[11px] text-text-muted hover:bg-border-subtle hover:text-text-soft"
              onClick={() => onChange('')}
            >
              Clear
            </button>
          ) : (
            <span className="text-text-muted" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M3.25 5A.75.75 0 0 1 4 4.25h12a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 5Zm3 5A.75.75 0 0 1 7 9.25h9a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 6.25 10Zm4 5a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" />
              </svg>
            </span>
          )}
        </span>
      </div>
    </div>
  )
}

export default SearchBar
