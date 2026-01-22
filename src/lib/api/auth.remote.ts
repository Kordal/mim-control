import { redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import * as v from 'valibot';
import { auth } from '$lib/auth';

const signupSchema = v.object({
	name: v.pipe(v.string(), v.minLength(3)),
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(6))
});

const loginSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(6))
});

export const signup = form(signupSchema, async (user) => {
	await auth.api.signUpEmail({ body: user });
	redirect(307, `/`);
});

export const login = form(loginSchema, async (user) => {
	const { request } = getRequestEvent();
	await auth.api.signInEmail({ body: user, headers: request.headers });
	redirect(303, '/');
});

export const signout = form(async () => {
	const { request } = getRequestEvent();
	await auth.api.signOut({ headers: request.headers });
	redirect(303, '/');
});

export const getUser = query(async () => {
	const { locals } = getRequestEvent();
	if (!locals.user) {
		redirect(307, '/auth/login');
	}
	return locals.user;
});
