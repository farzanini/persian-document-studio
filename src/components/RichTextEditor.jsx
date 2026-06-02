import { useRef, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignRight,
  AlignCenter,
  AlignLeft,
  AlignJustify,
  Eraser,
} from "lucide-react";

// Sanitizer for external content editors (Microsoft Word / Google Docs)
function cleanPastedHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const body = doc.body;

  const cleanNode = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();

      // Strip Word XML namespaces, metadata scripts and links
      if (
        tagName.includes(":") ||
        tagName === "xml" ||
        tagName === "meta" ||
        tagName === "style" ||
        tagName === "script" ||
        tagName === "link"
      ) {
        node.remove();
        return;
      }

      // Strip styling attributes but retain core semantic tags
      node.removeAttribute("class");
      node.removeAttribute("id");

      // Retain essential text styling: Bold, Italic, Underline, Alignment
      if (node.hasAttribute("style")) {
        const styleAttr = node.getAttribute("style");
        const tempElement = document.createElement("div");
        tempElement.style.cssText = styleAttr;

        const style = tempElement.style;
        const keptStyles = [];

        if (style.textAlign) {
          keptStyles.push(`text-align: ${style.textAlign}`);
        }
        if (style.fontWeight === "bold" || parseInt(style.fontWeight, 10) >= 700) {
          keptStyles.push("font-weight: bold");
        }
        if (style.fontStyle === "italic") {
          keptStyles.push("font-style: italic");
        }
        if (style.textDecoration.includes("underline")) {
          keptStyles.push("text-decoration: underline");
        } else if (style.textDecoration.includes("line-through")) {
          keptStyles.push("text-decoration: line-through");
        }

        if (keptStyles.length > 0) {
          node.setAttribute("style", keptStyles.join("; "));
        } else {
          node.removeAttribute("style");
        }
      }

      // Recursively process children
      const children = Array.from(node.childNodes);
      children.forEach(cleanNode);
    }
  };

  Array.from(body.childNodes).forEach(cleanNode);
  return body.innerHTML;
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    listUnordered: false,
    listOrdered: false,
    alignRight: false,
    alignCenter: false,
    alignLeft: false,
    alignJustify: false,
  });

  // Keep state-to-DOM sync in check without breaking cursor focus
  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateActiveStyles();
    }
  };

  const updateActiveStyles = () => {
    if (!editorRef.current) return;
    setActiveStyles({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      listUnordered: document.queryCommandState("insertUnorderedList"),
      listOrdered: document.queryCommandState("insertOrderedList"),
      alignRight: document.queryCommandState("justifyRight"),
      alignCenter: document.queryCommandState("justifyCenter"),
      alignLeft: document.queryCommandState("justifyLeft"),
      alignJustify: document.queryCommandState("justifyFull"),
    });
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateActiveStyles();
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handlePaste = (e) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    if (html) {
      const cleaned = cleanPastedHtml(html);
      document.execCommand("insertHTML", false, cleaned);
    } else {
      // Escape HTML characters in plain text to prevent injection
      const escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
      document.execCommand("insertHTML", false, escapedText);
    }
    handleInput();
  };

  const execCmd = (command, val = null) => {
    document.execCommand(command, false, val);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const buttons = [
    {
      id: "bold",
      icon: Bold,
      label: "ضخیم (Ctrl+B)",
      command: "bold",
      active: activeStyles.bold,
    },
    {
      id: "italic",
      icon: Italic,
      label: "مورب (Ctrl+I)",
      command: "italic",
      active: activeStyles.italic,
    },
    {
      id: "underline",
      icon: Underline,
      label: "زیرخط (Ctrl+U)",
      command: "underline",
      active: activeStyles.underline,
    },
    { type: "divider" },
    {
      id: "alignRight",
      icon: AlignRight,
      label: "راست‌چین",
      command: "justifyRight",
      active: activeStyles.alignRight,
    },
    {
      id: "alignCenter",
      icon: AlignCenter,
      label: "وسط‌چین",
      command: "justifyCenter",
      active: activeStyles.alignCenter,
    },
    {
      id: "alignLeft",
      icon: AlignLeft,
      label: "چپ‌چین",
      command: "justifyLeft",
      active: activeStyles.alignLeft,
    },
    {
      id: "alignJustify",
      icon: AlignJustify,
      label: "تراز کامل",
      command: "justifyFull",
      active: activeStyles.alignJustify,
    },
    { type: "divider" },
    {
      id: "listUnordered",
      icon: List,
      label: "لیست نشانه‌دار",
      command: "insertUnorderedList",
      active: activeStyles.listUnordered,
    },
    {
      id: "listOrdered",
      icon: ListOrdered,
      label: "لیست عددی",
      command: "insertOrderedList",
      active: activeStyles.listOrdered,
    },
    { type: "divider" },
    {
      id: "clear",
      icon: Eraser,
      label: "پاک کردن قالب‌بندی",
      command: "removeFormat",
      active: false,
    },
  ];

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800/80">
        {buttons.map((btn, idx) => {
          if (btn.type === "divider") {
            return (
              <div
                key={`div-${idx}`}
                className="w-[1px] h-4 bg-slate-800/80 mx-1"
              />
            );
          }
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevents losing text selection focus
                execCmd(btn.command);
              }}
              className={`p-1.5 rounded-lg cursor-pointer transition-all hover:bg-slate-800 hover:text-white ${
                btn.active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-400"
              }`}
              title={btn.label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>

      {/* contentEditable Input Field */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyUp={updateActiveStyles}
        onMouseUp={updateActiveStyles}
        className="rich-editor document-content w-full p-4 text-xs leading-loose min-h-[250px] max-h-[420px] overflow-y-auto outline-none text-slate-200"
        style={{
          direction: "rtl",
          textAlign: "right",
        }}
        data-placeholder={placeholder || "محتوای قرارداد..."}
      />
    </div>
  );
}
