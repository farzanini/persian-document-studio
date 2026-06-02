import React from "react";
import {
  Type,
  Sliders,
  Layout,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { templates } from "../constants/templates";

const Sidebar = ({
  activeTab,
  setActiveTab,
  coverTitle,
  setCoverTitle,
  coverDate,
  setCoverDate,
  metaDate,
  setMetaDate,
  metaNumber,
  setMetaNumber,
  metaAttachment,
  setMetaAttachment,
  bodyText,
  setBodyText,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  marginTop,
  setMarginTop,
  marginBottom,
  setMarginBottom,
  marginRight,
  setMarginRight,
  marginLeft,
  setMarginLeft,
  customCoverBg,
  handleCoverBgUpload,
  resetCoverBg,
  customSarbargBg,
  handleSarbargBgUpload,
  resetSarbargBg,
  partnerLogo,
  handlePartnerLogoUpload,
  resetPartnerLogo,
  dragMode,
  pageCount,
}) => {
  return (
    <aside className="w-full lg:w-[420px] bg-slate-950 border-l border-slate-800 overflow-y-auto p-6 space-y-6 shrink-0">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab("text")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${
            activeTab === "text"
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Type className="w-3.5 h-3.5" />
            <span>متن سند</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("layout")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${
            activeTab === "layout"
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>فاصله‌گذاری</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("backgrounds")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${
            activeTab === "backgrounds"
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Layout className="w-3.5 h-3.5" />
            <span>قالب‌ها</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("logos")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${
            activeTab === "logos"
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
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
              <Sliders className="w-4 h-4 text-indigo-400" /> مدیریت محتوای متنی
            </h3>
            <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
              تعداد صفحات متن: {pageCount} صفحه
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
            <Sliders className="w-4 h-4 text-indigo-400" /> فاصله‌گذاری و قلم متن دوم
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
                    onChange={(e) => setMarginBottom(parseInt(e.target.value))}
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
                    onChange={(e) => setMarginRight(parseInt(e.target.value))}
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
                    onChange={(e) => setMarginLeft(parseInt(e.target.value))}
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
              یک عکس متناسب با ابعاد A4 آپلود کنید تا جایگزین تصویر پیش‌فرض جلد گردد.
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
              یک عکس متناسب با ابعاد A4 آپلود کنید تا جایگزین تصویر پیش‌فرض سربرگ گردد.
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
            <ImageIcon className="w-4 h-4 text-indigo-400" /> آپلود لوگوی شرکت همکار
          </h3>
          <p className="text-[10px] text-slate-500">
            لوگوی همکار در صفحه جلد مستقیماً رو‌به‌روی لوگوی اصلی قرار می‌گیرد.
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
                در صورت عدم بارگذاری لوگو، کادر مربوطه در نسخه نهایی PDF خروجی مخفی خواهد شد.
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
            <span className="text-amber-400 font-bold">حالت جابجایی</span> را روشن بگذارید تا بتوانید المان‌های متنی و لوگو را با درگ‌ کردن جابجا کنید.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
