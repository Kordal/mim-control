import { redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import { db } from '$lib/server/db';
import { incidents } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';
import { resolve } from 'path';

const SEVERITY_OPTIONS = ['P1', 'P2', 'P3'] as const;
const STATUS_OPTIONS = ['ONGOING', 'MITIGATED', 'SOLVED'] as const;

const createIncidentSchema = v.object({
	publicId: v.string(),
	title: v.string(),
	description: v.optional(v.string()),
	status: v.picklist(STATUS_OPTIONS),
	severity: v.picklist(SEVERITY_OPTIONS),
	impactedServices: v.optional(v.string())
});

export const createIncident = form(
	createIncidentSchema,
	async ({ publicId, title, severity, description, status, impactedServices }) => {
		const { locals } = getRequestEvent();

		const servicesArray = impactedServices ? impactedServices.split(',').filter(Boolean) : [];

		const incident = await db
			.insert(incidents)
			.values({
				publicId,
				title,
				severity,
				description,
				impactedServices: servicesArray,
				status,
				commanderId: locals.user?.id ?? null,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning({
				id: incidents.id
			});

		const result = incident[0];
		if (result) {
			redirect(303, `/incidents/${result.id}/assemble`);
		}

		return result;
	}
);

export const getIncidentDetail = query('unchecked', async (id: string) => {
	const result = await db.select().from(incidents).where(eq(incidents.id, id)).limit(1);
	return result[0] ?? null;
});
