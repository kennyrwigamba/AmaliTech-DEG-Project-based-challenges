import FileTree from './FileTree'

function SidebarPanel({
  nodes,
  expandedIds,
  selectedId,
  focusedId,
  searchQuery,
  onNodeClick,
  onNodeFocus,
  onKeyDown,
}) {
  return (
    <aside className="flex min-w-0 flex-col border-r border-border-subtle bg-panel-bg">
      {/* Keep keyboard events on the scroll container so arrows work while browsing. */}
      <div className="overflow-auto py-2 outline-none" onKeyDown={onKeyDown} tabIndex={0}>
        <FileTree
          nodes={nodes}
          expandedIds={expandedIds}
          selectedId={selectedId}
          focusedId={focusedId}
          searchQuery={searchQuery}
          onNodeClick={onNodeClick}
          onNodeFocus={onNodeFocus}
        />
      </div>
    </aside>
  )
}

export default SidebarPanel
