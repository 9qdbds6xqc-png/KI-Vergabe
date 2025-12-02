# Konfigurations-Checkliste

## ✅ Automatisch geprüft:

### 1. GitHub Actions Workflow
- [x] `VITE_OPENAI_API_KEY` wird beim Build übergeben
- [x] `VITE_BACKLOG_API_URL` wird beim Build übergeben

### 2. Code-Konfiguration
- [x] `src/lib/backlog.ts` liest `VITE_BACKLOG_API_URL` aus Environment Variables
- [x] API-Endpunkt ist korrekt (`/api/backlog`)
- [x] Error Handling und Logging vorhanden

---

## ⚠️ Manuell zu prüfen (kann nicht automatisch gemacht werden):

### 1. GitHub Secrets
**Gehe zu:** https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions

**Prüfe ob diese Secrets existieren:**
- [ ] `VITE_OPENAI_API_KEY` - Muss gesetzt sein
- [ ] `VITE_BACKLOG_API_URL` - Muss gesetzt sein (z.B. `https://trafosanf-remake-xxx.vercel.app/api/backlog`)

**Falls `VITE_BACKLOG_API_URL` fehlt:**
1. Klicke "New repository secret"
2. Name: `VITE_BACKLOG_API_URL`
3. Value: `https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog`
4. Klicke "Add secret"

---

### 2. Vercel Environment Variables
**Gehe zu:** Vercel Dashboard → Dein Projekt → Settings → Environment Variables

**Prüfe ob diese gesetzt sind:**
- [ ] `SUPABASE_URL` - Deine Supabase Project URL
- [ ] `SUPABASE_ANON_KEY` - Dein Supabase anon public key
- [ ] `SUPABASE_TABLE` = `backlog_entries`

**Nach dem Setzen:**
- [ ] Vercel Deployment neu starten (Redeploy)

---

### 3. Supabase Tabelle
**Gehe zu:** Supabase Dashboard → Table Editor

**Prüfe:**
- [ ] Tabelle `backlog_entries` existiert
- [ ] RLS (Row Level Security) ist aktiviert
- [ ] Policy "Allow all operations" existiert

---

### 4. GitHub Workflow Status
**Nach dem Commit:**
- [ ] Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
- [ ] Prüfe ob neuer Workflow läuft/erfolgreich ist

---

## 🚀 Nächste Schritte (automatisch ausgeführt):

1. ✅ Workflow wurde getriggert (leerer Commit)
2. ⏳ Warte auf Build (2-3 Minuten)
3. ✅ Prüfe Browser Console nach Deployment
4. ✅ Teste Chat-Funktion

---

## 📝 Notizen:

**Vercel URL:** `trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app`

**Backlog API URL:** `https://trafosanf-remake-bcq0d0f3e-davids-projects-abae1d70.vercel.app/api/backlog`

