# Supabase Debugging - Warum ist die Tabelle leer?

## Checkliste - Prüfe diese Punkte:

### 1. Environment Variables in Vercel gesetzt?

Gehe zu Vercel Dashboard → Dein Projekt → Settings → Environment Variables

**Du brauchst diese 3 Variablen:**
- [ ] `SUPABASE_URL` = `https://xxxxx.supabase.co` (deine Supabase Project URL)
- [ ] `SUPABASE_ANON_KEY` = Dein anon public key aus Supabase
- [ ] `SUPABASE_TABLE` = `backlog_entries`

**Wichtig:** 
- Alle 3 Environments ankreuzen (Production, Preview, Development)
- Nach dem Setzen: Vercel Deployment neu starten!

---

### 2. Vercel Deployment neu gestartet?

Nach dem Setzen der Environment Variables:

1. Gehe zu Vercel → Deployments
2. Klicke auf den neuesten Deployment
3. Klicke "Redeploy"
4. Warte bis es fertig ist

**Warum?** Environment Variables werden nur bei neuen Deployments geladen!

---

### 3. API URL korrekt gesetzt?

Prüfe in GitHub Secrets:
- Name: `VITE_BACKLOG_API_URL`
- Wert: `https://trafosanf-remake-xxx.vercel.app/api/backlog`

**Wichtig:** Muss mit `/api/backlog` enden!

---

### 4. Browser Console prüfen

1. Öffne https://ki-vergabe.de
2. Öffne Developer Tools (F12)
3. Gehe zum Tab "Console"
4. Stelle eine Frage im Chat
5. **Was siehst du?**

**Erwartete Logs:**
```
Saving to database via API: https://trafosanf-remake-xxx.vercel.app/api/backlog
Successfully saved backlog entry to database
```

**Falls Fehler:**
- `API_URL not configured` → GitHub Secret fehlt
- `Failed to save backlog entry` → Vercel API Problem
- `CORS error` → CORS Problem

---

### 5. Vercel Function Logs prüfen

1. Gehe zu Vercel Dashboard → Dein Projekt
2. Gehe zu "Deployments" → Klicke auf neuesten Deployment
3. Gehe zu "Functions" Tab
4. Klicke auf `/api/backlog`
5. Klicke "View Logs"
6. **Was steht da?**

**Mögliche Fehler:**
- `SUPABASE_URL is not defined` → Environment Variable fehlt
- `Failed to save entry` → Supabase Connection Problem
- `404 Not Found` → Falsche Supabase URL

---

### 6. API direkt testen

**Test 1: API erreichbar?**
```
curl https://trafosanf-remake-xxx.vercel.app/api/backlog
```
Sollte eine Antwort geben (nicht 404)

**Test 2: POST Request testen**
```bash
curl -X POST https://trafosanf-remake-xxx.vercel.app/api/backlog \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "question": "Test Frage",
    "answer": "Test Antwort",
    "isPricingQuestion": false
  }'
```

Sollte `{"success": true, "entry": {...}}` zurückgeben

**Falls Fehler:**
- `401 Unauthorized` → Supabase Key falsch
- `404 Not Found` → Supabase URL falsch oder Tabelle existiert nicht
- `500 Internal Server Error` → Siehe Vercel Logs

---

### 7. Supabase Tabelle prüfen

1. Gehe zu Supabase Dashboard
2. Table Editor → `backlog_entries`
3. **Ist die Tabelle da?**
4. **Ist die Tabelle leer?** (Das ist das Problem)

**Falls Tabelle fehlt:**
- Gehe zu SQL Editor
- Führe den CREATE TABLE SQL-Befehl nochmal aus

**Falls Tabelle leer bleibt:**
- Prüfe Vercel Logs (Schritt 5)
- Prüfe Browser Console (Schritt 4)
- Prüfe API direkt (Schritt 6)

---

### 8. Supabase Row Level Security prüfen

1. Gehe zu Supabase → Table Editor → `backlog_entries`
2. Prüfe ob "RLS enabled" angezeigt wird
3. Falls ja: Gehe zu "Policies"
4. **Gibt es eine Policy die INSERT erlaubt?**

Falls keine Policy da ist:
```sql
CREATE POLICY "Allow all operations" ON backlog_entries
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

## Häufige Probleme & Lösungen

### Problem: "API_URL not configured"
**Lösung:** 
- Prüfe GitHub Secrets
- Name muss exakt sein: `VITE_BACKLOG_API_URL`
- Nach dem Hinzufügen: GitHub Workflow neu starten

### Problem: "SUPABASE_URL is not defined"
**Lösung:**
- Gehe zu Vercel → Environment Variables
- Füge `SUPABASE_URL` hinzu
- Redeploy Vercel

### Problem: "Failed to save entry" (401)
**Lösung:**
- Supabase Key ist falsch
- Prüfe ob `SUPABASE_ANON_KEY` richtig gesetzt ist
- Prüfe ob der Key "anon public" ist (nicht "service_role")

### Problem: "Failed to save entry" (404)
**Lösung:**
- Supabase URL ist falsch
- Oder Tabelle existiert nicht
- Prüfe Tabelle in Supabase Table Editor

### Problem: API funktioniert, aber Tabelle bleibt leer
**Lösung:**
- Prüfe Row Level Security (RLS)
- Füge Policy hinzu falls nötig
- Prüfe Vercel Logs für genaue Fehlermeldung

---

## Debug-Befehl für Terminal

Falls du curl installiert hast:

```bash
# Test ob API erreichbar ist
curl https://trafosanf-remake-xxx.vercel.app/api/backlog

# Test POST Request
curl -X POST https://trafosanf-remake-xxx.vercel.app/api/backlog \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","question":"Test","answer":"Test","isPricingQuestion":false}'
```

---

## Nächste Schritte

1. Gehe durch die Checkliste oben
2. Prüfe Browser Console (F12) wenn du eine Frage stellst
3. Prüfe Vercel Function Logs
4. Teile mir mit, was du siehst!

