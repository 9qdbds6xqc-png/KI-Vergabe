# OpenAI API Key ist ungültig - Lösung

## Problem:
```
Fehler: OpenAI API key is invalid. Please check your configuration.
```

Dies bedeutet, dass der API Key in GitHub Secrets entweder:
- ❌ Falsch/abgelaufen ist
- ❌ Ungültig ist
- ❌ Nicht richtig gesetzt wurde

---

## Lösung:

### Option 1: Neuen API Key setzen (empfohlen)

**Du brauchst einen neuen/gültigen OpenAI API Key:**
1. Gehe zu: https://platform.openai.com/api-keys
2. Erstelle einen neuen API Key
3. Kopiere den Key

**Dann setze ich den Key automatisch:**
```bash
# Ich führe das aus, sobald du den Key hast:
gh secret set VITE_OPENAI_API_KEY --body "dein-neuer-api-key-hier"
```

---

### Option 2: Prüfe ob der aktuelle Key noch gültig ist

**Manuelle Prüfung:**
1. Gehe zu: https://platform.openai.com/api-keys
2. Prüfe ob der Key noch aktiv ist
3. Falls nicht: Erstelle einen neuen

---

## Was ich jetzt machen kann:

1. **Prüfe ob Secret existiert** ✅ (existiert)
2. **Prüfe Build-Logs** - um zu sehen was genau passiert
3. **Aktualisiere den Key** - wenn du mir einen neuen gibst

---

## Nächste Schritte:

**Gib mir bitte einen neuen/gültigen OpenAI API Key, dann setze ich ihn automatisch!**

Falls du keinen neuen Key hast:
1. Gehe zu: https://platform.openai.com/api-keys
2. Klicke "Create new secret key"
3. Kopiere den Key
4. Gib mir den Key und ich setze ihn automatisch

