# CNAME Konflikt lösen - Schritt für Schritt

## Problem:
"Es besteht ein Konflikt zwischen dem Record-Namen www und einem anderen Record."

Das bedeutet: Es existiert bereits ein **A Record** oder ein anderer Record für `www`.

---

## Lösung: Bestehenden Record löschen oder ändern

### Schritt 1: Finde den bestehenden Record

**In GoDaddy DNS-Verwaltung:**

1. Gehe zu: DNS-Verwaltung für `ki-vergabe.de`
2. Scrolle zu "Records" (Einträge)
3. **Suche nach:** `www` in der Liste
4. **Prüfe:** Welcher Typ ist es?
   - **A Record?** → Muss gelöscht werden
   - **CNAME Record?** → Kann bearbeitet werden

---

### Schritt 2: Lösche den bestehenden A Record für www

**Falls du einen A Record für `www` findest:**

1. **Klicke auf den Record** (oder Bearbeiten-Symbol)
2. **Klicke "Löschen"** oder "Delete"
3. **Bestätige** die Löschung
4. **Warte** 5-10 Minuten

**Dann:**
5. **Füge den CNAME Record hinzu** (siehe Schritt 3)

---

### Schritt 3: Füge CNAME Record hinzu

**Nachdem der A Record gelöscht wurde:**

1. **Klicke "Hinzufügen"** oder "Add"
2. **Wähle Typ:** `CNAME`
3. **Fülle aus:**
   - **Name:** `www`
   - **Wert:** `9qdbds6xqc-png.github.io`
   - **TTL:** `600`
4. **Speichere**

---

## Warum der Konflikt?

**Regel:** Du kannst NICHT gleichzeitig haben:
- ❌ A Record für `www` UND CNAME Record für `www`
- ✅ Nur EINES von beiden!

**Für GitHub Pages brauchst du:**
- `ki-vergabe.de` → **A Records** (4x)
- `www.ki-vergabe.de` → **CNAME Record** (1x)

---

## Beispiel: Was du sehen solltest

### Korrekte DNS-Records:

```
Typ      Name    Wert
─────────────────────────────────────────────
A        @       185.199.108.153
A        @       185.199.109.153
A        @       185.199.110.153
A        @       185.199.111.153
CNAME    www     9qdbds6xqc-png.github.io
```

### Falsch (Konflikt):

```
Typ      Name    Wert
─────────────────────────────────────────────
A        @       185.199.108.153
A        @       185.199.109.153
A        @       185.199.110.153
A        @       185.199.111.153
A        www     185.199.108.153    ← FALSCH! Muss gelöscht werden
CNAME    www     9qdbds6xqc-png.github.io  ← Kann nicht hinzugefügt werden
```

---

## Schritt-für-Schritt Anleitung:

### 1. Gehe zu GoDaddy DNS-Verwaltung
- Logge dich ein
- Finde `ki-vergabe.de`
- Klicke "DNS verwalten"

### 2. Finde den www Record
- Scrolle durch die Records
- Suche nach `www` in der "Name" Spalte
- **Notiere:** Welcher Typ ist es? (A, CNAME, etc.)

### 3. Lösche den www A Record
- Falls es ein **A Record** ist:
  - Klicke auf den Record
  - Klicke "Löschen" oder "Delete"
  - Bestätige
  - **Warte 5-10 Minuten**

### 4. Füge CNAME Record hinzu
- Klicke "Hinzufügen"
- Typ: `CNAME`
- Name: `www`
- Wert: `9qdbds6xqc-png.github.io`
- Speichere

---

## Falls du den Record nicht findest:

**Mögliche Gründe:**
- Record ist versteckt oder auf einer anderen Seite
- Record existiert nicht (dann sollte CNAME funktionieren)
- Record ist bei einem anderen DNS-Provider

**Lösung:**
- Prüfe alle Tabs/Seiten in GoDaddy DNS-Verwaltung
- Prüfe ob DNS bei GoDaddy oder woanders verwaltet wird

---

## Nach dem Löschen und Hinzufügen:

1. **Warte** 5-10 Minuten auf DNS-Propagierung
2. **Teste:** `http://www.ki-vergabe.de`
3. **Sollte** auf deine GitHub Pages Website zeigen

---

## Zusammenfassung:

| Schritt | Aktion |
|---------|--------|
| 1. Finde www Record | In GoDaddy DNS-Verwaltung suchen |
| 2. Prüfe Typ | Ist es ein A Record? |
| 3. Lösche A Record | Falls vorhanden |
| 4. Warte | 5-10 Minuten |
| 5. Füge CNAME hinzu | www → 9qdbds6xqc-png.github.io |

**Sag mir, was du in GoDaddy siehst - dann kann ich dir gezielt helfen!**

