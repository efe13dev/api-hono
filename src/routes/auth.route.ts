import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';
import { registerSchema, loginSchema } from '../schemas/authSchemas';

export const authRouter = new Hono();

authRouter.post('/register', zValidator('json', registerSchema), async (c) => {
	// 1. Obtener los datos del usuario del body validarlos.
	// 2. Validar los datos del usuario
	const { email, password, username } = c.req.valid('json');

	// 3. Verificar que el usuario no existe
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));

	if (user) {
		return c.json({ message: 'The email is already registered' }, 409);
	}

	// 4. Hacer el hash de la contraseña
	const hashedPassword = await Bun.password.hash(password);

	// 5. Guardar el usuario en la base de datos
	const [newUser] = await db
		.insert(usersTable)
		.values({
			email,
			password: hashedPassword,
			username,
		})
		.returning({
			id: usersTable.id,
			username: usersTable.username,
			email: usersTable.email,
		});
	// 6. Enviar una respuesta
	return c.json({ newUser }, 201);
});

authRouter.post('/login', zValidator('json', loginSchema), async (c) => {
	// 1. Obtener los datos del usuario del body
	// 2. Validar los datos del usuario
	const { email, password } = c.req.valid('json');

	// 3. Verificar si el usario existe en la base de datos
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));

	if (!user) {
		return c.json({ message: 'User or password is incorrect' }, 404);
	}

	// 4. Verificar que la contraseña sea correcta
	const isPasswordValid = await Bun.password.verify(password, user.password);

	if (!isPasswordValid) {
		return c.json({ message: 'User or password is incorrect' }, 404);
	}

	// 5. Generar un token de autenticacion JWT
	const payload = {
		id: user.id,
		email: user.email,
	};
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		return c.json({ message: 'Internal server error' }, 500);
	}

	const token = await sign(payload, secret);

	// 6. Devolver el token
	return c.json({ token: token }, 200);
});
