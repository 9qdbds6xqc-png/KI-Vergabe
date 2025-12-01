# DNS-Konfiguration für ki-vergabe.de

## Problem: "Domain does not resolve to the GitHub Pages server"

Dies bedeutet, dass die DNS-Einträge noch nicht korrekt sind oder die Propagation noch läuft.

## Lösung: DNS-Einträge in GoDaddy überprüfen

### Schritt 1: In GoDaddy prüfen

1. Gehe zu GoDaddy → "Meine Produkte"
2. Klicke auf ki-vergabe.de → "DNS verwalten"

### Schritt 2: Alte Einträge löschen

**WICHTIG:** Lösche alle bestehenden A Records für `@` oder die Root-Domain

### Schritt 3: Neue A Records hinzufügen

Füge **genau diese 4 A Records** hinzu:

1. **Erster A Record:**
   - Type: `A`
   - Name: `@` (oder leer lassen - das bedeutet Root-Domain)
   - Value: `185.199.108.153`
   - TTL: `600` (oder "Automatisch")

2. **Zweiter A Record:**
   - Type: `A`
   - Name: `@`
   - Value: `185.199.109.153`
   - TTL: `600`

3. **Dritter A Record:**
   - Type: `A`
   - Name: `@`
   - Value: `185.199.110.153`
   - TTL: `600`

4. **Vierter A Record:**
   - Type: `A`
   - Name: `@`
   - Value: `185.199.111.153`
   - TTL: `600`

### Schritt 4: Keine CNAME für Root-Domain

**WICHTIG:** Für die Root-Domain (`@` oder leer) darf **KEIN** CNAME Record existieren!
- Falls ein CNAME für `@` existiert → **LÖSCHE IHN**

### Schritt 5: Speichern und warten

1. Klicke "Speichern" oder "Save"
2. Warte 5-10 Minuten
3. Prüfe DNS-Propagation: https://dnschecker.org/
   - Gib ein: `ki-vergabe.de`
   - Wähle "A" Record
   - Prüfe, ob die 4 GitHub IPs erscheinen

## DNS-Check Tools

- https://dnschecker.org/#A/ki-vergabe.de
- https://www.whatsmydns.net/#A/ki-vergabe.de

## Nach erfolgreicher DNS-Propagation

1. Warte 10-30 Minuten
2. Gehe zu: https://github.com/9qdbds6xqc-png/trafosanf-remake/settings/pages
3. GitHub sollte die Domain automatisch erkennen
4. Falls noch Fehler: Klicke "Remove" bei der Domain und füge sie erneut hinzu

## Häufige Fehler

- ❌ CNAME für Root-Domain (`@`) gesetzt → Muss gelöscht werden
- ❌ Nur 1-3 A Records gesetzt → Alle 4 müssen gesetzt sein
- ❌ Falsche IP-Adressen → Genau die GitHub Pages IPs verwenden
- ❌ DNS-Propagation noch nicht abgeschlossen → Warte 10-30 Minuten

