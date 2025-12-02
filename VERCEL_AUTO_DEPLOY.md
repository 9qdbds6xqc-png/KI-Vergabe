# Vercel Auto-Deploy finden - Schritt für Schritt

## Wo findest du Auto-Deploy?

### Schritt 1: Gehe zu deinem Projekt
1. Öffne: https://vercel.com/dashboard
2. Klicke auf Projekt: `trafosanf-remake`

### Schritt 2: Gehe zu Settings
- Klicke auf **"Settings"** (oben im Menü)

### Schritt 3: Git-Einstellungen
- Links im Menü: Klicke auf **"Git"**

### Schritt 4: Was du sehen solltest:

Du solltest sehen:
- **Connected Git Repository:** `9qdbds6xqc-png/trafosanf-remake`
- **Production Branch:** `main`
- **Deploy Hooks:** (kann leer sein)

**WICHTIG:** Wenn das Repository verbunden ist, deployt Vercel **automatisch** bei jedem Push zu `main`!

---

## Falls du "Git" nicht findest:

### Alternative: Prüfe Deployments
1. Gehe zu: **"Deployments"** (oben im Menü)
2. **Prüfe:** Gibt es neue Deployments nach deinen Git-Pushes?

**Falls JA:**
- ✅ Auto-Deploy funktioniert bereits!
- Vercel deployt automatisch

**Falls NEIN:**
- ❌ Repository ist nicht verbunden
- Oder Auto-Deploy ist deaktiviert

---

## Falls Repository NICHT verbunden ist:

### Option 1: Via Settings → Git
1. Settings → **Git**
2. Klicke **"Connect Git Repository"**
3. Wähle `9qdbds6xqc-png/trafosanf-remake`
4. Bestätige

### Option 2: Via "Add New Project"
1. Dashboard → **"Add New..."** → **"Project"**
2. Wähle Repository: `9qdbds6xqc-png/trafosanf-remake`
3. Klicke **"Import"**
4. Vercel verbindet automatisch

---

## Prüfe ob Auto-Deploy funktioniert:

### Test: Push einen Commit
1. Ich habe gerade einen Commit gepusht: `821577e`
2. Gehe zu: Vercel Dashboard → **Deployments**
3. **Prüfe:** Gibt es ein neues Deployment?

**Falls JA:**
- ✅ Auto-Deploy funktioniert!
- Warte bis Deployment fertig ist (1-2 Minuten)

**Falls NEIN:**
- ❌ Repository ist nicht verbunden
- Oder Vercel hat den Push nicht erkannt

---

## Manuelles Deployment (falls Auto-Deploy nicht funktioniert):

### Via Dashboard:
1. **Deployments** → **"Create Deployment"** (rechts oben)
2. Branch: `main`
3. Klicke **"Deploy"**

### Via Redeploy:
1. **Deployments** → Klicke auf neuesten Deployment
2. Klicke **"Redeploy"** (rechts oben)
3. Warte 1-2 Minuten

---

## Was du mir sagen kannst:

1. **Siehst du "Git" in Settings?** (Ja/Nein)
2. **Ist das Repository verbunden?** (Ja/Nein)
3. **Gibt es neue Deployments nach Git-Pushes?** (Ja/Nein)
4. **Siehst du `/api/backlog` in Functions?** (Ja/Nein)

Dann kann ich dir gezielt helfen!

