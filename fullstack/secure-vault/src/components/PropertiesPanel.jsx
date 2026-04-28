function PropertiesPanel({ file, extension }) {
  return (
    <aside className="ds-panel-padding border-l border-border-subtle bg-panel-bg">
      <h3 className="ds-panel-title mb-4 mt-0">Properties</h3>
      {file ? (
        // Compact metadata cards for the actively selected file.
        <dl className="m-0 flex flex-col gap-3">
          <div className="rounded-md border border-border-subtle p-3">
            <dt className="ds-caption mb-1">Name</dt>
            <dd className="ds-mono m-0 truncate text-text-main">{file.name}</dd>
          </div>
          <div className="rounded-md border border-border-subtle p-3">
            <dt className="ds-caption mb-1">Extension</dt>
            <dd className="ds-mono m-0 text-text-main">
              {extension === 'unknown' ? '—' : extension}
            </dd>
          </div>
          <div className="rounded-md border border-border-subtle p-3">
            <dt className="ds-caption mb-1">Size</dt>
            <dd className="ds-mono m-0 text-text-main">
              {file.size || 'Unknown'}
            </dd>
          </div>
        </dl>
      ) : (
        // Empty state keeps the right panel informative instead of blank.
        <p className="ds-compact-text m-0">Select a file to view its metadata.</p>
      )}
    </aside>
  )
}

export default PropertiesPanel
