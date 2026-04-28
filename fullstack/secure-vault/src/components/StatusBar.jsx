function StatusBar({ totalFiles, selectedPath }) {
  return (
    <footer className="ds-shell-padding col-span-full flex items-center justify-between border-t border-border-subtle bg-panel-bg py-2 text-xs text-text-muted">
      <span className="leading-4">{totalFiles} files indexed</span>
      {/* Full selected path helps users keep context in deep trees. */}
      <span className="ds-mono leading-4 text-text-muted">
        {selectedPath?.length
          ? selectedPath.map((item) => item.name).join(' / ')
          : 'No file selected'}
      </span>
    </footer>
  )
}

export default StatusBar
