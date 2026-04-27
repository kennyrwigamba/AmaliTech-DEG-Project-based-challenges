import Breadcrumb from './Breadcrumb'

function MainPanel({ activePath, selectedFile, onCrumbClick }) {
  return (
    <main className="flex flex-col bg-app-bg">
      {/* Mirrors current focus/selection path from the tree. */}
      <Breadcrumb
        path={activePath}
        onCrumbClick={onCrumbClick}
        className="border-b border-border-subtle px-6 py-2.5"
      />
      <div className="flex flex-col gap-4 p-6">
        {selectedFile ? (
          <>
            <h2 className="m-0 text-[20px] text-text-main">Preview</h2>
            <p className="font-['JetBrains_Mono',monospace] text-sm text-text-link">
              {selectedFile.name}
            </p>
            <p className="max-w-140 leading-[1.6] text-text-muted">
              Secure preview is unavailable in demo mode. Select a different file in the explorer.
            </p>
          </>
        ) : (
          <>
            {/* Friendly empty state before a file is selected. */}
            <h2 className="m-0 text-[20px] text-text-main">SecureVault Explorer</h2>
            <p className="max-w-140 leading-[1.6] text-text-muted">
              Select a file from the tree to view metadata in the properties panel.
            </p>
          </>
        )}
      </div>
    </main>
  )
}

export default MainPanel
