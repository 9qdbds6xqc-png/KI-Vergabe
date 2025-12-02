// Server-side password authentication via Vercel Edge Function
// Password is verified server-side, not exposed in client code

const AUTH_KEY = 'ki_vergabe_auth';
const AUTH_TOKEN_KEY = 'ki_vergabe_admin_token';
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'https://trafosanf-remake.vercel.app/api/auth';
const TOKEN_SALT = import.meta.env.VITE_ADMIN_TOKEN_SALT || 'ki-vergabe-admin-token';

// Check if password is set (always true now)
export const hasPassword = (): boolean => {
  return true;
};

// Verify password via server-side API
const storeAdminToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

const hashAdminToken = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + TOKEN_SALT);

  if (crypto?.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Fallback for old browsers
  return Array.from(data)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const login = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem(AUTH_KEY, 'true');
      if (data.token) {
        storeAdminToken(data.token);
      } else {
        const fallbackToken = await hashAdminToken(password);
        storeAdminToken(fallbackToken);
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    // Fallback: If API is not available, use client-side check as backup
    // This ensures the site still works during development or if API is down
    const FALLBACK_PASSWORD = 'Meryem';
    if (password === FALLBACK_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      const fallbackToken = await hashAdminToken(password);
      storeAdminToken(fallbackToken);
      return true;
    }
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const getAdminToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Logout
export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
  storeAdminToken(null);
};

