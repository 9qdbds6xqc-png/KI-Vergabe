# Vercel Function wird nicht deployed - Lösung

## Problem:
- Keine Logs in Vercel → Function wird nicht aufgerufen
- 401 Fehler → Vercel blockiert Anfrage vor der Function
- Function möglicherweise nicht deployed

---

## Prüfe ob Function deployed wurde:

### Schritt 1: Prüfe Vercel Functions

1. **Gehe zu:** Vercel Dashboard → Deployments → Neuester Deployment
2. **Gehe zu Tab:** **"Functions"**
3. **Prüfe:** Siehst du `/api/backlog` in der Liste?

**Falls NEIN:**
- Die Function wurde nicht deployed
- Siehe Lösung unten

**Falls JA:**
- Function existiert, wird aber nicht aufgerufen
- Siehe Schritt 2

---

## Lösung: Function richtig deployen

### Problem 1: Function wird nicht erkannt

**Mögliche Ursachen:**
- `api/backlog.ts` existiert nicht im Repository
- Vercel erkennt `.ts` Files nicht
- Build-Prozess deployed Functions nicht

**Prüfe:**
1. **Gehe zu:** GitHub Repository → `api/backlog.ts`
2. **Prüfe:** Existiert die Datei?
3. **Prüfe:** Ist sie committed und gepusht?

---

### Problem 2: Vercel erkennt TypeScript nicht

**Lösung:** Stelle sicher, dass Vercel TypeScript unterstützt

**Prüfe:**
1. **Vercel Dashboard** → Settings → **General**
2. **Prüfe:** Framework Preset = `Vite` oder `Other`?
3. **Prüfe:** Build Command = `npm run build`?

**Falls falsch:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

---

### Problem 3: Functions werden nicht deployed

**Vercel sollte automatisch Functions aus `api/` deployen, aber:**

**Prüfe:**
1. **Vercel Dashboard** → Settings → **Functions**
2. **Prüfe:** Gibt es spezielle Einstellungen?

**Falls ja:**
- Stelle sicher, dass `api/` nicht ausgeschlossen ist

---

## Alternative: Prüfe Build Logs

1. **Vercel Dashboard** → Deployments → Neuester Deployment
2. **Klicke auf Build Step**
3. **Prüfe Logs:**
   - Siehst du `api/backlog.ts`?
   - Gibt es Fehler beim Build?

---

## Manuelles Deployment testen

### Option 1: Vercel CLI (falls installiert)

```bash
cd /Users/davidwulff/RepoPrompt/trafosanf-remake
vercel --prod
```

### Option 2: Via Dashboard

1. **Vercel Dashboard** → Deployments
2. **"Create Deployment"** (rechts oben)
3. **Branch:** `main`
4. **Klicke:** "Deploy"

---

## Prüfe ob Function existiert:

**In Vercel Dashboard:**
1. **Deployments** → Neuester Deployment
2. **Functions Tab**
3. **Prüfe:** Gibt es überhaupt Functions?

**Falls NEIN:**
- Vercel erkennt `api/` Ordner nicht
- Prüfe Vercel Settings

**Falls JA aber nicht `/api/backlog`:**
- Function wurde nicht deployed
- Prüfe Build Logs

---

## Zusammenfassung:

| Item | Prüfen |
|------|--------|
| Function existiert in Vercel? | Deployments → Functions |
| Build Logs zeigen Function? | Deployments → Build Logs |
| `api/backlog.ts` im Repository? | GitHub → api/backlog.ts |
| Vercel Settings korrekt? | Settings → General |

**Sag mir:**
1. **Siehst du `/api/backlog` in Functions?** (Ja/Nein)
2. **Siehst du überhaupt Functions?** (Ja/Nein)
3. **Was zeigen die Build Logs?**

Dann kann ich gezielt helfen!

