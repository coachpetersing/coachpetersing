"use client";

export default function PrintButton() {
  return (
    <button type="button" className="btn-primary min-h-[44px] px-5" onClick={() => window.print()}>
      Print
    </button>
  );
}
