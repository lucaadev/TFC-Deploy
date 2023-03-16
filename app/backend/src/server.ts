import { App } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 6602;

new App().start(PORT);
