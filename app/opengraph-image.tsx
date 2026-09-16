import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Static 1200x630 share card: brand only, no photos, no numbers.
export const alt = `${site.brand.wordmark} - ${site.brand.strapline}, ${site.serviceArea}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#1B1C1A",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={96} alt="" style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: 2 }}>{site.brand.wordmark}</div>
            <div style={{ fontSize: 20, letterSpacing: 6, color: "#A9ABA5", marginTop: 6 }}>{site.brand.strapline}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: 72, height: 3, background: "#E0A526" }} />
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{site.brand.tagline}</div>
          <div style={{ fontSize: 26, color: "#C9CBC5" }}>
            {`Construction materials and civil construction across ${site.serviceArea}.`}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9A9C96", letterSpacing: 2 }}>
          <span>{site.phone.display}</span>
          <span>GST REGISTERED</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
