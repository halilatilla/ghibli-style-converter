import { useState } from "react";

export function useImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");

  const handleImageSelected = (base64: string, type: string) => {
    setSelectedImage(base64);
    setMimeType(type);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setMimeType("image/jpeg");
  };

  return {
    selectedImage,
    mimeType,
    handleImageSelected,
    clearImage,
  };
}
