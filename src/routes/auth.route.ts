import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema } from '../schemas/authSchemas';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';

export const authRouter = new Hono();

authRouter.post('/register', zValidator('json', registerSchema), async (c) => {
	// 1. Obtener los datos del usuario del body y validarlos

	const { email, password, username } = c.req.valid('json');

	// 3. Verificar que el usuario no existe
	const [existingUser] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));

	if (existingUser) {
		return c.json({ message: 'The email is already registered' }, 409);
	}

	// 4. Hacer el hash de la contraseña
	const hashedPassword = await Bun.password.hash(password);

	// 5. Guardar el usuario en la base de datos
	await db.insert(usersTable).values({
		email,
		password: hashedPassword,
		username,
	});
	// 6. Enviar una respuesta
	return c.json({ message: `User ${username} registered successfully` }, 201);
});

//1. Obtener los datos del usuario del body
// 2. Validar los datos del usuario
// 3. Verificar si el usario existe en la base de datos
// 4. Verificar que la contraseña sea correcta
// 5. Generar un token de autenticacion JWT
// 6. Devolver el token
authRouter.post('/login', zValidator('json', loginSchema), async (c) => {
	return c.json({ message: 'Login' });
});
