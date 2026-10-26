import QRCode from "qrcode";
import { env } from "./env";

/** The short link a rep's QR code points at. */
export const repLink = (code: string) => `${env.siteUrl()}/r/${code}`;

/** Inline SVG markup for a QR code, dark on transparent. */
export async function qrSvg(text: string, dark = "#0E1A12") {
  return QRCode.toString(text, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark, light: "#0000" } });
}

/** A 1024px PNG as a data URL, for downloading. */
export async function qrPng(text: string) {
  return QRCode.toDataURL(text, { width: 1024, margin: 2, errorCorrectionLevel: "M", color: { dark: "#0E1A12", light: "#FFFFFF" } });
}
