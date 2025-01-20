import { cookies } from 'next/headers';

export function getTokenFromCookies() {
  // Server-side token retrieval
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('album-token')?.value;
    
    if (token) {
      return token;
    }
  } catch (serverError) {
    // Server-side retrieval failed (e.g., in client components)
    console.log('Server-side token retrieval failed');
  }

  // Client-side token retrieval
  if (typeof window !== 'undefined') {
    const clientCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('album-token='))
      ?.split('=')[1];
    
    return clientCookie || '';
  }

  return '';
}

// Optional: Server-side only version
export function getServerToken() {
  try {
    const cookieStore = cookies();
    return cookieStore.get('album-token')?.value || '';
  } catch {
    return '';
  }
}
