import React, { useState } from "react";

function App() {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    if (!theme) return;
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch("https://colorbook.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `black and white line art of ${theme}, coloring book style`,
        }),
      });

      const data = await res.json();

      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        throw new Error(data?.error || "No image returned.");
      }
    } catch (err) {
      console.error(err);
      alert("Image generation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
        AI Coloring Book Generator
      </h1>

      <div style={{ marginTop: 20, maxWidth: 400, margin: "0 auto" }}>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter theme (e.g. dinosaurs, jungle, cats)"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={generateImage}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {imageUrl && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <img
            src={imageUrl}
            alt="Generated"
            style={{ maxWidth: "100%", border: "1px solid #ccc", padding: 10 }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
