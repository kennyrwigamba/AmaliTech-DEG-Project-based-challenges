import Breadcrumb from './Breadcrumb'

function MainPanel({ activePath, selectedFile, onCrumbClick }) {
  return (
    <main className="flex flex-col bg-app-bg">
      {/* Mirrors current focus/selection path from the tree. */}
      <Breadcrumb
        path={activePath}
        onCrumbClick={onCrumbClick}
        className="ds-shell-padding border-b border-border-subtle py-3"
      />
      <div className="ds-content-padding flex flex-col gap-4">
        {selectedFile ? (
          <>
            <h1 className="ds-page-title m-0">Preview</h1>
            <p className="ds-mono m-0 text-text-link">
              {selectedFile.name}
            </p>
            <p className="ds-body-copy m-0 max-w-[560px]">
              Secure preview is unavailable in demo mode. Select a different file in the explorer.
            </p>
          </>
        ) : (
          <>
            {/* Friendly empty state before a file is selected. */}
            <h2 className="ds-page-title m-0">SecureVault Explorer</h2>
            <p className="ds-body-copy m-0 max-w-[560px]">
              Select a file from the tree to view metadata in the properties panel.
            </p>
          </>
        )}
      </div>
    </main>
  )
}

export default MainPanel
