import { useState } from "react";
import { Container } from "@mui/material";

import UploadForm from "./components/UploadForm";
import ResultsGrid from "./components/ResultsGrid";

import resizeImage from "../api/ImageService";

import type { ImageResult } from "../types/ImageResult";

const App = () => {
  const [results, setResults] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleResize = async (files: File[], sizes: string, format: string) => {
    try {
      setLoading(true);
      const images = await resizeImage("http://localhost:4000", files, sizes, format);
      setResults(images);
    } catch (err) {
      console.error(err);
      alert("Failed to resize image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        minWidth: "85vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <UploadForm onResize={handleResize} disabled={loading} />
      {results.length > 0 && <ResultsGrid results={results} />}
    </Container>
  );
};

export default App;
