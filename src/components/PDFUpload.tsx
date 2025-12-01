import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { extractTextFromPDF } from "@/lib/pdfExtractor";

interface PDFUploadProps {
  onPDFLoaded: (text: string, fileName: string) => void;
  currentPDFName?: string;
  className?: string;
}

export const PDFUpload = ({ onPDFLoaded, currentPDFName, className }: PDFUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Bitte wählen Sie eine PDF-Datei aus.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Die PDF-Datei ist zu groß. Maximum: 10MB");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      
      if (!text || text.trim().length === 0) {
        setError("Die PDF-Datei konnte nicht gelesen werden oder ist leer.");
        setIsProcessing(false);
        return;
      }

      onPDFLoaded(text, file.name);
      setError(null);
    } catch (err) {
      console.error("Error processing PDF:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "Fehler beim Verarbeiten der PDF-Datei. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onPDFLoaded("", "");
    setError(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {currentPDFName ? (
        <div className="flex items-center gap-2 p-3 border border-border rounded-md bg-muted/50">
          <FileText className="h-4 w-4 text-accent flex-shrink-0" />
          <span className="text-sm flex-1 truncate">{currentPDFName}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
            isDragging
              ? "border-accent bg-accent/5"
              : "border-muted-foreground/25 hover:border-accent/50",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
            disabled={isProcessing}
          />

          {isProcessing ? (
            <>
              <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-accent" />
              <p className="text-sm text-muted-foreground">
                PDF wird verarbeitet...
              </p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                PDF-Dokument hochladen
              </p>
              <p className="text-xs text-muted-foreground">
                Klicken Sie hier oder ziehen Sie eine PDF-Datei hinein
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Maximal 10MB
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};

