# CORS Problem - Lösung

## Problem:
```
Access to fetch at 'https://trafosanf-remake-xxx.vercel.app/api/backlog' 
from origin 'https://ki-vergabe.de' has been blocked by CORS policy
```

## Was ich gemacht habe:

1. ✅ **API Code aktualisiert** (`api/backlog.ts`):
   - OPTIONS-Handling zuerst (vor anderen Checks)
   - CORS-Header werden für alle Anfragen gesetzt
   - Origin-Prüfung für `ki-vergabe.de`

2. ✅ **vercel.json aktualisiert**:
   - CORS-Header hinzugefügt
   - `Access-Control-Allow-Credentials` hinzugefügt

3. ✅ **Code committed und gepusht**

---

## ⚠️ WICHTIG: Vercel muss neu deployen!

Die Änderungen sind im Git, aber **Vercel muss die API neu deployen**.

### Option 1: Automatisches Deployment
- Falls Vercel Git-Integration aktiv ist → sollte automatisch deployen

### Option 2: Manuelles Deployment
1. Gehe zu: Vercel Dashboard
2. Wähle dein Projekt: `trafosanf-remake`
3. Gehe zu: "Deployments"
4. Klicke auf den neuesten Deployment
5. Klicke: **"Redeploy"**
6. Warte 1-2 Minuten

---

## Nach dem Deployment testen:

1. **Öffne:** https://ki-vergabe.de
2. **Öffne Browser Console** (F12)
3. **Stelle eine Frage im Chat**
4. **Prüfe Console:**
   - ✅ Sollte sehen: `Saving to database via API: https://...`
   - ✅ Sollte sehen: `Successfully saved backlog entry to database`
   - ❌ Kein CORS-Fehler mehr!

5. **Prüfe Supabase:**
   - Gehe zu: Supabase Dashboard → Table Editor → `backlog_entries`
   - Einträge sollten jetzt erscheinen!

---

## Falls es immer noch nicht funktioniert:

### Prüfe Vercel Logs:
1. Vercel Dashboard → Deployments → Neuester Deployment
2. Klicke auf `/api/backlog` Function
3. Klicke "View Logs"
4. Prüfe ob Fehler auftreten

### Teste API direkt:
```bash
curl -X OPTIONS https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog \
  -H "Origin: https://ki-vergabe.de" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Sollte zurückgeben:
```
< HTTP/1.1 200 OK
< Access-Control-Allow-Origin: https://ki-vergabe.de
< Access-Control-Allow-Methods: GET, POST, OPTIONS
```

