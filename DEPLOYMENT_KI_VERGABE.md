# Deployment zu ki-vergabe.de

## Übersicht

Diese Anleitung erklärt, wie die Trafosanf-Website auf ki-vergabe.de gehostet wird.

## Voraussetzungen

- GitHub Repository: `9qdbds6xqc-png/trafosanf-remake`
- Domain: ki-vergabe.de (bei GoDaddy)
- GitHub Account mit Zugriff auf das Repository

## Schritt 1: Repository auf GitHub pushen

1. Alle Änderungen committen und pushen:
```bash
cd /Users/davidwulff/RepoPrompt/trafosanf-remake
git add .
git commit -m "Configure for ki-vergabe.de deployment"
git push origin main
```

## Schritt 2: GitHub Pages aktivieren

1. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
2. Unter "Source": Wähle **"GitHub Actions"**
3. Klicke "Save"

## Schritt 3: OpenAI API Key als Secret hinzufügen

1. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions
2. Klicke "New repository secret"
3. Name: `VITE_OPENAI_API_KEY`
4. Value: Dein OpenAI API Key
5. Klicke "Add secret"

## Schritt 4: DNS-Konfiguration in GoDaddy

### Für die Root-Domain (ki-vergabe.de):

1. Logge dich bei GoDaddy ein
2. Gehe zu "Meine Produkte" → "DNS verwalten" für ki-vergabe.de

3. **Füge 4 A Records hinzu:**
   ```
   Type: A
   Name: @ (oder leer lassen für Root-Domain)
   Value: 185.199.108.153
   TTL: 600 Sekunden (Standard)
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

4. **Falls bereits A Records existieren**, lösche sie zuerst oder ersetze sie durch die neuen GitHub Pages IPs

### Für die www Subdomain (optional):

Falls du auch www.ki-vergabe.de verwenden möchtest:

1. **Füge einen CNAME Record hinzu:**
   ```
   Type: CNAME
   Name: www
   Value: 9qdbds6xqc-png.github.io
   TTL: 600 Sekunden
   ```

## Schritt 5: Custom Domain in GitHub Pages konfigurieren

1. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
2. Unter "Custom domain": Gib ein: `ki-vergabe.de`
3. Klicke "Save"
4. Warte, bis GitHub die Domain verifiziert (kann einige Minuten dauern)

## Schritt 6: SSL-Zertifikat aktivieren

1. Nach erfolgreicher DNS-Verifizierung erscheint "Enforce HTTPS"
2. Aktiviere das Häkchen bei "Enforce HTTPS"
3. Warte auf die SSL-Zertifikatsausstellung (kann bis zu 24 Stunden dauern)

## Schritt 7: Deployment testen

1. Warte 5-10 Minuten auf das erste Deployment
2. Prüfe die Actions: https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
3. Teste die Website: https://ki-vergabe.de
4. Teste Backlog: https://ki-vergabe.de/backlog

## URLs nach Deployment

- **Hauptseite (Chat)**: https://ki-vergabe.de/
- **Backlog**: https://ki-vergabe.de/backlog

## Troubleshooting

### DNS-Propagation prüfen
- Verwende: https://dnschecker.org/
- Gib ein: `ki-vergabe.de`
- Wähle "A" Record
- Prüfe, ob alle Server die neuen IPs zeigen

### SSL-Zertifikat
- Kann bis zu 24 Stunden dauern
- Prüfe Status in GitHub Pages Settings
- Bei Problemen: Deaktiviere und reaktiviere "Enforce HTTPS"

### Deployment-Fehler
- Prüfe GitHub Actions Logs
- Stelle sicher, dass `VITE_OPENAI_API_KEY` Secret korrekt gesetzt ist
- Prüfe, ob der Build erfolgreich ist

## Wichtige Dateien

- `.github/workflows/deploy.yml` - GitHub Actions Workflow
- `public/CNAME` - Custom Domain Konfiguration
- `public/404.html` - SPA Routing Support
- `vite.config.ts` - Base Path Konfiguration

## Support

Bei Problemen:
- Prüfe GitHub Actions: https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
- Prüfe GitHub Pages Settings: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
- Prüfe Browser-Konsole für Fehler

