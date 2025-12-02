# Supabase Setup - Schritt für Schritt Anleitung

Diese Anleitung führt dich durch das komplette Setup von Supabase für die Backlog-Datenbank.

---

## Schritt 1: Supabase Account erstellen

1. **Öffne:** https://supabase.com
2. **Klicke:** "Start your project" (oben rechts, grüner Button)
3. **Melde dich an:**
   - Empfohlen: "Continue with GitHub" (einfachste Option)
   - Oder: E-Mail + Passwort
4. **Warte auf Bestätigung** (E-Mail falls nötig)

---

## Schritt 2: Neues Projekt erstellen

1. **Nach dem Login:** Du siehst das Dashboard
2. **Klicke:** "New Project" (grüner Button)
3. **Fülle aus:**
   - **Organization:** Wähle "Personal" (oder erstelle eine neue)
   - **Name:** `produkt-assistent-backlog` (oder ein anderer Name)
   - **Database Password:** 
     - Erstelle ein SICHERES Passwort
     - **WICHTIG:** Notiere dir dieses Passwort! Du brauchst es später.
     - Beispiel: `MySecure123!Pass`
   - **Region:** Wähle die nächstgelegene (z.B. "West EU" für Deutschland)
   - **Pricing Plan:** "Free"
4. **Klicke:** "Create new project" (unten)
5. **WARTE:** Projekt wird erstellt (dauert 1-2 Minuten)

---

## Schritt 3: Datenbank-Tabelle erstellen

1. **Im Supabase Dashboard:** Warte bis "Your project is ready" erscheint
2. **Klicke:** "Continue to project" oder gehe zum Dashboard
3. **Links im Menü:** Klicke auf **"SQL Editor"** (Icon: </>)
4. **Klicke:** "New query" (rechts oben)
5. **Füge diesen SQL-Code ein:**

```sql
-- Create backlog entries table
CREATE TABLE IF NOT EXISTS backlog_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  company_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pdf_file_name TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_pricing_question BOOLEAN DEFAULT FALSE,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_company_id ON backlog_entries(company_id);
CREATE INDEX IF NOT EXISTS idx_timestamp ON backlog_entries(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_session_id ON backlog_entries(session_id);

-- Enable Row Level Security
ALTER TABLE backlog_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (for easy access)
CREATE POLICY "Allow all operations" ON backlog_entries
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

6. **Klicke:** "Run" (rechts unten, oder drücke `Ctrl+Enter` / `Cmd+Enter`)
7. **Prüfe:** Du solltest "Success. No rows returned" sehen

---

## Schritt 4: API Keys holen

1. **Links im Menü:** Klicke auf **"Settings"** (Zahnrad-Icon)
2. **Klicke:** "API" (unter Settings)
3. **Kopiere diese Werte:**

   **a) Project URL:**
   - Unter "Project URL" siehst du: `https://xxxxx.supabase.co`
   - **Kopiere die komplette URL** (z.B. `https://abcdefghijklmnop.supabase.co`)
   - Notiere sie: `_____________________________`

   **b) anon public key:**
   - Unter "Project API keys" → "anon public"
   - **Klicke auf das Augensymbol** (um das Passwort zu zeigen)
   - **Kopiere den langen Key** (beginnt meist mit `eyJhbGc...`)
   - Notiere ihn: `_____________________________`

---

## Schritt 5: Vercel Projekt erstellen (für API)

Falls du noch kein Vercel-Projekt hast:

1. **Öffne:** https://vercel.com
2. **Klicke:** "Sign Up" oder "Log In"
3. **Melde dich mit GitHub an** (empfohlen)
4. **Klicke:** "Add New..." → "Project"
5. **Wähle:** Repository `9qdbds6xqc-png/trafosanf-remake`
6. **Klicke:** "Import"
7. **Warte** bis das Projekt importiert ist

**Falls Vercel-Projekt bereits existiert:** Überspringe zu Schritt 6

---

## Schritt 6: Environment Variables in Vercel setzen

1. **Im Vercel Dashboard:** Gehe zu deinem Projekt
2. **Klicke:** "Settings" (oben)
3. **Klicke:** "Environment Variables" (links)
4. **Füge diese 3 Variablen hinzu:**

   **Variable 1:**
   - **Key:** `SUPABASE_URL`
   - **Value:** Deine Project URL aus Schritt 4a (z.B. `https://abcdefghijklmnop.supabase.co`)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development (alle ankreuzen)
   - **Klicke:** "Save"

   **Variable 2:**
   - **Key:** `SUPABASE_ANON_KEY`
   - **Value:** Dein anon public key aus Schritt 4b
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - **Klicke:** "Save"

   **Variable 3:**
   - **Key:** `SUPABASE_TABLE`
   - **Value:** `backlog_entries`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - **Klicke:** "Save"

---

## Schritt 7: Vercel Deployment auslösen

Nach dem Setzen der Environment Variables:

1. **Im Vercel Dashboard:** Gehe zu "Deployments" (oben)
2. **Klicke** auf den neuesten Deployment
3. **Klicke:** "Redeploy" (rechts oben)
4. **Wähle:** "Use existing Build Cache"
5. **Klicke:** "Redeploy"
6. **Warte** bis Deployment fertig ist (1-2 Minuten)

**Oder:** Push einen neuen Commit, dann deployed Vercel automatisch

---

## Schritt 8: Vercel API URL finden

1. **Im Vercel Dashboard:** Gehe zu "Settings" → "Domains"
2. **Du siehst:** Eine URL wie `trafosanf-remake-xxxxx.vercel.app`
3. **Notiere:** `https://trafosanf-remake-xxxxx.vercel.app/api/backlog`
   - Das ist deine Backlog API URL

**Oder:** Gehe zu "Deployments" → Klicke auf den neuesten → URL steht oben

---

## Schritt 9: API URL zu GitHub Secrets hinzufügen

1. **Öffne:** https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions
2. **Klicke:** "New repository secret" (oben rechts)
3. **Fülle aus:**
   - **Name:** `VITE_BACKLOG_API_URL`
   - **Secret:** Deine API URL aus Schritt 8 (z.B. `https://trafosanf-remake-xxxxx.vercel.app/api/backlog`)
4. **Klicke:** "Add secret"

---

## Schritt 10: GitHub Pages Workflow neu starten

1. **Öffne:** https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
2. **Links:** Klicke auf "Deploy to GitHub Pages"
3. **Rechts oben:** Klicke "Run workflow"
4. **Wähle:** Branch: `main`
5. **Klicke:** "Run workflow"
6. **Warte** bis der Workflow grün ist (2-3 Minuten)

---

## Schritt 11: Testen

1. **Öffne:** https://ki-vergabe.de
2. **Lade ein PDF hoch** (via `/upload`)
3. **Stelle eine Frage** im Chat
4. **Gehe zu Supabase Dashboard:**
   - **"Table Editor"** (links im Menü)
   - **Klicke:** `backlog_entries`
5. **Du solltest:** Den neuen Eintrag sehen! ✅

---

## Schritt 12: Company-Tracking nutzen (optional)

Wenn du die Website an verschiedene Unternehmen weiterleitest:

1. **Füge `?company=NAME` zur URL hinzu:**
   - Beispiel: `https://ki-vergabe.de?company=AcmeCorp`
2. **Alle Einträge** werden mit dieser Company-ID gespeichert
3. **In Supabase** kannst du nach `company_id` filtern:
   - Table Editor → Filter → `company_id` = `AcmeCorp`

---

## Troubleshooting

### Fehler: "Failed to fetch"
- Prüfe ob `VITE_BACKLOG_API_URL` in GitHub Secrets gesetzt ist
- Prüfe ob Vercel Deployment erfolgreich war
- Prüfe Vercel Function Logs (Deployments → Function Logs)

### Keine Einträge in Supabase?
- Prüfe ob die Tabelle korrekt erstellt wurde (SQL Editor)
- Prüfe ob Environment Variables in Vercel gesetzt sind
- Prüfe Browser-Konsole für Fehler

### Vercel Function Fehler?
- Gehe zu Vercel Dashboard → Deployments → Function Logs
- Prüfe die Fehlermeldung
- Stelle sicher, dass alle Environment Variables gesetzt sind

---

## Checkliste

- [ ] Supabase Account erstellt
- [ ] Projekt erstellt
- [ ] Tabelle `backlog_entries` erstellt
- [ ] API Keys kopiert
- [ ] Environment Variables in Vercel gesetzt (3x)
- [ ] Vercel Deployment erfolgreich
- [ ] API URL zu GitHub Secrets hinzugefügt
- [ ] GitHub Workflow neu gestartet
- [ ] Getestet: Frage gestellt → Eintrag in Supabase sichtbar

---

## Hilfe

Falls etwas nicht funktioniert:
- Prüfe die Logs in Vercel (Function Logs)
- Prüfe Browser-Konsole (F12)
- Prüfe Supabase Dashboard → Logs

Viel Erfolg! 🚀

