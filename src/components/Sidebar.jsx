
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
import RichTextEditor from "./RichTextEditor";

const Sidebar = ({
  activeTab,
  setActiveTab,
  coverTitle,
  setCoverTitle,
  coverDate,
  setCoverDate,
  showMetadata,
  setShowMetadata,
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
  pageCount,
  coverTitleColor,
  setCoverTitleColor,
  bodyTextColor,
  setBodyTextColor,
}) => {
  return (
    <aside className="w-full lg:w-[420px] bg-slate-950 border-l border-slate-900/80 overflow-y-auto p-6 space-y-6 shrink-0">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setActiveTab("text")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
            activeTab === "text"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Type className="w-3.5 h-3.5" />
            <span>متن سند</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("layout")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
            activeTab === "layout"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>فاصله‌گذاری</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("backgrounds")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
            activeTab === "backgrounds"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Layout className="w-3.5 h-3.5" />
            <span>قالب‌ها</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("logos")}
          className={`py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
            activeTab === "logos"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
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
            <span className="text-[10px] bg-slate-900 border border-slate-800/80 text-indigo-300 px-2 py-0.5 rounded-full font-mono font-medium shadow-sm">
              تعداد صفحات متن: {pageCount} صفحه
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-400 mb-1.5 block font-bold">
                عنوان سند (نمایش روی جلد و بالای صفحات)
              </label>
              <textarea
                value={coverTitle}
                onChange={(e) => setCoverTitle(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs leading-relaxed focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-200 transition-all"
                rows={2}
                placeholder="موضوع تفاهم‌نامه یا قرارداد..."
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 mb-1.5 block font-bold">
                تاریخ پایین جلد
              </label>
              <input
                type="text"
                value={coverDate}
                onChange={(e) => setCoverDate(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-200 transition-all"
              />
            </div>

            <label className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900/60 transition-all select-none">
              <input
                type="checkbox"
                checked={showMetadata}
                onChange={(e) => setShowMetadata(e.target.checked)}
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
              />
              <span className="text-[11px] text-slate-300 font-bold">
                فعال‌سازی اطلاعات سربرگ (تاریخ، شماره، پیوست)
              </span>
            </label>

            {showMetadata && (
              <div className="grid grid-cols-3 gap-2 bg-slate-900/20 p-2.5 rounded-xl border border-slate-800/50">
                <div>
                  <label className="text-[9px] text-slate-400 mb-1.5 block font-bold">
                    تاریخ سربرگ
                  </label>
                  <input
                    type="text"
                    value={metaDate}
                    onChange={(e) => setMetaDate(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-200 text-center font-mono transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 mb-1.5 block font-bold">
                    شماره نامه
                  </label>
                  <input
                    type="text"
                    value={metaNumber}
                    onChange={(e) => setMetaNumber(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-200 text-center font-mono transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 mb-1.5 block font-bold">
                    پیوست
                  </label>
                  <input
                    type="text"
                    value={metaAttachment}
                    onChange={(e) => setMetaAttachment(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-200 text-center transition-all"
                  />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] text-slate-400 font-bold">
                  محتوای متنی (سربرگ)
                </label>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setBodyText(templates.contract)}
                    className="text-[9px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg cursor-pointer transition-all hover:text-white"
                  >
                    نمونه کوتاه
                  </button>
                  <button
                    onClick={() => setBodyText(templates.longContract)}
                    className="text-[9px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg cursor-pointer transition-all hover:text-white"
                  >
                    نمونه طولانی (چند صفحه‌ای)
                  </button>
                </div>
              </div>
              <RichTextEditor
                value={bodyText}
                onChange={setBodyText}
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
            <Sliders className="w-4 h-4 text-indigo-400" /> تنظیمات فاصله‌گذاری و قلم
          </h3>

          <div className="space-y-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
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
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
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
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-bold block mb-3">
                حاشیه متن سربرگ (پیکسل):
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block mb-1">
                    بالا ({marginTop}px)
                  </span>
                  <input
                    type="range"
                    min="120"
                    max="250"
                    value={marginTop}
                    onChange={(e) => setMarginTop(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block mb-1">
                    پایین ({marginBottom}px)
                  </span>
                  <input
                    type="range"
                    min="80"
                    max="220"
                    value={marginBottom}
                    onChange={(e) => setMarginBottom(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block mb-1">
                    راست ({marginRight}px)
                  </span>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={marginRight}
                    onChange={(e) => setMarginRight(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block mb-1">
                    چپ ({marginLeft}px)
                  </span>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={marginLeft}
                    onChange={(e) => setMarginLeft(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Colors customizer section */}
            <div className="pt-3 border-t border-slate-800/80 space-y-4">
              <span className="text-[11px] text-slate-400 font-bold block">
                تنظیم رنگ نوشته‌ها:
              </span>

              {/* Cover Title Color Customizer */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>رنگ عنوان جلد</span>
                  <span className="text-slate-400 font-bold">{coverTitleColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={coverTitleColor}
                    onChange={(e) => setCoverTitleColor(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer overflow-hidden p-0"
                  />
                  <div className="flex gap-1.5 flex-1">
                    {[
                      { name: "تیره", value: "#0f172a" },
                      { name: "سفید", value: "#ffffff" },
                      { name: "سرمه‌ای", value: "#1e3a8a" },
                      { name: "طلایی", value: "#854d0e" },
                    ].map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setCoverTitleColor(preset.value)}
                        className={`text-[9px] px-2 py-1 rounded-md border text-slate-300 transition-all cursor-pointer ${
                          coverTitleColor.toLowerCase() === preset.value.toLowerCase()
                            ? "bg-indigo-600/30 border-indigo-500 text-white"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                        title={preset.name}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Body Text Color Customizer */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>رنگ متن سربرگ</span>
                  <span className="text-slate-400 font-bold">{bodyTextColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bodyTextColor}
                    onChange={(e) => setBodyTextColor(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer overflow-hidden p-0"
                  />
                  <div className="flex gap-1.5 flex-1">
                    {[
                      { name: "تیره", value: "#1e293b" },
                      { name: "سفید", value: "#ffffff" },
                      { name: "سرمه‌ای", value: "#1e3a8a" },
                      { name: "آبی", value: "#3b82f6" },
                    ].map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setBodyTextColor(preset.value)}
                        className={`text-[9px] px-2 py-1 rounded-md border text-slate-300 transition-all cursor-pointer ${
                          bodyTextColor.toLowerCase() === preset.value.toLowerCase()
                            ? "bg-indigo-600/30 border-indigo-500 text-white"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                        title={preset.name}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
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
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Layout className="w-4 h-4 text-indigo-400" /> قالب طرح جلد (cover.png)
            </h3>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
              یک عکس متناسب با ابعاد A4 آپلود کنید تا جایگزین تصویر پیش‌فرض جلد گردد.
            </p>

            <label className="flex flex-col items-center justify-center py-5 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer transition-all group">
              <Upload className="w-5 h-5 text-indigo-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] text-slate-400 group-hover:text-slate-200">
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
              <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl mt-2">
                <span className="text-[10px] text-indigo-300 font-medium">
                  قالب جلد سفارشی فعال است
                </span>
                <button
                  onClick={resetCoverBg}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> ریست
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Layout className="w-4 h-4 text-indigo-400" /> قالب سربرگ (sarbarg.png)
            </h3>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
              یک عکس متناسب با ابعاد A4 آپلود کنید تا جایگزین تصویر پیش‌فرض سربرگ گردد.
            </p>

            <label className="flex flex-col items-center justify-center py-5 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer transition-all group">
              <Upload className="w-5 h-5 text-indigo-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] text-slate-400 group-hover:text-slate-200">
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
              <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl mt-2">
                <span className="text-[10px] text-indigo-300 font-medium">
                  قالب سربرگ سفارشی فعال است
                </span>
                <button
                  onClick={resetSarbargBg}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
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
          <p className="text-[10px] text-slate-500 leading-relaxed">
            لوگوی همکار در صفحه جلد مستقیماً رو‌به‌روی لوگوی اصلی قرار می‌گیرد.
          </p>

          <label className="flex flex-col items-center justify-center py-6 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer transition-all group">
            <Upload className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] text-slate-400 group-hover:text-slate-200">
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
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
              <span className="text-[11px] text-emerald-400 font-bold">
                لوگو همکار فعال است
              </span>
              <button
                onClick={resetPartnerLogo}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> حذف لوگو
              </button>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl text-[10px] leading-relaxed">
              <EyeOff className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                در صورت عدم بارگذاری لوگو، کادر مربوطه در نسخه نهایی PDF خروجی مخفی خواهد شد.
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-4 bg-indigo-950/20 border border-indigo-900/35 rounded-2xl space-y-2">
        <div className="flex gap-2 items-start text-indigo-300">
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400 animate-pulse" />
          <p className="text-[11px] leading-relaxed">
            <strong>نکته کاربردی:</strong> کلید{" "}
            <span className="text-amber-400 font-bold">حالت جابجایی</span> را در بالا فعال بگذارید تا بتوانید المان‌های متنی و لوگو را با درگ‌ کردن جابجا کنید.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
