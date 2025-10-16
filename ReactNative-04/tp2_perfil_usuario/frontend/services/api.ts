import { User } from '../types/User';

type LoginData = {
  email: string;
  password: string;
};

export async function login(data: LoginData): Promise<User> {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    const user = await response.json();
    return user as User;
  } else if (response.status === 401) {
    throw new Error('Credenciales incorrectas');
  } else {
    throw new Error('Error del servidor');
  }
}

type OAuthData = {
  email: string;
  nombre: string;
  googleId: string;
};

export async function loginWithOAuth(data: OAuthData): Promise<User> {
  const response = await fetch('http://localhost:3001/api/oauth-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return (await response.json()) as User;
  } else {
    const err = await response.json();
    throw new Error(err.error || 'Error al login OAuth');
  }
}

export async function updateUser(user: User): Promise<User> {
  const response = await fetch(`http://localhost:3001/api/users/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar usuario');
  }

  return response.json();
}
