import FileTree from './FileTree'

function SidebarPanel({
  nodes,
  expandedIds,
  selectedId,
  focusedId,
  searchQuery,
  onNodeClick,
  onNodeFocus,
}) {
  return (
    <aside className="flex min-w-0 flex-col border-r border-border-subtle bg-panel-bg">
      <div className="overflow-auto py-2 outline-none">
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
