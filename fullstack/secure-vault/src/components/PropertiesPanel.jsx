function PropertiesPanel({ file, extension }) {
  return (
    <aside className="border-l border-border-subtle bg-panel-bg p-4">
      <h3 className="mb-4 mt-0 text-base">Properties</h3>
      {file ? (
        // Compact metadata cards for the actively selected file.
        <dl className="m-0">
          <div className="mb-3 rounded-md border border-border-subtle p-2">
            <dt className="mb-1 text-xs text-text-muted">Name</dt>
            <dd className="m-0 truncate font-['JetBrains_Mono',monospace] text-xs text-text-main">{file.name}</dd>
          </div>
          <div className="mb-3 rounded-md border border-border-subtle p-2">
            <dt className="mb-1 text-xs text-text-muted">Type</dt>
            <dd className="m-0 font-['JetBrains_Mono',monospace] text-xs text-text-main">{extension}</dd>
          </div>
          <div className="mb-3 rounded-md border border-border-subtle p-2">
            <dt className="mb-1 text-xs text-text-muted">Size</dt>
            <dd className="m-0 font-['JetBrains_Mono',monospace] text-xs text-text-main">
              {file.size || 'Unknown'}
            </dd>
          </div>
        </dl>
      ) : (
        // Empty state keeps the right panel informative instead of blank.
        <p className="text-[13px] text-text-muted">Select a file to view its metadata.</p>
      )}
    </aside>
  )
}

export default PropertiesPanel
