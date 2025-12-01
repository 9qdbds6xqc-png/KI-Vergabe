# Workflow-Fehler beheben

## Schnell-Diagnose

1. **Klicke auf einen der fehlgeschlagenen Workflow-Runs**
2. **Klicke auf den "build" Job** (nicht "deploy")
3. **Schaue dir die Logs an** - besonders:
   - "Install dependencies"
   - "Build"
   - Am Ende der Logs steht meist die Fehlermeldung

## Häufige Fehler:

### Fehler 1: "VITE_OPENAI_API_KEY not found"
- **Lösung:** API Key Secret wurde nicht hinzugefügt oder falsch benannt
- Prüfe: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/secrets/actions
- Name muss GENAU sein: `VITE_OPENAI_API_KEY`

### Fehler 2: Build-Fehler
- Kann sein, dass ein TypeScript oder Compiler-Fehler vorliegt
- Schaue in die "Build" Schritt-Logs

### Fehler 3: Permission-Fehler
- Normalerweise sollte das nicht passieren, da wir die richtigen Permissions haben

## Nächster Schritt:

1. Öffne einen fehlgeschlagenen Workflow
2. Klicke auf "build" Job
3. Scrolle zu "Build" Schritt
4. Kopiere die Fehlermeldung und teile sie mit mir

