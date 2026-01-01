export function validateGenerationRequest(
  selectedImage: string | null,
  prompt: string
): { valid: boolean; error?: string } {
  if (!selectedImage) {
    return { valid: false, error: "Please upload an image first!" };
  }

  const trimmedPrompt = prompt.trim();
  if (!trimmedPrompt) {
    return { valid: false, error: "Please enter a prompt to guide the style." };
  }

  return { valid: true };
}
