# KI Vergabe

Intelligente Lösungen für Beschaffung - Chat-basierte Q&A-Plattform mit KI-Unterstützung.

## Features

- 🤖 KI-gestützte Beantwortung von Fragen basierend auf PDF-Dokumenten
- 📄 PDF-Upload und automatische Textextraktion
- 💬 Interaktive Chat-Oberfläche
- 📊 Backlog-System zur Nachverfolgung aller Gespräche
- 🔒 Preisinformationen werden über Kontaktformular angefordert
- 🏷️ Sharebare Company-Links mit eigenen PDF-Sets (z. B. `https://ki-vergabe.de/?company=acme`)

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI:** shadcn/ui, Tailwind CSS
- **Routing:** React Router
- **AI:** OpenAI API (GPT-3.5-turbo)
- **PDF Processing:** PDF.js
- **Hosting:** GitHub Pages

## Lokale Entwicklung

### Voraussetzungen

- Node.js 18+ und npm

### Installation

```bash
# Repository klonen
git clone https://github.com/9qdbds6xqc-png/trafosanf-remake.git
cd trafosanf-remake

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die Anwendung läuft dann unter `http://localhost:8080`

### Umgebungsvariablen

Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
VITE_OPENAI_API_KEY=dein-openai-api-key
VITE_AUTH_API_URL=https://trafosanf-remake.vercel.app/api/auth
VITE_COMPANY_DOCS_API_URL=https://trafosanf-remake.vercel.app/api/company-docs
VITE_ADMIN_TOKEN_SALT=ki-vergabe-admin-token
```

Siehe `.env.example` für ein Beispiel.

### Company-spezifische Links

1. Öffne `/upload`, gib das Admin-Passwort ein und wähle oder erstelle ein Unternehmen (Slug + Anzeigename).
2. Lade die PDFs hoch. Sie werden serverseitig in Supabase Storage gespeichert, der extrahierte Text landet in der Tabelle `company_documents`.
3. Klicke auf „Company-Link aktualisieren“ – der Link (`https://ki-vergabe.de/?company=<slug>`) wird kopiert und kann geteilt werden.
4. Empfänger sehen nur den Chat mit vorkonfigurierten Dokumenten. PDF-Dateien selbst bleiben verborgen.

> 🔐 Für den Upload werden die Environment-Variablen `SUPABASE_SERVICE_ROLE_KEY`, `COMPANY_PDF_BUCKET` und `ADMIN_TOKEN_SALT` benötigt (siehe [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)).

## Deployment

Die Website wird automatisch über GitHub Actions auf GitHub Pages deployed.

- **Production URL:** https://ki-vergabe.de
- **GitHub Pages URL:** https://9qdbds6xqc-png.github.io/trafosanf-remake/

### Deployment Workflow

Bei jedem Push auf `main` wird automatisch:
1. Das Projekt gebaut
2. Die Distribution auf GitHub Pages deployed

## Projektstruktur

```
src/
├── components/     # React Komponenten
│   ├── ChatInterface.tsx
│   ├── ChatMessage.tsx
│   ├── PDFUpload.tsx
│   └── PricingRequestDialog.tsx
├── lib/            # Utilities
│   ├── openai.ts       # OpenAI API Integration
│   ├── pdfExtractor.ts # PDF Text Extraction
│   └── backlog.ts      # Backlog Management
└── pages/          # Seiten
    ├── Questions.tsx   # Hauptseite (Chat)
    └── Backlog.tsx     # Backlog Übersicht
```

## Dokumentation

- [Chat Setup Guide](./CHAT_SETUP.md)
- [Deployment Guide](./DEPLOYMENT_KI_VERGABE.md)
- [Supabase Setup inkl. Company-Dokumente](./SUPABASE_SETUP.md)

## Lizenz

Proprietary - Alle Rechte vorbehalten
