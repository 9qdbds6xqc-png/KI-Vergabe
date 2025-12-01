/**
 * PDF Content Extractor using PDF.js
 */

import * as pdfjsLib from 'pdfjs-dist';

// Initialize worker - try multiple methods for compatibility
let workerInitialized = false;

const initializeWorker = () => {
  if (workerInitialized) return;
  
  try {
    // Method 1: Use unpkg CDN (most reliable)
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    workerInitialized = true;
  } catch (error) {
    console.warn('Failed to set worker source, trying alternative...', error);
    // Method 2: Fallback to jsdelivr CDN
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }
};

// Initialize worker on import
initializeWorker();

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Ensure worker is initialized
    initializeWorker();
    
    console.log('Starting PDF extraction for file:', file.name);
    console.log('Worker source:', pdfjsLib.GlobalWorkerOptions.workerSrc);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('File loaded, arrayBuffer size:', arrayBuffer.byteLength);
    
    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0, // Suppress warnings
      useWorkerFetch: false, // Disable worker fetch to avoid CORS issues
      isEvalSupported: false, // Disable eval for security
    });
    
    const pdf = await loadingTask.promise;
    console.log('PDF loaded, number of pages:', pdf.numPages);
    
    if (pdf.numPages === 0) {
      throw new Error('Die PDF-Datei enthält keine Seiten.');
    }
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`Extracting text from page ${pageNum}/${pdf.numPages}...`);
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine all text items from the page
      const pageText = textContent.items
        .filter((item: any) => item.str && item.str.trim().length > 0)
        .map((item: any) => item.str)
        .join(' ');
      
      if (pageText.trim().length > 0) {
        fullText += pageText + '\n\n';
      }
    }
    
    const extractedText = fullText.trim();
    console.log('PDF extraction completed. Text length:', extractedText.length);
    
    if (extractedText.length === 0) {
      throw new Error('Die PDF-Datei konnte keine Text-Inhalte extrahiert werden. Möglicherweise ist es ein gescanntes Bild-PDF.');
    }
    
    return extractedText;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        throw new Error('Die PDF-Datei ist beschädigt oder ungültig. Bitte versuchen Sie eine andere Datei.');
      }
      if (error.message.includes('worker')) {
        throw new Error('PDF-Reader konnte nicht initialisiert werden. Bitte laden Sie die Seite neu und versuchen Sie es erneut.');
      }
      if (error.message.includes('password')) {
        throw new Error('Die PDF-Datei ist passwortgeschützt. Bitte entfernen Sie das Passwort und versuchen Sie es erneut.');
      }
      
      // Return the error message if it's already user-friendly
      if (error.message.includes('PDF') || error.message.includes('Datei')) {
        throw error;
      }
    }
    
    throw new Error(
      `Fehler beim Lesen der PDF-Datei: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}. ` +
      'Bitte stellen Sie sicher, dass die Datei nicht beschädigt ist und versuchen Sie es erneut.'
    );
  }
}

/**
 * Search through PDF content for relevant sections based on keywords
 */
export function findRelevantSections(text: string, question: string, maxSections: number = 3): string {
  const questionLower = question.toLowerCase();
  const keywords = questionLower.split(/\s+/).filter(word => word.length > 3);
  
  const sentences = text.split(/[.!?]+\s+/);
  const relevantSentences: string[] = [];
  
  for (const sentence of sentences) {
    const sentenceLower = sentence.toLowerCase();
    const relevanceScore = keywords.reduce((score, keyword) => {
      return score + (sentenceLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (relevanceScore > 0) {
      relevantSentences.push(sentence);
    }
  }
  
  // Return most relevant sections (up to maxSections sentences)
  return relevantSentences.slice(0, maxSections).join('. ') + '.';
}

