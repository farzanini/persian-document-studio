export function paginateHtml(htmlString, config) {
  const {
    fontSize,
    lineHeight,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
  } = config;

  const width = 794 - marginRight - marginLeft;
  const pageHeight = 1120 - marginTop - marginBottom;

  // Create offscreen measuring frame to evaluate browser-rendered text height
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = "794px";
  tempDiv.style.pointerEvents = "none";
  tempDiv.style.fontFamily = "'Vazirmatn', sans-serif";
  tempDiv.style.direction = "rtl";
  tempDiv.style.textAlign = "right";
  tempDiv.style.letterSpacing = "normal";
  document.body.appendChild(tempDiv);

  // Parse target HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString || "", "text/html");
  const root = doc.body;

  const nodesToProcess = Array.from(root.childNodes).map((n) => n.cloneNode(true));
  const pages = [];

  // Helper to build a clean text page container matching preview sizes
  const createPageContainer = () => {
    const pContainer = document.createElement("div");
    pContainer.className = "document-content";
    pContainer.style.width = `${width}px`;
    pContainer.style.fontSize = `${fontSize}px`;
    pContainer.style.lineHeight = `${lineHeight}`;
    pContainer.style.fontFamily = "'Vazirmatn', sans-serif";
    pContainer.style.direction = "rtl";
    pContainer.style.textAlign = "right";
    pContainer.style.wordBreak = "break-word";
    pContainer.style.margin = "0";
    pContainer.style.padding = "0";
    return pContainer;
  };

  let currentPageContainer = createPageContainer();
  tempDiv.appendChild(currentPageContainer);

  const fitAndSplitNode = (node, targetContainer, maxHeight) => {
    // 1. Text Nodes: Split word by word if heights overflow
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      if (!text.trim()) {
        const clone = node.cloneNode(true);
        targetContainer.appendChild(clone);
        return null;
      }

      const words = text.split(/(\s+)/);
      const clone = document.createTextNode("");
      targetContainer.appendChild(clone);

      let lastValidText = "";
      for (let i = 0; i < words.length; i++) {
        clone.nodeValue = lastValidText + words[i];

        const height = currentPageContainer.offsetHeight;
        if (height > maxHeight) {
          // If this is the absolute first element/word on a blank page, force it to prevent loop
          const isAbsoluteFirst =
            currentPageContainer.childNodes.length === 1 &&
            clone.nodeValue.trim() === words[0].trim();

          if (isAbsoluteFirst) {
            lastValidText = clone.nodeValue;
            continue;
          }

          clone.nodeValue = lastValidText;
          const remainingText = words.slice(i).join("");
          return remainingText ? document.createTextNode(remainingText) : null;
        }
        lastValidText = clone.nodeValue;
      }
      return null;
    }

    // 2. Element Nodes: Handle block layout nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const noSplitTags = ["img", "br", "hr", "tr", "td"];

      if (noSplitTags.includes(tagName)) {
        const clone = node.cloneNode(true);
        targetContainer.appendChild(clone);
        const height = currentPageContainer.offsetHeight;
        if (height > maxHeight) {
          // Check if this is the only node on a blank page, if so force it to stay
          if (
            currentPageContainer.childNodes.length === 1 ||
            (targetContainer !== currentPageContainer && targetContainer.childNodes.length === 1)
          ) {
            return null; // Force fit
          }
          targetContainer.removeChild(clone);
          return node.cloneNode(true);
        }
        return null;
      }

      // Handle Ordered Lists OL: preserve numbering order when split
      if (tagName === "ol") {
        const originalStart = parseInt(node.getAttribute("start"), 10) || 1;
        const elementClone = node.cloneNode(false);
        targetContainer.appendChild(elementClone);

        const children = Array.from(node.childNodes);
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const remainingChild = fitAndSplitNode(child, elementClone, maxHeight);

          if (remainingChild !== null) {
            const remainderContainer = node.cloneNode(false);
            remainderContainer.appendChild(remainingChild);
            for (let j = i + 1; j < children.length; j++) {
              remainderContainer.appendChild(children[j].cloneNode(true));
            }

            // Sync start attribute on split lists
            const liCount = Array.from(elementClone.childNodes).filter(
              (n) => n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() === "li"
            ).length;
            remainderContainer.setAttribute("start", originalStart + liCount);

            if (elementClone.childNodes.length === 0) {
              targetContainer.removeChild(elementClone);
            }
            return remainderContainer;
          }
        }
        return null;
      }

      // Generic block/inline elements (P, UL, DIV, etc.)
      const elementClone = node.cloneNode(false);
      targetContainer.appendChild(elementClone);

      const children = Array.from(node.childNodes);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const remainingChild = fitAndSplitNode(child, elementClone, maxHeight);

        if (remainingChild !== null) {
          const remainderContainer = node.cloneNode(false);
          remainderContainer.appendChild(remainingChild);
          for (let j = i + 1; j < children.length; j++) {
            remainderContainer.appendChild(children[j].cloneNode(true));
          }

          if (elementClone.childNodes.length === 0) {
            targetContainer.removeChild(elementClone);
          }
          return remainderContainer;
        }
      }
      return null;
    }

    // Comment nodes or other structures
    const clone = node.cloneNode(true);
    targetContainer.appendChild(clone);
    return null;
  };

  let nodeIndex = 0;
  while (nodeIndex < nodesToProcess.length) {
    const node = nodesToProcess[nodeIndex];
    const remainingNode = fitAndSplitNode(node, currentPageContainer, pageHeight);

    if (remainingNode !== null) {
      pages.push(currentPageContainer.innerHTML);

      tempDiv.removeChild(currentPageContainer);
      currentPageContainer = createPageContainer();
      tempDiv.appendChild(currentPageContainer);

      nodesToProcess[nodeIndex] = remainingNode;
    } else {
      nodeIndex++;
    }
  }

  if (currentPageContainer.childNodes.length > 0) {
    pages.push(currentPageContainer.innerHTML);
  }

  document.body.removeChild(tempDiv);
  return pages;
}
