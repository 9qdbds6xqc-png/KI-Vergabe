# HTTPS Setup für ki-vergabe.de

## Problem:
Die Website zeigt "Not Secure" weil sie über HTTP statt HTTPS läuft.

## Warum ist das wichtig?

1. **Sicherheit:** HTTPS verschlüsselt die Verbindung
2. **CORS:** Moderne Browser blockieren CORS-Anfragen von HTTP zu HTTPS
3. **Vertrauen:** Nutzer sehen "Not Secure" Warnung

---

## Lösung: HTTPS für GitHub Pages aktivieren

### Schritt 1: Prüfe GitHub Pages Settings

1. **Gehe zu:** https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
2. **Prüfe:**
   - Custom domain: `ki-vergabe.de` (sollte gesetzt sein)
   - **"Enforce HTTPS"** Checkbox: Ist diese aktiviert?

**Falls "Enforce HTTPS" NICHT aktiviert:**
- Aktiviere die Checkbox
- Warte 1-2 Minuten
- GitHub Pages wird automatisch ein SSL-Zertifikat ausstellen

---

### Schritt 2: Prüfe DNS-Einstellungen

**In GoDaddy (oder deinem DNS-Provider):**

**Prüfe ob diese Records existieren:**

**A Records (IPv4):**
- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

**CNAME Record:**
- `www` → `9qdbds6xqc-png.github.io`

**Falls fehlen:**
- Füge sie hinzu
- Warte auf DNS-Propagierung (kann bis zu 48h dauern, meist aber schneller)

---

### Schritt 3: Warte auf SSL-Zertifikat

Nachdem du "Enforce HTTPS" aktiviert hast:

1. **Warte 5-10 Minuten**
2. **Prüfe:** Gehe zu https://ki-vergabe.de
3. **Prüfe:** Siehst du ein Schloss-Symbol?

**Falls noch "Not Secure":**
- SSL-Zertifikat wird noch ausgestellt (kann bis zu 24h dauern)
- Prüfe GitHub Pages Settings → Custom domain → Siehst du einen grünen Haken?

---

### Schritt 4: Prüfe ob HTTPS funktioniert

**Test-Command:**
```bash
curl -I https://ki-vergabe.de
```

**Erwartete Antwort:**
```
HTTP/2 200
```

**Falls Fehler:**
- SSL-Zertifikat wird noch ausgestellt
- Oder DNS-Einstellungen sind falsch

---

## Nach HTTPS-Aktivierung:

### 1. Teste die Website:
- Öffne: **https://ki-vergabe.de** (mit https!)
- Sollte kein "Not Secure" mehr zeigen

### 2. Teste CORS:
- Öffne Browser Console (F12)
- Stelle eine Frage im Chat
- CORS sollte jetzt funktionieren!

---

## Warum hilft HTTPS bei CORS?

- Browser blockieren CORS-Anfragen von HTTP zu HTTPS
- Wenn beide Seiten HTTPS verwenden, funktioniert CORS besser
- Vercel API läuft auf HTTPS → Website sollte auch HTTPS verwenden

---

## Zusammenfassung:

| Schritt | Status |
|---------|--------|
| GitHub Pages → Enforce HTTPS aktivieren | ⚠️ Prüfe |
| DNS Records korrekt? | ⚠️ Prüfe |
| SSL-Zertifikat ausgestellt? | ⏳ Warte |
| Website läuft auf HTTPS? | ⏳ Nach Aktivierung |

---

## Nächste Schritte:

1. **Gehe zu:** https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
2. **Aktiviere:** "Enforce HTTPS" Checkbox
3. **Warte** 5-10 Minuten
4. **Teste:** https://ki-vergabe.de
5. **Teste:** CORS sollte jetzt funktionieren!

**Sag mir, ob du "Enforce HTTPS" aktivieren konntest!**

