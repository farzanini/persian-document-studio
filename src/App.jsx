import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Download,
  Settings,
  Sliders,
  RefreshCw,
  Upload,
  FileCheck,
  ZoomIn,
  ZoomOut,
  Info,
  Image as ImageIcon,
  Type,
  MousePointer2,
  Lock,
  Unlock,
  Eye,
  Calendar,
  RotateCcw,
  Layout,
  Sparkles,
  AlignRight,
  AlignCenter,
  AlignLeft,
  EyeOff,
  Layers,
} from "lucide-react";

const templates = {
  contract: `جناب آقای مدیر عامل محترم
موضوع: درخواست همکاری راهبردی در حوزه توسعه تجارت الکترونیک

با سلام و احترام،
پس از بررسی‌های کارشناسی و با توجه به ظرفیت‌های متقابل، بدین‌وسیله آمادگی کامل این شرکت جهت آغاز پیاده‌سازی و سرمایه‌گذاری مشترک بر روی پلتفرم نوظهور اعلام می‌گردد. امید است با هم‌افزایی توانمندی‌های متقابل، گام مؤثری در جهت توسعه اقتصاد دیجیتال برداشته شود.

پیشاپیش از بذل توجه جنابعالی صمیمانه سپاسگزاریم.

با تقدیم احترام،
مدیریت توسعه کسب و کار`,
  longContract: `ماده ۱: طرفین قرارداد
این قرارداد فی‌مابین شرکت نوظهور تجارت و شرکت همکار به منظور توسعه خدمات هم‌افزایی و فناورانه منعقد می‌گردد.

ماده ۲: موضوع قرارداد
موضوع عبارت است از مشارکت راهبردی در پیاده‌سازی سرویس‌های ابری هوشمند، یکپارچه‌سازی پایگاه داده مشتریان، بهینه‌سازی کانال‌های ارتباطی و ایجاد هاب لجستیک مشترک به همراه خدمات پشتیبانی ۲۴ ساعته در سراسر کشور.

ماده ۳: مدت قرارداد
مدت زمان اجرای موضوع از تاریخ امضا به مدت ۳ سال شمسی معتبر بوده و در صورت توافق کتبی طرفین قابل تمدید خواهد بود.

ماده ۴: تعهدات طرف اول
۱- تامین زیرساخت‌های سرور و نرم‌افزار مورد نیاز.
۲- ارائه دسترسی‌های فنی و مستندات API به تیم توسعه طرف دوم.
۳- تضمین امنیت اطلاعات و حریم خصوصی کاربران نهایی.
۴- برگزاری دوره‌های آموزشی رایگان برای کارکنان کلیدی طرف دوم.

ماده ۵: تعهدات طرف دوم
۱- تامین نیروی انسانی متخصص جهت راه‌اندازی و بازاریابی میدانی.
۲- مدیریت عملیات فروش و پاسخگویی به شکایات مشتریان.
۳- عدم افشای هرگونه اطلاعات محرمانه مربوط به هسته پلتفرم به اشخاص ثالث.

ماده ۶: حل اختلاف
در صورت بروز هرگونه ابهام یا اختلاف، موضوع ابتدا از طریق مذاکره صلح‌آمیز و در صورت عدم حصول نتیجه، از طریق مراجع قانونی صالحه پیگیری خواهد شد.

با تقدیم احترام،
نماینده تام‌الاختیار طرفین`,
};

const Draggable = ({ id, x, y, onDrag, children, enabled, label, zoom }) => {
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (!enabled) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = {
      x: (e.clientX - rect.left) / (zoom / 100),
      y: (e.clientY - rect.top) / (zoom / 100),
    };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const parentContainer = document.getElementById(id);
      if (!parentContainer) return;
      const parentRect = parentContainer.getBoundingClientRect();
      const newX =
        (e.clientX - parentRect.left) / (zoom / 100) - offset.current.x;
      const newY =
        (e.clientY - parentRect.top) / (zoom / 100) - offset.current.y;
      onDrag(newX, newY);
    };

    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onDrag, id, zoom]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        cursor: enabled ? (isDragging ? "grabbing" : "grab") : "default",
        zIndex: 20,
        userSelect: "none",
        transition: isDragging ? "none" : "box-shadow 0.2s",
      }}
      onMouseDown={onMouseDown}
      className={`${enabled ? "hover:outline-2 hover:outline-dashed hover:outline-indigo-500 group" : ""}`}
    >
      {enabled && (
        <div
          className="absolute -top-6 right-0 bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none z-30"
          dir="rtl"
        >
          {label} (بکشید تا جابجا شود)
        </div>
      )}
      {children}
    </div>
  );
};

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

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleCoverBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomCoverBg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSarbargBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomSarbargBg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePartnerLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPartnerLogo(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const resetCoverBg = () => setCustomCoverBg(null);
  const resetSarbargBg = () => setCustomSarbargBg(null);
  const resetPartnerLogo = () => setPartnerLogo(null);

  const paginateText = () => {
    // Standard page heights in pixels at 96 DPI
    const estimatedLineHeight = fontSize * lineHeight;
    const pageHeight = 1123 - marginTop - marginBottom;
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

    try {
      if (!window.html2pdf) {
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          s.onload = resolve;
          document.head.appendChild(s);
        });
      }

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
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "css" }, // Rely on explicit breaks
      };

      await window.html2pdf().from(element).set(opt).save();
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
      {/* Top Action Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-inner">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-md font-bold text-white">
              استودیو طراحی و تولید مدارک تجاری (نسخه هوشمند)
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">
              تولید خودکار صفحات اضافه در صورت سرریز متن بر روی قالب رسمی
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setDragMode(!dragMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              dragMode
                ? "bg-amber-500 border-amber-400 text-slate-950 shadow-lg"
                : "bg-slate-800 border-slate-700 text-slate-300"
            }`}
          >
            {dragMode ? (
              <Unlock className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            {dragMode ? "حالت جابجایی با ماوس: فعال" : "قفل کردن موقعیت‌ها"}
          </button>

          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg transition-all"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            دانلود نسخه PDF
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Sidebar Controls Panel */}
        <aside className="w-full lg:w-[420px] bg-slate-950 border-l border-slate-800 overflow-y-auto p-6 space-y-6 shrink-0">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-4 gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("text")}
              className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${activeTab === "text" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <div className="flex flex-col items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                <span>متن سند</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("layout")}
              className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${activeTab === "layout" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <div className="flex flex-col items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>فاصله‌گذاری</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("backgrounds")}
              className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${activeTab === "backgrounds" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <div className="flex flex-col items-center gap-1">
                <Layout className="w-3.5 h-3.5" />
                <span>قالب‌ها</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("logos")}
              className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${activeTab === "logos" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>لوگو همکار</span>
              </div>
            </button>
          </div>

          {/* Tab Content: Text Editor */}
          {activeTab === "text" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" /> مدیریت محتوای
                  متنی
                </h3>
                <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                  تعداد صفحات متن: {paginatedTextPages.length} صفحه
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block font-bold">
                    عنوان سند (نمایش روی جلد و بالای صفحات)
                  </label>
                  <textarea
                    value={coverTitle}
                    onChange={(e) => setCoverTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs leading-relaxed focus:ring-1 focus:ring-indigo-500 outline-none"
                    rows={2}
                    placeholder="موضوع تفاهم‌نامه یا قرارداد..."
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block font-bold">
                    تاریخ پایین جلد
                  </label>
                  <input
                    type="text"
                    value={coverDate}
                    onChange={(e) => setCoverDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9px] text-slate-400 mb-1 block font-bold">
                      تاریخ سربرگ
                    </label>
                    <input
                      type="text"
                      value={metaDate}
                      onChange={(e) => setMetaDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs outline-none text-center font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 mb-1 block font-bold">
                      شماره نامه
                    </label>
                    <input
                      type="text"
                      value={metaNumber}
                      onChange={(e) => setMetaNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs outline-none text-center font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 mb-1 block font-bold">
                      پیوست
                    </label>
                    <input
                      type="text"
                      value={metaAttachment}
                      onChange={(e) => setMetaAttachment(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs outline-none text-center"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] text-slate-400 font-bold">
                      محتوای متنی (سربرگ)
                    </label>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setBodyText(templates.contract)}
                        className="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded"
                      >
                        نمونه کوتاه
                      </button>
                      <button
                        onClick={() => setBodyText(templates.longContract)}
                        className="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded"
                      >
                        نمونه طولانی (چند صفحه‌ای)
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs leading-loose h-64 outline-none font-mono"
                    placeholder="محل درج مفاد موافقت‌نامه..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Spacing & Font Styles */}
          {activeTab === "layout" && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" /> فاصله‌گذاری و
                قلم متن دوم
              </h3>

              <div className="space-y-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400 font-bold">
                      اندازه قلم ({fontSize}px)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="11"
                    max="18"
                    step="0.5"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400 font-bold">
                      فاصله خطوط ({lineHeight})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="3"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 font-bold block mb-3">
                    حاشیه متن سربرگ (پیکسل):
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        بالا ({marginTop}px)
                      </span>
                      <input
                        type="range"
                        min="120"
                        max="250"
                        value={marginTop}
                        onChange={(e) => setMarginTop(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        پایین ({marginBottom}px)
                      </span>
                      <input
                        type="range"
                        min="80"
                        max="220"
                        value={marginBottom}
                        onChange={(e) =>
                          setMarginBottom(parseInt(e.target.value))
                        }
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        راست ({marginRight}px)
                      </span>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={marginRight}
                        onChange={(e) =>
                          setMarginRight(parseInt(e.target.value))
                        }
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        چپ ({marginLeft}px)
                      </span>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={marginLeft}
                        onChange={(e) =>
                          setMarginLeft(parseInt(e.target.value))
                        }
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Layout Templates */}
          {activeTab === "backgrounds" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Layout className="w-4 h-4" /> قالب طرح جلد (cover.png)
                </h3>
                <p className="text-[10px] text-slate-500 mb-3">
                  یک عکس متناسب با ابعاد A4 آپلود کنید تا جایگزین تصویر پیش‌فرض
                  جلد گردد.
                </p>

                <label className="flex flex-col items-center justify-center py-5 border border-dashed border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-all">
                  <Upload className="w-5 h-5 text-indigo-400 mb-1" />
                  <span className="text-[11px] text-slate-400">
                    آپلود قالب جدید جلد
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverBgUpload}
                  />
                </label>

                {customCoverBg && (
                  <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg mt-2">
                    <span className="text-[10px] text-indigo-300">
                      قالب جلد سفارشی فعال است
                    </span>
                    <button
                      onClick={resetCoverBg}
                      className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> ریست
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Layout className="w-4 h-4" /> قالب سربرگ (sarbarg.png)
                </h3>
                <p className="text-[10px] text-slate-500 mb-3">
                  یک عکس متناسب با ابعاد A4 آپلود کنید تا جایگزین تصویر پیش‌فرض
                  سربرگ گردد.
                </p>

                <label className="flex flex-col items-center justify-center py-5 border border-dashed border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-all">
                  <Upload className="w-5 h-5 text-indigo-400 mb-1" />
                  <span className="text-[11px] text-slate-400">
                    آپلود قالب جدید سربرگ
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSarbargBgUpload}
                  />
                </label>

                {customSarbargBg && (
                  <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg mt-2">
                    <span className="text-[10px] text-indigo-300">
                      قالب سربرگ سفارشی فعال است
                    </span>
                    <button
                      onClick={resetSarbargBg}
                      className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> ریست
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab Content: Partner Logos */}
          {activeTab === "logos" && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-400" /> آپلود لوگوی
                شرکت همکار
              </h3>
              <p className="text-[10px] text-slate-500">
                لوگوی همکار در صفحه جلد مستقیماً رو‌به‌روی لوگوی اصلی قرار
                می‌گیرد.
              </p>

              <label className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-indigo-400 mb-2" />
                <span className="text-[11px] text-slate-400">
                  آپلود لوگوی همکار (PNG بدون پس‌زمینه)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePartnerLogoUpload}
                />
              </label>

              {partnerLogo ? (
                <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-lg">
                  <span className="text-[11px] text-emerald-400 font-bold">
                    لوگو همکار فعال است
                  </span>
                  <button
                    onClick={resetPartnerLogo}
                    className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> حذف لوگو
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-[10px]">
                  <EyeOff className="w-4 h-4 shrink-0" />
                  <span>
                    در صورت عدم بارگذاری لوگو، کادر مربوطه در نسخه نهایی PDF
                    خروجی مخفی خواهد شد.
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-indigo-950/40 border border-indigo-800/30 rounded-xl space-y-2">
            <div className="flex gap-2 items-start text-indigo-300">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>نکته کاربردی:</strong> کلید{" "}
                <span className="text-amber-400 font-bold">حالت جابجایی</span>{" "}
                را روشن بگذارید تا بتوانید المان‌های متنی و لوگو را با درگ‌ کردن
                جابجا کنید.
              </p>
            </div>
          </div>
        </aside>

        {/* Dynamic Interactive Preview Canvas Container */}
        <section className="flex-1 bg-slate-900 flex flex-col items-center p-8 overflow-y-auto relative">
          {/* Zoom Level Indicator */}
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-full mb-6 sticky top-0 z-40 border border-slate-800 shadow-xl">
            <button
              onClick={() => setZoom(Math.max(30, zoom - 5))}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(100, zoom + 5))}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* HTML Canvas Wrapper for html2pdf Capture */}
          <div
            ref={pdfContainerRef}
            className={`flex flex-col origin-top transition-all duration-150 ${isExporting ? "gap-0 bg-transparent" : "gap-10"}`}
            style={{
              transform: isExporting ? "none" : `scale(${zoom / 100})`,
              width: "794px",
              display: "block", // Ensure simple blocks for clean rendering sequence
            }}
          >
            {/* PAGE 1: COVER PAGE */}
            <div
              id="page-container-cover"
              className="relative w-[794px] h-[1123px] bg-white overflow-hidden shrink-0 select-none html2pdf__page-break"
              style={{
                boxShadow: isExporting
                  ? "none"
                  : "0 25px 50px -12px rgb(0 0 0 / 0.5)",
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
                    "https://placehold.co/794x1123/e2e8f0/1e293b?text=Cover+Page+Background";
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
                  className={`flex items-center justify-center text-center p-4 transition-all ${dragMode ? "border border-dashed border-indigo-500 bg-indigo-500/5" : ""}`}
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
                    className={`flex items-center justify-center p-2 transition-all ${dragMode ? "border border-dashed border-amber-500 bg-amber-500/5" : ""}`}
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
                      <div className="border border-dashed border-slate-300 w-full h-full rounded-lg flex items-center justify-center text-[9px] text-slate-400 bg-slate-50 text-center font-bold">
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
                  className={`w-[794px] text-center font-bold text-slate-800 text-sm py-1 ${dragMode ? "border border-dashed border-emerald-500 bg-emerald-500/5" : ""}`}
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
                  className="relative w-[794px] h-[1123px] bg-white overflow-hidden shrink-0 select-none html2pdf__page-break"
                  style={{
                    boxShadow: isExporting
                      ? "none"
                      : "0 25px 50px -12px rgb(0 0 0 / 0.5)",
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
                        "https://placehold.co/794x1123/f8fafc/0f172a?text=Sarbarg+Page+Background";
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
                      className={`p-1.5 min-w-[280px] text-center rounded transition-all ${dragMode ? "border border-dashed border-indigo-500 bg-indigo-500/5" : ""}`}
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
      </main>
    </div>
  );
}
