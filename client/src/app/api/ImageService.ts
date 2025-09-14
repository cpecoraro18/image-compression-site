import type { ImageResult } from "../types/ImageResult";
// -------------------
// API Service (Module Functions)
// -------------------

export async function resizeImage(
  baseUrl: string,
  files: File[],
  sizes: string,
  format: string
): Promise<ImageResult[]> {
  const formData = new FormData();
  files.forEach(file => formData.append("images", file));
  formData.append("sizes", sizes);
  formData.append("format", format);

  const response = await fetch(`${baseUrl}/resize`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to resize image");
  }

  const data = await response.json();
  return data.images as ImageResult[];
}
