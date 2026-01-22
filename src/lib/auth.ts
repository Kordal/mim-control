import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { db } from './server/db';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	user: {
		additionalFields: {
			role: {
				type: ['MIM', 'Ops', 'Business'],
				required: false,
				defaultValue: 'Ops',
				input: false // don't allow user to set role
			}
		}
	},
	database: drizzleAdapter(db, {
		provider: 'pg' // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [
		admin({
			defaultRole: 'Ops'
		}),
		sveltekitCookies(getRequestEvent)
	]
});
