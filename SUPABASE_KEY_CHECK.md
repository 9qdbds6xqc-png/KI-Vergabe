# Supabase Key Prüfung

## Wichtiger Unterschied: anon vs service_role Key

### ✅ RICHTIG: `anon` Key verwenden
- **Name in Supabase:** "anon" oder "anon public"
- **Beginnt mit:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Verwendung:** Für öffentliche API-Zugriffe mit RLS Policies
- **Sicherheit:** Wird durch RLS Policies geschützt

### ❌ FALSCH: `service_role` Key verwenden
- **Name in Supabase:** "service_role" oder "service_role secret"
- **Beginnt mit:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (sieht ähnlich aus!)
- **Verwendung:** Umgeht RLS, sollte nur serverseitig verwendet werden
- **Sicherheit:** Sehr gefährlich, wenn öffentlich exponiert!

## So findest du den richtigen Key:

### Schritt 1: Gehe zu Supabase Dashboard
1. Öffne dein Supabase Projekt
2. Gehe zu "Settings" (Zahnrad-Symbol)
3. Klicke auf "API" im linken Menü

### Schritt 2: Finde den `anon` Key
- Unter "Project API keys" findest du:
  - **anon public** - Das ist der richtige Key!
  - **service_role** - NICHT verwenden!

### Schritt 3: Kopiere den `anon` Key
- Klicke auf das "Copy" Symbol neben "anon public"
- Der Key sollte so aussehen: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxx`

## So setzt du den Key in Vercel:

### Option 1: Über Vercel Dashboard
1. Gehe zu Vercel Dashboard → Dein Projekt
2. Gehe zu "Settings" → "Environment Variables"
3. Suche nach `SUPABASE_ANON_KEY`
4. Klicke auf "Edit"
5. Füge den **anon** Key ein (nicht den service_role!)
6. Klicke auf "Save"

### Option 2: Über GitHub CLI
```bash
cd /Users/davidwulff/RepoPrompt/trafosanf-remake
gh secret set SUPABASE_ANON_KEY --body "DEIN_ANON_KEY_HIER"
```

**WICHTIG:** Stelle sicher, dass du den **anon** Key verwendest, nicht den service_role!

## So prüfst du, welcher Key aktuell gesetzt ist:

### Über Vercel Logs:
Nach einem Request sollten die Logs zeigen:
- `hasSupabaseKey: true` - Key ist gesetzt
- Aber wir können nicht sehen, welcher Key es ist (aus Sicherheitsgründen)

### Über Supabase Logs:
1. Gehe zu Supabase Dashboard → "Logs" → "API Logs"
2. Prüfe die letzten Requests
3. Wenn du "service_role" siehst, verwendest du den falschen Key!

## Häufige Fehler:

### ❌ Fehler 1: Service Role Key verwendet
**Symptom:** 405 oder 403 Fehler, obwohl Tabelle und Policies korrekt sind
**Lösung:** Verwende den `anon` Key statt `service_role`

### ❌ Fehler 2: Falscher Key kopiert
**Symptom:** 401 Unauthorized
**Lösung:** Stelle sicher, dass du den kompletten Key kopiert hast

### ❌ Fehler 3: Key mit Leerzeichen
**Symptom:** 401 Unauthorized
**Lösung:** Entferne alle Leerzeichen vor/nach dem Key

## Test nach dem Setzen:

Nach dem Setzen des korrekten Keys:
1. Warte auf das nächste Deployment (oder trigger manuell)
2. Teste die API erneut
3. Prüfe die Vercel Logs auf Erfolg

## Erwartetes Ergebnis:

Nach dem Setzen des korrekten `anon` Keys sollte die API:
- ✅ Status 201 zurückgeben
- ✅ Eintrag erfolgreich speichern
- ✅ Keine 405 oder 403 Fehler mehr

