function Breadcrumb({ path, onCrumbClick, className = '' }) {
  if (!path?.length) {
    return (
      <div
        className={`ds-mono overflow-hidden text-ellipsis whitespace-nowrap text-text-muted ${className}`.trim()}
      >
        Root
      </div>
    )
  }

  return (
    <div
      className={`ds-mono truncate text-text-muted ${className}`.trim()}
    >
      {path.map((node, index) => (
        <span key={node.id}>
          {/* Breadcrumb links let users jump directly to any ancestor node. */}
          <button
            type="button"
            className="ds-focus-ring cursor-pointer rounded-sm border-none bg-transparent p-0 font-inherit text-text-link hover:text-text-link-hover"
            onClick={() => onCrumbClick(node)}
          >
            {node.name}
          </button>
          {index < path.length - 1 ? <span className="px-2">›</span> : null}
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb
