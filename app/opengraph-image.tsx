import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt =
  "GhibliStyle Converter - Transform Photos into Studio Ghibli Art";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background:
            "linear-gradient(135deg, #1C2E1C 0%, #2F4538 40%, #3A4F3D 70%, #1A2818 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            width: "120px",
            height: "120px",
            borderRadius: "60px",
            background: "linear-gradient(135deg, #5B8C5A, #B8D8BA)",
            opacity: 0.6,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            width: "150px",
            height: "150px",
            borderRadius: "75px",
            background: "linear-gradient(135deg, #FFD966, #FFF9E6)",
            opacity: 0.5,
            display: "flex",
          }}
        />

        {/* Logo/Icon placeholder */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #5B8C5A, #B8D8BA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "50px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            ✨
          </div>
        </div>

        {/* Main text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #B8D8BA, #FFD966)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          GhibliStyle Converter
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#B8D8BA",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Transform your photos into magical Studio Ghibli-style artwork
        </div>

        {/* Features badges */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              background: "rgba(91, 140, 90, 0.3)",
              borderRadius: "30px",
              padding: "15px 30px",
              fontSize: "24px",
              color: "#B8D8BA",
              border: "2px solid rgba(184, 216, 186, 0.4)",
              display: "flex",
            }}
          >
            🎨 AI-Powered
          </div>
          <div
            style={{
              background: "rgba(91, 140, 90, 0.3)",
              borderRadius: "30px",
              padding: "15px 30px",
              fontSize: "24px",
              color: "#B8D8BA",
              border: "2px solid rgba(184, 216, 186, 0.4)",
              display: "flex",
            }}
          >
            🎬 5 Film Themes
          </div>
          <div
            style={{
              background: "rgba(91, 140, 90, 0.3)",
              borderRadius: "30px",
              padding: "15px 30px",
              fontSize: "24px",
              color: "#B8D8BA",
              border: "2px solid rgba(184, 216, 186, 0.4)",
              display: "flex",
            }}
          >
            ⚡ Instant Results
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
