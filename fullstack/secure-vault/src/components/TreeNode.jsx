import dockerIcon from "../assets/icons/material/docker.svg";
import documentIcon from "../assets/icons/material/document.svg";
import folderArchiveIcon from "../assets/icons/material/folder-archive.svg";
import folderArchiveOpenIcon from "../assets/icons/material/folder-archive-open.svg";
import folderLogIcon from "../assets/icons/material/folder-log.svg";
import folderLogOpenIcon from "../assets/icons/material/folder-log-open.svg";
import folderResourceIcon from "../assets/icons/material/folder-resource.svg";
import folderResourceOpenIcon from "../assets/icons/material/folder-resource-open.svg";
import folderSecureIcon from "../assets/icons/material/folder-secure.svg";
import folderSecureOpenIcon from "../assets/icons/material/folder-secure-open.svg";
import folderSrcIcon from "../assets/icons/material/folder-src.svg";
import folderSrcOpenIcon from "../assets/icons/material/folder-src-open.svg";
import fontIcon from "../assets/icons/material/font.svg";
import gitIcon from "../assets/icons/material/git.svg";
import imageIcon from "../assets/icons/material/image.svg";
import logIcon from "../assets/icons/material/log.svg";
import pdfIcon from "../assets/icons/material/pdf.svg";
import tableIcon from "../assets/icons/material/table.svg";
import svgIcon from "../assets/icons/material/svg.svg";
import wordIcon from "../assets/icons/material/word.svg";
import yamlIcon from "../assets/icons/material/yaml.svg";

function getExtension(name) {
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
}

function getFileIcon(name) {
  const lowerName = name.toLowerCase();
  const extension = getExtension(name);

  // Prefer exact/special filename matches before generic extension rules.
  if (lowerName === ".gitignore") return gitIcon;
  if (extension === "pdf") return pdfIcon;
  if (
    extension === "doc" ||
    extension === "docx" ||
    extension === "rtf" ||
    extension === "odt"
  ) {
    return wordIcon;
  }
  if (["xlsx", "xlsm", "xls", "csv", "tsv", "psv", "ods"].includes(extension))
    return tableIcon;
  if (extension === "yaml" || extension === "yml") {
    return lowerName.includes("docker") || lowerName.includes("compose")
      ? dockerIcon
      : yamlIcon;
  }
  if (["png", "jpeg", "jpg", "gif", "ico", "bmp", "webp"].includes(extension))
    return imageIcon;
  if (extension === "svg") return svgIcon;
  if (["ttf", "otf", "woff", "woff2", "eot"].includes(extension))
    return fontIcon;
  if (extension === "txt")
    return lowerName.includes("log") ? logIcon : documentIcon;
  if (extension === "log") return logIcon;
  return documentIcon;
}

function getFolderIcon(name, isExpanded) {
  const normalized = name.toLowerCase();

  // Give business-specific folders a clearer visual identity.
  if (normalized.includes("security")) {
    return isExpanded ? folderSecureOpenIcon : folderSecureIcon;
  }
  if (normalized.includes("archive")) {
    return isExpanded ? folderArchiveOpenIcon : folderArchiveIcon;
  }
  if (normalized.includes("log")) {
    return isExpanded ? folderLogOpenIcon : folderLogIcon;
  }
  if (normalized.includes("resource") || normalized.includes("asset")) {
    return isExpanded ? folderResourceOpenIcon : folderResourceIcon;
  }
  return isExpanded ? folderSrcOpenIcon : folderSrcIcon;
}

function highlightMatch(text, query) {
  if (!query.trim()) return text;
  // Escape user input before building a regex to avoid invalid patterns.
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "i");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-xs bg-highlight-bg px-px text-text-selected"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function TreeNode({
  node,
  depth,
  expandedIds,
  selectedId,
  focusedId,
  searchQuery,
  onNodeClick,
  onNodeFocus,
}) {
  const isFolder = node.type === "folder";
  const isExpanded = isFolder && expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const isFocused = focusedId === node.id;
  const stateClasses = [
    isSelected ? "bg-selected-bg text-text-selected" : "",
    isFocused ? "shadow-[inset_2px_0_0_var(--color-accent-focus)]" : "",
  ]
    .join(" ")
    .trim();
  const chevronClasses = `h-3 w-3 shrink-0 text-text-muted transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`;

  return (
    <li>
      <button
        type="button"
        className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-2 py-2 text-left font-['JetBrains_Mono',monospace] text-xs text-text-soft hover:bg-tree-hover ${stateClasses}`.trim()}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={() => onNodeClick(node)}
        onFocus={() => onNodeFocus(node)}
      >
        <span className="flex w-3 items-center justify-center">
          {isFolder ? (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className={chevronClasses}
            >
              <path
                fillRule="evenodd"
                d="M7.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          ) : null}
        </span>
        <img
          src={
            isFolder
              ? getFolderIcon(node.name, isExpanded)
              : getFileIcon(node.name)
          }
          alt=""
          className="h-4 w-4 shrink-0"
          aria-hidden="true"
        />
        <span className="truncate">
          {highlightMatch(node.name, searchQuery)}
        </span>
      </button>

      {isFolder && isExpanded && node.children?.length ? (
        <ul className="m-0 list-none p-0">
          {/* Recursive step: the same TreeNode renders each child node at the next depth. */}
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              focusedId={focusedId}
              searchQuery={searchQuery}
              onNodeClick={onNodeClick}
              onNodeFocus={onNodeFocus}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default TreeNode;
