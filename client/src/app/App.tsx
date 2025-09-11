import { useState } from "react";
import {
  Container,
} from "@mui/material";

import UploadForm from "./components/UploadForm";
import ResultsGrid from "./components/ResultsGrid";

// -------------------
// API Service
// -------------------
class ImageService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async resizeImage(files: File[], sizes: string, format: string): Promise<ImageResult[]> {
    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    formData.append("sizes", sizes);
    formData.append("format", format);

    const response = await fetch(`${this.baseUrl}/resize`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to resize image");
    }

    const data = await response.json();
    return data.images as ImageResult[];
  }
}

const App = () => {
  const [results, setResults] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(false);
  const service = new ImageService("http://localhost:4000");

  const handleResize = async (files: File[], sizes: string, format: string) => {
    try {
      setLoading(true);
      const images = await service.resizeImage(files, sizes, format);
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
