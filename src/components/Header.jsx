import React from "react";
import { FileText, Unlock, Lock, RefreshCw, Download } from "lucide-react";

const Header = ({ dragMode, setDragMode, generatePDF, isGenerating }) => {
  return (
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
  );
};

export default Header;
