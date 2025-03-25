import { Hono } from 'hono';

export const authRouter = new Hono();

authRouter.post('/register', async (c) => {
	// 1. Obtener los datos del usuario del body
	const { email, password } = await c.req.json();
	console.log(email, password);

	// 2. Validar los datos del usuario
	// 3. Verificar que el usuario no existe
	// 4. Hacer el hash de la contraseña
	// 5. Guardar el usuario en la base de datos
	// 6. Enviar una respuesta

	return c.json({ message: 'Register' });
	//1. Obtener los datos del usuario del body
	// 2. Validar los datos del usuario
	// 3. Verificar si el usario existe en la base de datos
	// 4. Verificar que la contraseña sea correcta
	// 5. Generar un token de autenticacion JWT
	// 6. Devolver el token
});

authRouter.post('/login', async (c) => {
	return c.json({ message: 'Login' });
});
