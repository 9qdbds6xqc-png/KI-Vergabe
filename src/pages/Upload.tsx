import { PDFUpload, UploadedPDF } from "@/components/PDFUpload";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PasswordProtection } from "@/components/PasswordProtection";
import { Upload, CheckCircle, Link2, RefreshCw, Copy, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { savePDFs, getPDFs } from "@/lib/pdfStorage";
import { isAuthenticated } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  CompanySummary,
  fileToBase64,
  listCompanies,
  publishCompanyDocuments,
} from "@/lib/companyDocs";

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasPDFs, setHasPDFs] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [companyDisplayName, setCompanyDisplayName] = useState("");
  const [processedFiles, setProcessedFiles] = useState<UploadedPDF[]>([]);
  const [currentPDFNames, setCurrentPDFNames] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
    }
  }, []);

  const shareUrl = useMemo(() => {
    if (!selectedCompanyId) return "";
    const base = typeof window !== "undefined" ? window.location.origin : "https://ki-vergabe.de";
    return `${base.replace(/\/$/, "")}/?company=${selectedCompanyId}`;
  }, [selectedCompanyId]);

  useEffect(() => {
    const pdfs = getPDFs();
    setHasPDFs(pdfs !== null && pdfs.text.length > 0);
    if (pdfs?.fileNames) {
      setCurrentPDFNames(pdfs.fileNames);
    }
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoadingCompanies(true);
        const data = await listCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Company fetch error:", error);
        toast({
          title: "Fehler beim Laden der Unternehmen",
          description: error instanceof Error ? error.message : "Bitte später erneut versuchen.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, [toast]);

  const handleCompanySelection = (companyId: string) => {
    setSelectedCompanyId(companyId);
    const company = companies.find((c) => c.companyId === companyId);
    setCompanyDisplayName(company?.displayName || "");
    setShareLink("");
  };

  const handlePDFLoaded = (data: { text: string; fileNames: string[]; files: UploadedPDF[] }) => {
    setProcessedFiles(data.files);
    setCurrentPDFNames(data.fileNames);
    setHasPDFs(data.text.length > 0);
    savePDFs(data.text, data.fileNames);
    setShareLink("");
  };

  const handleContinueToChat = () => {
    navigate('/');
  };

  if (!authenticated) {
    return <PasswordProtection onSuccess={() => setAuthenticated(true)} pageName="Upload" />;
  }

  const handlePublish = async () => {
    if (!selectedCompanyId || !companyDisplayName) {
      toast({
        title: "Unternehmen auswählen",
        description: "Bitte wählen oder erstellen Sie zuerst ein Unternehmen.",
        variant: "destructive",
      });
      return;
    }

    if (processedFiles.length === 0) {
      toast({
        title: "Keine PDFs ausgewählt",
        description: "Bitte laden Sie mindestens ein PDF hoch.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPublishing(true);
      const filesPayload = await Promise.all(
        processedFiles.map(async (file) => ({
          name: file.name,
          text: file.text,
          base64: await fileToBase64(file.file),
        }))
      );

      const response = await publishCompanyDocuments({
        companyId: selectedCompanyId,
        displayName: companyDisplayName,
        files: filesPayload,
        replaceExisting: true,
      });

      const link = response.shareUrl || shareUrl;
      setShareLink(link);

      toast({
        title: "Erfolgreich gespeichert",
        description: "Der Company-Link wurde aktualisiert und kann jetzt geteilt werden.",
      });

      if (link) {
        try {
          await navigator.clipboard.writeText(link);
          toast({
            title: "Link kopiert",
            description: link,
          });
        } catch (error) {
          console.warn("Clipboard error:", error);
        }
      }

      const updatedCompanies = await listCompanies();
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Publish error:", error);
      toast({
        title: "Upload fehlgeschlagen",
        description: error instanceof Error ? error.message : "Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            PDF-Dokumente hochladen
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Laden Sie ein oder mehrere PDF-Dokumente hoch, um Fragen basierend auf diesen Dokumenten zu stellen.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">1. Unternehmen wählen</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCompanyDisplayName("");
                  setSelectedCompanyId("");
                  setShareLink("");
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Neue Auswahl
              </Button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Bestehende Unternehmen</label>
              <select
                className="w-full border border-border rounded-md px-3 py-2 bg-background"
                disabled={isLoadingCompanies}
                value={selectedCompanyId}
                onChange={(e) => handleCompanySelection(e.target.value)}
              >
                <option value="">-- Unternehmen auswählen --</option>
                {companies.map((company) => (
                  <option key={company.companyId} value={company.companyId}>
                    {company.displayName} ({company.companyId})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                  <input
                    type="text"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background"
                    value={companyDisplayName}
                    onChange={(e) => setCompanyDisplayName(e.target.value)}
                    placeholder="z. B. ACME GmbH"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Slug</label>
                  <input
                    type="text"
                    className="w-full border border-border rounded-md px-3 py-2 bg-background"
                    value={selectedCompanyId}
                    onChange={(e) => {
                      setSelectedCompanyId(e.target.value.toLowerCase());
                      setShareLink("");
                    }}
                    placeholder="acme"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Der Slug bestimmt den geteilten Link: <code>?company=&lt;slug&gt;</code>
              </p>
            </div>
          </div>

          {/* Upload Component */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <PDFUpload 
              onPDFLoaded={handlePDFLoaded}
              currentPDFNames={currentPDFNames}
            />
          </div>

          {/* Status and Continue Button */}
          {hasPDFs && (
            <div className="border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    PDF(s) erfolgreich hochgeladen!
                  </h3>
                  <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                    {currentPDFNames.length === 1 
                      ? `Das Dokument "${currentPDFNames[0]}" ist bereit.`
                      : `${currentPDFNames.length} Dokumente sind bereit: ${currentPDFNames.join(', ')}`
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleContinueToChat}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Zum Chat gehen
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handlePublish}
                      disabled={isPublishing || !selectedCompanyId || processedFiles.length === 0}
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Speichern...
                        </>
                      ) : (
                        "Company-Link aktualisieren"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {shareUrl && (
            <div className="border border-border rounded-lg p-6 bg-accent/5 space-y-3">
              <div className="flex items-center gap-2 text-accent-foreground">
                <Link2 className="h-4 w-4" />
                <p className="font-semibold">Share Link</p>
              </div>
              <p className="text-sm text-muted-foreground break-all">{shareLink || shareUrl}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(shareLink || shareUrl)
                      .then(() =>
                        toast({
                          title: "Link kopiert",
                          description: shareLink || shareUrl,
                        })
                      )
                      .catch(() =>
                        toast({
                          title: "Kopieren fehlgeschlagen",
                          description: "Bitte kopieren Sie den Link manuell.",
                          variant: "destructive",
                        })
                      );
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Link kopieren
                </Button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="border border-border rounded-lg p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              <strong>Tipp:</strong> Sie können mehrere PDF-Dateien gleichzeitig hochladen, 
              indem Sie mehrere Dateien auswählen oder per Drag & Drop hinzufügen. 
              Nach dem Hochladen können Sie zum Chat zurückkehren und Fragen stellen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;

