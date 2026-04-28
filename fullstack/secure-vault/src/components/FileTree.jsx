import TreeNode from './TreeNode'

function FileTree(props) {
  const { nodes } = props

  if (!nodes.length) {
    // Shown when search returns no matches.
    return <p className="ds-compact-text m-0 p-4">No matching files or folders.</p>
  }

  return (
    <ul className="m-0 list-none p-0">
      {nodes.map((node) => (
        // Depth starts at 0 for root-level rows.
        <TreeNode key={node.id} node={node} depth={0} {...props} />
      ))}
    </ul>
  )
}

export default FileTree
