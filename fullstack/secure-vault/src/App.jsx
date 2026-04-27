import { useMemo, useReducer } from 'react'
import MainPanel from './components/MainPanel'
import Navbar from './components/Navbar'
import PropertiesPanel from './components/PropertiesPanel'
import SidebarPanel from './components/SidebarPanel'
import StatusBar from './components/StatusBar'
import fileSystemData from './data/data.json'
import { buildLookupMaps, filterTree, flattenVisibleNodes, getExtension } from './utils/treeUtils'

const initialState = {
  expandedIds: new Set(),
  selectedId: null,
  focusedId: null,
  searchQuery: '',
}

function appReducer(state, action) {
  switch (action.type) {
    case 'toggle_expand': {
      const nextExpanded = new Set(state.expandedIds)
      if (nextExpanded.has(action.id)) {
        nextExpanded.delete(action.id)
      } else {
        nextExpanded.add(action.id)
      }
      return { ...state, expandedIds: nextExpanded }
    }
    case 'expand_node': {
      const nextExpanded = new Set(state.expandedIds)
      nextExpanded.add(action.id)
      return { ...state, expandedIds: nextExpanded }
    }
    case 'collapse_node': {
      const nextExpanded = new Set(state.expandedIds)
      nextExpanded.delete(action.id)
      return { ...state, expandedIds: nextExpanded }
    }
    case 'set_selected':
      return { ...state, selectedId: action.id }
    case 'set_focused':
      return { ...state, focusedId: action.id }
    case 'set_search':
      return { ...state, searchQuery: action.value }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const maps = useMemo(() => buildLookupMaps(fileSystemData), [])
  const treeView = useMemo(() => {
    if (!state.searchQuery.trim()) {
      return {
        data: fileSystemData,
        autoExpandedIds: new Set(),
      }
    }
    const result = filterTree(fileSystemData, state.searchQuery.trim())
    return {
      data: result.filtered,
      autoExpandedIds: result.autoExpanded,
    }
  }, [state.searchQuery])

  const effectiveExpandedIds = useMemo(() => {
    // Merge manual expand/collapse with auto-expanded matches during search.
    const merged = new Set(state.expandedIds)
    treeView.autoExpandedIds.forEach((id) => merged.add(id))
    return merged
  }, [state.expandedIds, treeView.autoExpandedIds])

  const visibleNodes = useMemo(
    () => flattenVisibleNodes(treeView.data, effectiveExpandedIds),
    [treeView.data, effectiveExpandedIds],
  )
  const visibleIds = visibleNodes.map((node) => node.id)
  const activeId = state.selectedId || state.focusedId
  const activePath = activeId ? maps.pathById.get(activeId) || [] : []
  const selectedNode = state.selectedId ? maps.byId.get(state.selectedId) : null
  const selectedFile = selectedNode?.type === 'file' ? selectedNode : null
  const selectedFileExt = selectedFile ? getExtension(selectedFile.name) : null

  const totalFiles = useMemo(() => {
    let count = 0
    for (const node of maps.byId.values()) {
      if (node.type === 'file') count += 1
    }
    return count
  }, [maps.byId])

  function expandPathToNode(id) {
    // Opening ancestor folders guarantees the target is visible/focusable.
    const path = maps.pathById.get(id) || []
    path.slice(0, -1).forEach((node) => {
      if (node.type === 'folder') {
        dispatch({ type: 'expand_node', id: node.id })
      }
    })
  }

  function handleNodeClick(node) {
    dispatch({ type: 'set_focused', id: node.id })
    expandPathToNode(node.id)
    if (node.type === 'folder') {
      dispatch({ type: 'toggle_expand', id: node.id })
      return
    }
    dispatch({ type: 'set_selected', id: node.id })
  }

  function handleNodeFocus(node) {
    dispatch({ type: 'set_focused', id: node.id })
  }

  function handleBreadcrumbClick(node) {
    dispatch({ type: 'set_focused', id: node.id })
    expandPathToNode(node.id)
    if (node.type === 'folder') {
      dispatch({ type: 'expand_node', id: node.id })
      dispatch({ type: 'set_selected', id: null })
      return
    }
    dispatch({ type: 'set_selected', id: node.id })
  }

  function handleKeyDown(event) {
    if (!visibleIds.length) return

    const focusedId = state.focusedId ?? visibleIds[0]
    const focusedIndex = Math.max(visibleIds.indexOf(focusedId), 0)
    const focusedNode = maps.byId.get(visibleIds[focusedIndex])
    if (!focusedNode) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = Math.min(focusedIndex + 1, visibleIds.length - 1)
      dispatch({ type: 'set_focused', id: visibleIds[nextIndex] })
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = Math.max(focusedIndex - 1, 0)
      dispatch({ type: 'set_focused', id: visibleIds[nextIndex] })
      return
    }

    if (event.key === 'ArrowRight') {
      if (focusedNode.type !== 'folder') return
      event.preventDefault()
      dispatch({ type: 'expand_node', id: focusedNode.id })
      return
    }

    if (event.key === 'ArrowLeft') {
      if (focusedNode.type === 'folder' && effectiveExpandedIds.has(focusedNode.id)) {
        event.preventDefault()
        dispatch({ type: 'collapse_node', id: focusedNode.id })
        return
      }
      const parentId = maps.parentById.get(focusedNode.id)
      if (parentId) {
        event.preventDefault()
        dispatch({ type: 'set_focused', id: parentId })
      }
      return
    }

    if (event.key === 'Enter' && focusedNode.type === 'file') {
      event.preventDefault()
      dispatch({ type: 'set_selected', id: focusedNode.id })
    }
  }

  return (
    <div className="grid h-screen grid-rows-[52px_1fr]">
      <Navbar
        searchQuery={state.searchQuery}
        onSearchChange={(value) => dispatch({ type: 'set_search', value })}
      />

      <div className="grid h-full grid-cols-[280px_1fr_240px] grid-rows-[1fr_30px] bg-app-bg text-text-main">
        <SidebarPanel
          nodes={treeView.data}
          expandedIds={effectiveExpandedIds}
          selectedId={state.selectedId}
          focusedId={state.focusedId}
          searchQuery={state.searchQuery}
          onNodeClick={handleNodeClick}
          onNodeFocus={handleNodeFocus}
          onKeyDown={handleKeyDown}
        />

        <MainPanel
          activePath={activePath}
          selectedFile={selectedFile}
          onCrumbClick={handleBreadcrumbClick}
        />

        <PropertiesPanel file={selectedFile} extension={selectedFileExt} />
        <StatusBar
          totalFiles={totalFiles}
          selectedPath={selectedFile ? maps.pathById.get(selectedFile.id) : null}
        />
      </div>
    </div>
  )
}

export default App
