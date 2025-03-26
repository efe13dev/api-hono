import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

export const authRouter = new Hono();

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
	username: z.string().min(3),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});

authRouter.post('/register', zValidator('json', registerSchema), async (c) => {
	// 1. Obtener los datos del usuario del body y validarlos

	const { email, password, username } = c.req.valid('json');

	// 3. Verificar que el usuario no existe
	// 4. Hacer el hash de la contraseña
	// 5. Guardar el usuario en la base de datos
	// 6. Enviar una respuesta

	return c.json({ message: 'Usuario registrado correctamente' }, 201);
	//1. Obtener los datos del usuario del body
	// 2. Validar los datos del usuario
	// 3. Verificar si el usario existe en la base de datos
	// 4. Verificar que la contraseña sea correcta
	// 5. Generar un token de autenticacion JWT
	// 6. Devolver el token
});

authRouter.post('/login', zValidator('json', loginSchema), async (c) => {
	return c.json({ message: 'Login' });
});
