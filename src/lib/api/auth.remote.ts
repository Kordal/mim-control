import { invalid, redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import * as v from 'valibot';
import { auth } from '$lib/auth';

const signupSchema = v.object({
	name: v.pipe(v.string(), v.minLength(3, 'Please enter a name of at least 3 characters.')),
	email: v.pipe(v.string(), v.email('Please enter a valid email address.')),
	password: v.pipe(v.string(), v.minLength(6, 'Please enter a password of at least 6 characters.'))
});

const loginSchema = v.object({
	email: v.pipe(v.string(), v.email('Please enter a valid email address.')),
	password: v.pipe(v.string(), v.minLength(6, 'Please enter a password of at least 6 characters.'))
});

export const signup = form(signupSchema, async (user) => {
	await auth.api.signUpEmail({ body: user });
	redirect(307, `/`);
});

export const login = form(loginSchema, async (user) => {
	const { request } = getRequestEvent();
	try {
		await auth.api.signInEmail({ body: user, headers: request.headers });
		redirect(303, '/');
	} catch (error) {
		//TOOD: Remove console.log
		console.log(error);
	}
});

export const signout = form(async () => {
	const { request } = getRequestEvent();
	await auth.api.signOut({ headers: request.headers });
	redirect(303, '/');
});

export const getUser = query(async () => {
	const { locals } = getRequestEvent();
	return locals.user;
});
