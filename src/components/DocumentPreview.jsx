import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import Draggable from "./Draggable";

const DocumentPreview = ({
  pdfContainerRef,
  zoom,
  setZoom,
  isExporting,
  customCoverBg,
  customSarbargBg,
  partnerLogo,
  posCoverTitle,
  setPosCoverTitle,
  posPartnerLogo,
  setPosPartnerLogo,
  posCoverDate,
  setPosCoverDate,
  posSarbargTitle,
  setPosSarbargTitle,
  dragMode,
  coverTitle,
  coverDate,
  metaDate,
  metaNumber,
  metaAttachment,
  paginatedTextPages,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  fontSize,
  lineHeight,
}) => {
  return (
    <section className="flex-1 bg-slate-900 flex flex-col items-center p-8 overflow-y-auto relative">
      {/* Zoom Level Indicator */}
      <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-6 sticky top-0 z-40 border border-slate-800/80 shadow-2xl transition-all">
        <button
          onClick={() => setZoom(Math.max(30, zoom - 5))}
          className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold font-mono w-10 text-center text-slate-200">{zoom}%</span>
        <button
          onClick={() => setZoom(Math.min(100, zoom + 5))}
          className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* HTML Canvas Wrapper for html2pdf Capture */}
      <div
        ref={pdfContainerRef}
        className={`flex flex-col origin-top transition-all duration-150 ${
          isExporting ? "gap-0 bg-transparent" : "gap-10"
        }`}
        style={{
          transform: isExporting ? "none" : `scale(${zoom / 100})`,
          width: "794px",
          display: "block", // Ensure simple blocks for clean rendering sequence
          letterSpacing: "normal",
        }}
      >
        {/* PAGE 1: COVER PAGE */}
        <div
          id="page-container-cover"
          className="relative w-[794px] h-[1120px] bg-white overflow-hidden shrink-0 select-none html2pdf__page-break"
          style={{
            boxShadow: isExporting
              ? "none"
              : "0 20px 45px -10px rgba(0, 0, 0, 0.45), 0 10px 20px -5px rgba(0, 0, 0, 0.3)",
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            display: "block",
            pageBreakAfter: "always",
            breakAfter: "page",
          }}
        >
          <img
            src={customCoverBg || "cover.png"}
            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            alt="Cover Background"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/794x1120/e2e8f0/1e293b?text=Cover+Page+Background";
            }}
          />

          {/* Draggable Title Block inside Cover (Middle Box) */}
          <Draggable
            id="page-container-cover"
            label="عنوان اصلی روی جلد"
            x={posCoverTitle.x}
            y={posCoverTitle.y}
            zoom={zoom}
            enabled={dragMode}
            onDrag={(x, y) => setPosCoverTitle({ ...posCoverTitle, x, y })}
          >
            <div
              className={`flex items-center justify-center text-center p-4 transition-all ${
                dragMode ? "border border-dashed border-indigo-500/60 bg-indigo-500/5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.03)]" : ""
              }`}
              style={{
                width: `${posCoverTitle.w}px`,
                height: `${posCoverTitle.h}px`,
              }}
            >
              <h2 className="text-2xl font-bold text-slate-900 leading-relaxed whitespace-pre-wrap font-['Vazirmatn'] text-center">
                {coverTitle ||
                  (isExporting ? "" : "عنوان سند را مشخص نمایید")}
              </h2>
            </div>
          </Draggable>

          {/* Draggable Partner Logo Box (Omitted entirely from compiled output if not uploaded) */}
          {(!isExporting || partnerLogo) && (
            <Draggable
              id="page-container-cover"
              label="لوگوی همکار"
              x={posPartnerLogo.x}
              y={posPartnerLogo.y}
              zoom={zoom}
              enabled={dragMode}
              onDrag={(x, y) =>
                setPosPartnerLogo({ ...posPartnerLogo, x, y })
              }
            >
              <div
                className={`flex items-center justify-center p-2 transition-all ${
                  dragMode ? "border border-dashed border-amber-500/60 bg-amber-500/5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.03)]" : ""
                }`}
                style={{
                  width: `${posPartnerLogo.size}px`,
                  height: "80px",
                }}
              >
                {partnerLogo ? (
                  <img
                    src={partnerLogo}
                    className="max-w-full max-h-full object-contain"
                    alt="Partner Logo"
                  />
                ) : (
                  <div className="border border-dashed border-slate-200 w-full h-full rounded-lg flex items-center justify-center text-[9px] text-slate-400 bg-slate-50/50 text-center font-semibold">
                    لوگوی شرکت همکار <br /> (اینجا قرار می‌گیرد)
                  </div>
                )}
              </div>
            </Draggable>
          )}

          {/* Draggable Date Block at Bottom of Cover */}
          <Draggable
            id="page-container-cover"
            label="تاریخ پایین جلد"
            x={posCoverDate.x}
            y={posCoverDate.y}
            zoom={zoom}
            enabled={dragMode}
            onDrag={(x, y) => setPosCoverDate({ ...posCoverDate, x, y })}
          >
            <div
              className={`w-[794px] text-center font-bold text-slate-800 text-sm py-1 transition-all ${
                dragMode ? "border border-dashed border-emerald-500/60 bg-emerald-500/5 rounded shadow-[0_0_15px_rgba(16,185,129,0.03)]" : ""
              }`}
            >
              {coverDate || "۱۴۰۵"}
            </div>
          </Draggable>
        </div>

        {/* DYNAMIC PAGES: MULTI-PAGE TEXT FLOW */}
        {paginatedTextPages.map((pageText, index) => {
          const pageId = `page-container-sarbarg-${index}`;
          const isLastPage = index === paginatedTextPages.length - 1;
          return (
            <div
              key={index}
              id={pageId}
              className="relative w-[794px] h-[1120px] bg-white overflow-hidden shrink-0 select-none html2pdf__page-break"
              style={{
                boxShadow: isExporting
                  ? "none"
                  : "0 20px 45px -10px rgba(0, 0, 0, 0.45), 0 10px 20px -5px rgba(0, 0, 0, 0.3)",
                boxSizing: "border-box",
                margin: 0,
                padding: 0,
                display: "block",
                pageBreakAfter: isLastPage ? "avoid" : "always",
                breakAfter: isLastPage ? "avoid" : "page",
              }}
            >
              <img
                src={customSarbargBg || "sarbarg.png"}
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                alt="Sarbarg Background"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/794x1120/f8fafc/0f172a?text=Sarbarg+Page+Background";
                }}
              />

              {/* Draggable Title on top of Sarbarg Page (synchronized across pages) */}
              <Draggable
                id={pageId}
                label={`عنوان سربرگ (صفحه ${index + 1})`}
                x={posSarbargTitle.x}
                y={posSarbargTitle.y}
                zoom={zoom}
                enabled={dragMode}
                onDrag={(x, y) =>
                  setPosSarbargTitle({ ...posSarbargTitle, x, y })
                }
              >
                <div
                  className={`p-1.5 min-w-[280px] text-center rounded transition-all ${
                    dragMode ? "border border-dashed border-indigo-500/60 bg-indigo-500/5 rounded shadow-[0_0_15px_rgba(99,102,241,0.03)]" : ""
                  }`}
                >
                  <h3 className="text-[13px] font-bold text-slate-800 leading-normal font-['Vazirmatn']">
                    {coverTitle}
                  </h3>
                </div>
              </Draggable>

              {/* Overlaid Metadata values - pre-printed on each page of letterhead */}
              <div
                className="absolute text-slate-900 font-mono text-[12.5px] font-bold"
                style={{ top: "23px", right: "47px", width: "135px" }}
              >
                <div className="h-[20px] flex items-center justify-end pr-2 pl-2 overflow-hidden">
                  {metaDate}
                </div>
                <div className="h-[20px] mt-[10px] flex items-center justify-end pr-2 pl-2 overflow-hidden text-[11px]">
                  {metaNumber}
                </div>
                <div className="h-[20px] mt-[10px] flex items-center justify-end pr-2 pl-2 overflow-hidden text-[11.5px] font-['Vazirmatn']">
                  {metaAttachment}
                </div>
              </div>

              {/* STRICT ARABIC/PERSIAN RTL ALIGNED CONTENT BLOCK */}
              <div
                className="absolute select-text text-slate-800 font-normal break-words whitespace-pre-wrap"
                dir="rtl"
                style={{
                  top: `${marginTop}px`,
                  right: `${marginRight}px`,
                  left: `${marginLeft}px`,
                  bottom: `${marginBottom}px`,
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                  fontFamily: "'Vazirmatn', sans-serif",
                  direction: "rtl",
                  textAlign: "right", // Forces absolute right text alignment in both HTML and PDF formats
                  unicodeBidi: "embed",
                  overflow: "hidden",
                  letterSpacing: "normal",
                }}
              >
                {pageText}
              </div>

              {/* Optional page counter indicator at bottom (hidden on final PDF export) */}
              {!isExporting && (
                <div className="absolute bottom-4 left-6 bg-slate-800/80 text-white text-[10px] px-2.5 py-1 rounded-full border border-slate-700/50">
                  صفحه {index + 1} از {paginatedTextPages.length}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DocumentPreview;
