function StatusBar({ totalFiles, selectedPath }) {
  return (
    <footer className="col-span-full flex items-center justify-between border-t border-border-subtle bg-footer-bg px-3 py-1.5 text-[11px] text-text-muted">
      <span>{totalFiles} files indexed</span>
      {/* Full selected path helps users keep context in deep trees. */}
      <span className="font-['JetBrains_Mono',monospace]">
        {selectedPath?.length
          ? selectedPath.map((item) => item.name).join(' / ')
          : 'No file selected'}
      </span>
    </footer>
  )
}

export default StatusBar
