# GitHub Secret Prüfung - VITE_BACKLOG_API_URL

## Schnelle Prüfung:

### Option 1: GitHub UI (empfohlen)

1. **Öffne diesen Link direkt:**
   ```
   https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions
   ```

2. **Du solltest eine Liste sehen mit:**
   - `VITE_OPENAI_API_KEY` ✅ (sollte da sein)
   - `VITE_BACKLOG_API_URL` ❓ (prüfe ob das da ist)

3. **Falls `VITE_BACKLOG_API_URL` FEHLT:**
   - Klicke "New repository secret" (rechts oben)
   - Name: `VITE_BACKLOG_API_URL`
   - Value: `https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog`
   - Klicke "Add secret"

---

### Option 2: Workflow Log prüfen

1. **Öffne:**
   ```
   https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
   ```

2. **Klicke auf den neuesten Workflow-Run** (oben in der Liste)

3. **Klicke auf "build" Job** (links)

4. **Erweitere den "Build" Step**

5. **Prüfe die Logs:**
   - ✅ Falls erfolgreich: Secret ist gesetzt
   - ❌ Falls Fehler: Siehst du den genauen Fehler

---

### Option 3: Browser Console prüfen (nach Deployment)

1. **Öffne:** https://ki-vergabe.de
2. **Öffne Browser Console** (F12 → Console Tab)
3. **Stelle eine Frage im Chat**
4. **Suche nach:**
   ```
   Backlog API URL not configured
   ```
   - ❌ Falls du das siehst: Secret fehlt oder URL ist leer
   - ✅ Falls du `Saving to database via API: https://...` siehst: Secret ist gesetzt

---

## Was du sehen solltest:

### ✅ Wenn Secret GESETZT ist:
- In GitHub Secrets Liste: `VITE_BACKLOG_API_URL` ist sichtbar
- Im Browser Console: `Saving to database via API: https://...`
- Workflow Build: Erfolgreich ohne Fehler

### ❌ Wenn Secret FEHLT:
- In GitHub Secrets Liste: `VITE_BACKLOG_API_URL` fehlt
- Im Browser Console: `Backlog API URL not configured`
- Workflow Build: Möglicherweise erfolgreich, aber Variable ist leer

---

## Direkter Link zum Secret hinzufügen:

Falls das Secret fehlt, klicke hier:
```
https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions/new
```

**Dann fülle aus:**
- **Name:** `VITE_BACKLOG_API_URL`
- **Secret:** `https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog`

