export function getExtension(name) {
  const index = name.lastIndexOf('.')
  return index === -1 ? 'unknown' : name.slice(index + 1).toLowerCase()
}

export function buildLookupMaps(nodes, parents = [], maps = {}) {
  if (!maps.byId) {
    // Precompute quick lookups once so render-time operations stay fast.
    maps.byId = new Map()
    maps.pathById = new Map()
    maps.parentById = new Map()
  }

  for (const node of nodes) {
    const path = [...parents, node]
    maps.byId.set(node.id, node)
    maps.pathById.set(node.id, path)
    maps.parentById.set(node.id, parents.length ? parents[parents.length - 1].id : null)
    if (node.type === 'folder' && node.children?.length) {
      buildLookupMaps(node.children, path, maps)
    }
  }
  return maps
}

export function filterTree(nodes, query, ancestorIds = []) {
  const normalizedQuery = query.toLowerCase()
  const autoExpanded = new Set()

  const filtered = nodes
    .map((node) => {
      const matchesSelf = node.name.toLowerCase().includes(normalizedQuery)
      if (node.type === 'file') {
        return matchesSelf ? node : null
      }

      const childResult = filterTree(node.children || [], query, [...ancestorIds, node.id])
      childResult.autoExpanded.forEach((id) => autoExpanded.add(id))

      if (childResult.filtered.length > 0) {
        // Keep parents visible when any descendant matches the search.
        autoExpanded.add(node.id)
        return {
          ...node,
          children: childResult.filtered,
        }
      }

      if (matchesSelf) {
        ancestorIds.forEach((id) => autoExpanded.add(id))
        return {
          ...node,
          children: node.children || [],
        }
      }

      return null
    })
    .filter(Boolean)

  return { filtered, autoExpanded }
}

export function flattenVisibleNodes(nodes, expandedIds, bucket = []) {
  // Build keyboard navigation order from only visible rows.
  for (const node of nodes) {
    bucket.push(node)
    if (node.type === 'folder' && expandedIds.has(node.id) && node.children?.length) {
      flattenVisibleNodes(node.children, expandedIds, bucket)
    }
  }
  return bucket
}
