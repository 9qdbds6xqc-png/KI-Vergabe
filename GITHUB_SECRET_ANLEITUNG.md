# Schritt 9: GitHub Secret hinzufügen - Kurzanleitung

## Deine Vercel URL:
```
trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app
```

## Vollständige API URL (die du brauchst):
```
https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog
```

---

## So fügst du das GitHub Secret hinzu:

### Option 1: Direkt über den Link (am einfachsten)

1. **Klicke auf diesen Link:**
   ```
   https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions
   ```

2. **Klicke:** "New repository secret" (rechts oben, grüner Button)

3. **Fülle aus:**
   - **Name:** `VITE_BACKLOG_API_URL`
   - **Secret:** `https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog`

4. **Klicke:** "Add secret" (unten)

5. **Fertig!** ✅

---

### Option 2: Manuell über GitHub

1. **Gehe zu:** https://github.com/9qdbds6xqc-png/trafosanf-remake
2. **Klicke:** "Settings" (oben im Repository)
3. **Links im Menü:** Klicke "Secrets and variables" → "Actions"
4. **Klicke:** "New repository secret"
5. **Fülle aus:**
   - **Name:** `VITE_BACKLOG_API_URL`
   - **Secret:** `https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog`
6. **Klicke:** "Add secret"

---

## Wichtig:

✅ **Füge `https://` am Anfang hinzu**  
✅ **Füge `/api/backlog` am Ende hinzu**  
✅ **Der Name muss exakt sein:** `VITE_BACKLOG_API_URL` (groß/klein beachten!)

---

## Nach dem Hinzufügen:

1. **GitHub Workflow neu starten:**
   - Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
   - Klicke auf "Deploy to GitHub Pages"
   - Klicke "Run workflow" (rechts oben)
   - Wähle Branch: `main`
   - Klicke "Run workflow"

2. **Warte** bis der Workflow grün ist (2-3 Minuten)

3. **Teste:** Öffne https://ki-vergabe.de → Stelle eine Frage → Prüfe Supabase

---

## Wenn es nicht funktioniert:

- Prüfe ob der Name exakt `VITE_BACKLOG_API_URL` ist
- Prüfe ob die URL mit `https://` beginnt
- Prüfe ob die URL mit `/api/backlog` endet
- Teste die URL direkt im Browser (sollte einen Error geben, aber nicht 404)

