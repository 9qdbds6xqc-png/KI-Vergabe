# GitHub Pages Setup - Schritt für Schritt

## Wichtige Voraussetzungen

1. **Repository muss öffentlich sein** (oder du brauchst GitHub Pro)
   - Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings
   - Prüfe ob das Repository auf "Public" steht

## Schritt 1: GitHub Pages aktivieren (Alternative Methode)

Falls du kein "Build and deployment" Feld siehst:

1. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages

2. **Falls du einen "Pages" Menüpunkt siehst:**
   - Unter "Source" wähle zunächst **"Deploy from a branch"**
   - Branch: `main`
   - Folder: `/ (root)`
   - Klicke "Save"
   - **Dann sofort wieder zurück** und ändere auf **"GitHub Actions"**

3. **Falls du KEINEN "Pages" Menüpunkt siehst:**
   - Repository muss auf "Public" gestellt werden
   - Gehe zu Settings → General → Danger Zone → Change visibility

## Schritt 2: OpenAI API Key als Secret

1. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions
2. Klicke "New repository secret"
3. Name: `VITE_OPENAI_API_KEY`
4. Value: `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`
5. Klicke "Add secret"

## Schritt 3: Custom Domain hinzufügen

1. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
2. Unter "Custom domain" gib ein: `ki-vergabe.de`
3. Klicke "Save"

## Alternative: Nur über GitHub Actions (ohne Pages Settings)

Falls die Pages Settings gar nicht verfügbar sind, wird der Workflow automatisch ausgeführt, sobald:
1. Das Repository öffentlich ist
2. Du den ersten Push gemacht hast (✓ bereits erledigt)
3. Der Workflow manuell getriggert wird:
   - Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/actions
   - Klicke auf "Deploy to GitHub Pages"
   - Klicke "Run workflow"

Die Domain-Konfiguration kann dann später über die API oder wenn Pages verfügbar wird hinzugefügt werden.

