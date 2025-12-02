import { getAdminToken } from "./auth";

const API_URL =
  import.meta.env.VITE_COMPANY_DOCS_API_URL ||
  "https://trafosanf-remake.vercel.app/api/company-docs";

export interface ProcessedPDF {
  name: string;
  text: string;
  file: File;
  size: number;
}

export interface CompanySummary {
  companyId: string;
  displayName: string;
  updatedAt?: string;
}

export interface CompanyDocsResponse {
  companyId: string;
  displayName: string;
  fileNames: string[];
  combinedText: string;
  shareUrl: string;
}

export interface PublishPayload {
  companyId: string;
  displayName: string;
  files: Array<{
    name: string;
    text: string;
    base64: string;
  }>;
  replaceExisting?: boolean;
}

const fetchJson = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  const data = await response.json();

  if (!response.ok) {
    const error = data?.error || response.statusText;
    throw new Error(error);
  }

  return data;
};

export const listCompanies = async (): Promise<CompanySummary[]> => {
  const data = await fetchJson(`${API_URL}?list=companies`);
  return data.companies || [];
};

export const fetchCompanyDocuments = async (
  companyId: string
): Promise<CompanyDocsResponse> => {
  const data = await fetchJson(`${API_URL}?companyId=${encodeURIComponent(companyId)}`);
  return data;
};

export const publishCompanyDocuments = async (payload: PublishPayload) => {
  const adminToken = getAdminToken();
  if (!adminToken) {
    throw new Error("Admin-Token fehlt. Bitte erneut anmelden.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": adminToken,
    },
    body: JSON.stringify({
      ...payload,
      replaceExisting: payload.replaceExisting ?? true,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || response.statusText);
  }

  return data;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result.replace(/^data:application\/pdf;base64,/, ""));
      } else if (result instanceof ArrayBuffer) {
        const bytes = new Uint8Array(result);
        let binary = "";
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        resolve(btoa(binary));
      } else {
        reject(new Error("Konnte Datei nicht lesen"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

