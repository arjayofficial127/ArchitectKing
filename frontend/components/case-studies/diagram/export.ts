// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Exports SVG element to SVG string
 */
export function exportToSVG(svgElement: SVGSVGElement): string {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  
  // Add XML declaration
  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
  return `${xmlDeclaration}\n${svgString}`;
}

/**
 * Exports SVG element to PNG data URL
 */
export async function exportToPNG(
  svgElement: SVGSVGElement,
  scale: number = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const svgString = exportToSVG(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/png');
      URL.revokeObjectURL(url);
      resolve(dataUrl);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };
    
    img.src = url;
  });
}

/**
 * Downloads a file with the given content and filename
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads PNG from data URL
 */
export function downloadPNG(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
