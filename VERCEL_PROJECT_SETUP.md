# Vercel Project Setup - Functions werden nicht erkannt

## Problem:
- Kein "Functions" Tab in Vercel
- Functions werden nicht deployed
- API-Endpunkte funktionieren nicht

---

## Lösung: Vercel Project richtig einrichten

### Schritt 1: Prüfe ob Projekt auf Vercel existiert

1. **Gehe zu:** https://vercel.com/dashboard
2. **Prüfe:** Siehst du Projekt `trafosanf-remake`?

**Falls NEIN:**
- Projekt muss zuerst auf Vercel erstellt werden
- Siehe Schritt 2

**Falls JA:**
- Projekt existiert, aber Functions werden nicht erkannt
- Siehe Schritt 3

---

### Schritt 2: Projekt auf Vercel erstellen

1. **Gehe zu:** https://vercel.com/dashboard
2. **Klicke:** "Add New..." → "Project"
3. **Wähle Repository:** `9qdbds6xqc-png/trafosanf-remake`
4. **Klicke:** "Import"

5. **Konfiguriere:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (Standard)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Klicke:** "Deploy"

---

### Schritt 3: Prüfe Build Settings

**Falls Projekt bereits existiert:**

1. **Vercel Dashboard** → Projekt → Settings → **General**
2. **Prüfe:**
   - Framework Preset: `Vite`?
   - Build Command: `npm run build`?
   - Output Directory: `dist`?
   - Root Directory: `./`?

**Falls falsch:**
- Korrigiere die Einstellungen
- Redeploy

---

### Schritt 4: Prüfe ob `api/` Directory erkannt wird

**Vercel erkennt automatisch Functions aus `api/` Directory, aber:**

**Prüfe:**
1. **Vercel Dashboard** → Settings → **General**
2. **Prüfe:** Gibt es "Ignore Build Step" oder ähnliches?
3. **Prüfe:** Ist `api/` ausgeschlossen?

**Falls ja:**
- Entferne die Ausschlüsse
- Redeploy

---

## Nach dem Setup:

### Prüfe ob Functions deployed wurden:

1. **Vercel Dashboard** → Deployments → Neuester Deployment
2. **Jetzt sollte es einen Tab "Functions" geben**
3. **Prüfe:** Siehst du `/api/backlog`?

**Falls JA:**
- ✅ Functions wurden deployed!
- Weiter zu Schritt 5

**Falls NEIN:**
- ❌ Functions werden immer noch nicht erkannt
- Siehe Troubleshooting unten

---

### Schritt 5: Teste Function

1. **Gehe zu:** Vercel Dashboard → Deployments → Neuester Deployment
2. **Functions** → `/api/backlog` → **View Logs**
3. **Teste:** Stelle eine Frage auf der Website
4. **Prüfe Logs:** Solltest du jetzt Logs sehen!

---

## Troubleshooting:

### Problem: Functions Tab erscheint nicht

**Mögliche Ursachen:**
- Projekt wurde nicht richtig auf Vercel erstellt
- Build Settings sind falsch
- `api/` Directory wird nicht erkannt

**Lösung:**
- Erstelle Projekt neu auf Vercel (siehe Schritt 2)
- Oder korrigiere Build Settings (siehe Schritt 3)

---

### Problem: Functions existieren, aber werden nicht aufgerufen

**Prüfe:**
- Vercel Logs (Functions → View Logs)
- Environment Variables (Settings → Environment Variables)
- Function Code (GitHub → api/backlog.ts)

---

## Zusammenfassung:

| Schritt | Aktion |
|---------|--------|
| 1. Projekt existiert? | Prüfe Vercel Dashboard |
| 2. Falls nicht | Erstelle Projekt neu |
| 3. Build Settings | Prüfe und korrigiere |
| 4. Functions Tab | Sollte jetzt erscheinen |
| 5. Teste | Stelle Frage auf Website |

**Sag mir:**
1. **Siehst du Projekt `trafosanf-remake` in Vercel?** (Ja/Nein)
2. **Was sind die Build Settings?** (Framework, Build Command, etc.)

Dann kann ich gezielt helfen!

