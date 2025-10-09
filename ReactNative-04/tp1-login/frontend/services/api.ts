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
