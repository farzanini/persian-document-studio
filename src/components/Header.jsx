
import { FileText, Unlock, Lock, RefreshCw, Download } from "lucide-react";

const Header = ({ dragMode, setDragMode, generatePDF, isGenerating }) => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex flex-col sm:flex-row gap-4 items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-md shadow-indigo-500/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-100 leading-tight">
            استودیو طراحی و تولید مدارک تجاری (نسخه هوشمند)
          </h1>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
            تولید خودکار صفحات اضافه در صورت سرریز متن بر روی قالب رسمی
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDragMode(!dragMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            dragMode
              ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/5 hover:bg-amber-400"
              : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          {dragMode ? (
            <Unlock className="w-3.5 h-3.5" />
          ) : (
            <Lock className="w-3.5 h-3.5" />
          )}
          {dragMode ? "حالت جابجایی با ماوس: فعال" : "قفل کردن موقعیت‌ها"}
        </button>

        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          دانلود نسخه PDF
        </button>
      </div>
    </header>
  );
};

export default Header;
