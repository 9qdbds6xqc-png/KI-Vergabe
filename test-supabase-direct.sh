#!/bin/bash
# Test Supabase connection directly
# Replace SUPABASE_URL and SUPABASE_KEY with your actual values

echo "=== Testing Supabase Connection ==="
echo ""

# These should be set in Vercel Environment Variables
SUPABASE_URL="${SUPABASE_URL:-https://your-project.supabase.co}"
SUPABASE_KEY="${SUPABASE_KEY:-your-anon-key}"
TABLE="backlog_entries"

echo "Supabase URL: $SUPABASE_URL"
echo "Table: $TABLE"
echo ""

# Test POST request
echo "Testing POST request..."
curl -X POST "${SUPABASE_URL}/rest/v1/${TABLE}" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "session_id": "test-curl-123",
    "question": "Test Frage",
    "answer": "Test Antwort",
    "is_pricing_question": false
  }' \
  -v 2>&1 | grep -E "(< HTTP|error|success)" | head -10

echo ""
echo "=== Test Complete ==="

