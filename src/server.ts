import { Hono } from 'hono';
import { authRouter } from './routes/auth.route';

const app = new Hono();

app.route('/api/v1/auth', authRouter);

export default app;
