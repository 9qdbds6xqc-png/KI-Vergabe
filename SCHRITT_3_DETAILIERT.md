# Schritt 3: Datenbank-Tabelle erstellen - Detaillierte Anleitung

## Übersicht
Du erstellst jetzt eine Tabelle in Supabase, in der alle Gespräche gespeichert werden.

---

## Schritt 3.1: Zum SQL Editor navigieren

1. **Im Supabase Dashboard:**
   - Nachdem dein Projekt erstellt wurde, siehst du das Dashboard
   - Links siehst du ein Menü mit verschiedenen Optionen

2. **Klicke auf "SQL Editor":**
   - Das ist das 4. oder 5. Icon von oben im linken Menü
   - Icon sieht aus wie: `</>` oder ein Code-Symbol
   - Oder: Text "SQL Editor"

3. **Du siehst jetzt:**
   - Eine leere Seite mit "New query" Button (rechts oben)
   - Oder eine Liste mit Beispiel-Queries

---

## Schritt 3.2: Neue Query erstellen

1. **Klicke auf "New query"** (rechts oben, grüner Button)
   - Oder falls bereits ein Query-Editor offen ist, nutze diesen

2. **Du siehst jetzt:**
   - Ein leeres Textfeld (wie ein Code-Editor)
   - Oben: "New query" oder ähnlich
   - Unten: "Run" Button

---

## Schritt 3.3: SQL-Code einfügen

1. **Kopiere diesen kompletten Code:**

```sql
-- Create backlog entries table
CREATE TABLE IF NOT EXISTS backlog_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  company_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pdf_file_name TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_pricing_question BOOLEAN DEFAULT FALSE,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_company_id ON backlog_entries(company_id);
CREATE INDEX IF NOT EXISTS idx_timestamp ON backlog_entries(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_session_id ON backlog_entries(session_id);

-- Enable Row Level Security
ALTER TABLE backlog_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (for easy access)
CREATE POLICY "Allow all operations" ON backlog_entries
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

2. **Füge den Code in den Editor ein:**
   - Klicke in das Textfeld
   - `Cmd+V` (Mac) oder `Ctrl+V` (Windows) zum Einfügen
   - Der komplette Code sollte jetzt im Editor stehen

---

## Schritt 3.4: Query ausführen

1. **Prüfe nochmal:**
   - Ist der komplette Code drin?
   - Keine Zeile fehlt?

2. **Code ausführen:**
   - **Option A:** Klicke auf "Run" Button (rechts unten, grün)
   - **Option B:** Drücke `Ctrl+Enter` (Windows) oder `Cmd+Enter` (Mac)

3. **Warte 1-2 Sekunden**

---

## Schritt 3.5: Erfolg prüfen

**Du solltest sehen:**
- ✅ Unten im Ergebnis-Bereich: "Success. No rows returned"
- ✅ Oder: Eine grüne Erfolgsmeldung
- ✅ Keine Fehlermeldungen

**Falls Fehler erscheinen:**
- Prüfe ob du den kompletten Code kopiert hast
- Stelle sicher, dass keine Zeile fehlt
- Versuche es nochmal (der Code ist idempotent, kann mehrmals laufen)

---

## Schritt 3.6: Tabelle prüfen

1. **Links im Menü:** Klicke auf "Table Editor" (Icon: Tabelle/Grid)
2. **Du solltest sehen:**
   - Eine neue Tabelle: `backlog_entries`
   - Die Tabelle ist leer (noch keine Daten)

**Falls die Tabelle nicht da ist:**
- Gehe zurück zum SQL Editor
- Prüfe ob der Code erfolgreich ausgeführt wurde
- Versuche den Code nochmal auszuführen

---

## Was macht dieser SQL-Code?

1. **Erstellt eine Tabelle** mit allen Feldern für Gespräche:
   - `id` - Eindeutige ID
   - `session_id` - Session-ID des Benutzers
   - `company_id` - Optional: Company-Name
   - `timestamp` - Wann wurde die Frage gestellt
   - `pdf_file_name` - Welche PDFs wurden verwendet
   - `question` - Die Frage
   - `answer` - Die Antwort
   - `is_pricing_question` - Ist es eine Preis-Anfrage?
   - `error` - Falls ein Fehler auftrat

2. **Erstellt Indexe** - Für schnelleres Suchen

3. **Aktiviert Sicherheit** - Row Level Security

4. **Erstellt Policy** - Erlaubt Zugriff auf die Daten

---

## Wichtig

- ✅ Dieser Code kann mehrmals ausgeführt werden (kein Problem)
- ✅ Er erstellt die Tabelle nur, falls sie noch nicht existiert
- ✅ Keine Daten werden gelöscht

---

## Nächstes: Schritt 4

Nach erfolgreichem Schritt 3 gehe weiter zu Schritt 4:
- Settings → API
- API Keys kopieren

