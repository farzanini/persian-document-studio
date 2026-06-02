import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DocumentPreview from "./components/DocumentPreview";
import { templates } from "./constants/templates";
import { getCachedAsset, setCachedAsset, removeCachedAsset } from "./utils/db";

export default function App() {
  const [dragMode, setDragMode] = useState(true);
  const [zoom, setZoom] = useState(60);
  const [activeTab, setActiveTab] = useState("text");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Custom uploaded backgrounds / templates
  const [customCoverBg, setCustomCoverBg] = useState(null);
  const [customSarbargBg, setCustomSarbargBg] = useState(null);
  const [partnerLogo, setPartnerLogo] = useState(null);

  // Load cached templates/logo from IndexedDB on startup
  useEffect(() => {
    async function loadCachedFiles() {
      const cover = await getCachedAsset("customCoverBg");
      const sarbarg = await getCachedAsset("customSarbargBg");
      const logo = await getCachedAsset("partnerLogo");
      if (cover) setCustomCoverBg(cover);
      if (sarbarg) setCustomSarbargBg(sarbarg);
      if (logo) setPartnerLogo(logo);
    }
    loadCachedFiles();
  }, []);

  // Content Variables
  const [coverTitle, setCoverTitle] = useState(
    "تفاهم‌نامه همکاری و هم‌افزایی فناورانه",
  );
  const [coverDate, setCoverDate] = useState("۱۱ خرداد ماه ۱۴۰۵");

  // Draggable Coordinate States
  const [posCoverTitle, setPosCoverTitle] = useState({
    x: 168,
    y: 395,
    w: 458,
    h: 175,
  });
  const [posPartnerLogo, setPosPartnerLogo] = useState({
    x: 195,
    y: 590,
    size: 120,
  });
  const [posCoverDate, setPosCoverDate] = useState({ x: 0, y: 995 });

  const [posSarbargTitle, setPosSarbargTitle] = useState({ x: 260, y: 25 });
  const [bodyText, setBodyText] = useState(templates.longContract);

  // Metadata items
  const [metaDate, setMetaDate] = useState("۱۴۰۵/۰۳/۱۱");
  const [metaNumber, setMetaNumber] = useState("NT-405-102");
  const [metaAttachment, setMetaAttachment] = useState("دارد (یک برگ)");

  // Typography Settings
  const [fontSize, setFontSize] = useState(14.5);
  const [lineHeight, setLineHeight] = useState(2.1);
  const [marginTop, setMarginTop] = useState(190);
  const [marginBottom, setMarginBottom] = useState(150);
  const [marginRight, setMarginRight] = useState(100);
  const [marginLeft, setMarginLeft] = useState(85);

  const pdfContainerRef = useRef(null);


  const handleCoverBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const val = ev.target.result;
        setCustomCoverBg(val);
        setCachedAsset("customCoverBg", val);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSarbargBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const val = ev.target.result;
        setCustomSarbargBg(val);
        setCachedAsset("customSarbargBg", val);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePartnerLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const val = ev.target.result;
        setPartnerLogo(val);
        setCachedAsset("partnerLogo", val);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCoverBg = () => {
    setCustomCoverBg(null);
    removeCachedAsset("customCoverBg");
  };
  const resetSarbargBg = () => {
    setCustomSarbargBg(null);
    removeCachedAsset("customSarbargBg");
  };
  const resetPartnerLogo = () => {
    setPartnerLogo(null);
    removeCachedAsset("partnerLogo");
  };

  const paginateText = () => {
    // Standard page heights in pixels at 96 DPI
    const estimatedLineHeight = fontSize * lineHeight;
    const pageHeight = 1120 - marginTop - marginBottom;
    const maxLinesPerPage = Math.max(
      1,
      Math.floor(pageHeight / estimatedLineHeight),
    );

    const lines = bodyText.split("\n");
    const pages = [];
    let currentPageLines = [];
    let currentLineCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      // Instead of character slicing, split lines logically by wrapping width
      const lineLength = rawLine.length;
      const wrapFactor = 70; // Heuristic word wrapping character threshold
      const estimatedWraps =
        lineLength === 0 ? 1 : Math.max(1, Math.ceil(lineLength / wrapFactor));

      if (
        currentLineCount + estimatedWraps > maxLinesPerPage &&
        currentPageLines.length > 0
      ) {
        pages.push(currentPageLines.join("\n"));
        currentPageLines = [rawLine];
        currentLineCount = estimatedWraps;
      } else {
        currentPageLines.push(rawLine);
        currentLineCount += estimatedWraps;
      }
    }
    if (currentPageLines.length > 0) {
      pages.push(currentPageLines.join("\n"));
    }
    return pages;
  };

  const paginatedTextPages = paginateText();

  const generatePDF = async () => {
    setIsGenerating(true);
    setIsExporting(true);
    const prevDragMode = dragMode;
    setDragMode(false);

    // Pause to allow React to flush CSS state switches cleanly to the DOM
    await new Promise((resolve) => setTimeout(resolve, 300));
    await document.fonts.ready;

    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
      const element = pdfContainerRef.current;

      const opt = {
        margin: 0,
        filename: "persian_document_export.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2.0, // Scale 2.0 provides crisp print resolution
          useCORS: true,
          letterRendering: false, // CRITICAL: Setting to false stops html2canvas from disconnecting Persian letters
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            const replaceZWNJ = (node) => {
              if (node.nodeType === 3) { // Text node
                if (node.nodeValue.includes("\u200c")) {
                  node.nodeValue = node.nodeValue.replace(/\u200c/g, " ");
                }
              } else {
                for (let child of node.childNodes) {
                  replaceZWNJ(child);
                }
              }
            };
            replaceZWNJ(clonedDoc.body);
          }
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "css" }, // Rely on explicit breaks
      };

      await html2pdf().from(element).set(opt).save();
    } catch (e) {
      console.error(e);
    }

    setIsExporting(false);
    setDragMode(prevDragMode);
    setIsGenerating(false);
  };

  return (
    <div
      className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-['Vazirmatn']"
      dir="rtl"
    >
      <Header
        dragMode={dragMode}
        setDragMode={setDragMode}
        generatePDF={generatePDF}
        isGenerating={isGenerating}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          coverTitle={coverTitle}
          setCoverTitle={setCoverTitle}
          coverDate={coverDate}
          setCoverDate={setCoverDate}
          metaDate={metaDate}
          setMetaDate={setMetaDate}
          metaNumber={metaNumber}
          setMetaNumber={setMetaNumber}
          metaAttachment={metaAttachment}
          setMetaAttachment={setMetaAttachment}
          bodyText={bodyText}
          setBodyText={setBodyText}
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          marginTop={marginTop}
          setMarginTop={setMarginTop}
          marginBottom={marginBottom}
          setMarginBottom={setMarginBottom}
          marginRight={marginRight}
          setMarginRight={setMarginRight}
          marginLeft={marginLeft}
          setMarginLeft={setMarginLeft}
          customCoverBg={customCoverBg}
          handleCoverBgUpload={handleCoverBgUpload}
          resetCoverBg={resetCoverBg}
          customSarbargBg={customSarbargBg}
          handleSarbargBgUpload={handleSarbargBgUpload}
          resetSarbargBg={resetSarbargBg}
          partnerLogo={partnerLogo}
          handlePartnerLogoUpload={handlePartnerLogoUpload}
          resetPartnerLogo={resetPartnerLogo}
          dragMode={dragMode}
          pageCount={paginatedTextPages.length}
        />

        <DocumentPreview
          pdfContainerRef={pdfContainerRef}
          zoom={zoom}
          setZoom={setZoom}
          isExporting={isExporting}
          customCoverBg={customCoverBg}
          customSarbargBg={customSarbargBg}
          partnerLogo={partnerLogo}
          posCoverTitle={posCoverTitle}
          setPosCoverTitle={setPosCoverTitle}
          posPartnerLogo={posPartnerLogo}
          setPosPartnerLogo={setPosPartnerLogo}
          posCoverDate={posCoverDate}
          setPosCoverDate={setPosCoverDate}
          posSarbargTitle={posSarbargTitle}
          setPosSarbargTitle={setPosSarbargTitle}
          dragMode={dragMode}
          coverTitle={coverTitle}
          coverDate={coverDate}
          metaDate={metaDate}
          metaNumber={metaNumber}
          metaAttachment={metaAttachment}
          paginatedTextPages={paginatedTextPages}
          marginTop={marginTop}
          marginRight={marginRight}
          marginLeft={marginLeft}
          marginBottom={marginBottom}
          fontSize={fontSize}
          lineHeight={lineHeight}
        />
      </main>
    </div>
  );
}
