import { redirect } from '@sveltejs/kit';
import { form, getRequestEvent, query } from '$app/server';
import { db } from '$lib/server/db';
import { incidentLogs, incidents, incidentUpdates } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';
import { resolve } from 'path';

const SEVERITY_OPTIONS = ['P1', 'P2', 'P3'] as const;
const STATUS_OPTIONS = ['ONGOING', 'MITIGATED', 'SOLVED'] as const;

//INCIDENT TABLE
const createIncidentSchema = v.object({
	incId: v.string(),
	title: v.string(),
	description: v.optional(v.string()),
	status: v.picklist(STATUS_OPTIONS),
	severity: v.picklist(SEVERITY_OPTIONS),
	impactedServices: v.optional(v.string())
});

export const createIncident = form(
	createIncidentSchema,
	async ({ incId, title, severity, description, status, impactedServices }) => {
		const { locals } = getRequestEvent();

		const servicesArray = impactedServices ? impactedServices.split(',').filter(Boolean) : [];

		const incident = await db
			.insert(incidents)
			.values({
				incId,
				title,
				severity,
				description,
				impactedServices: servicesArray,
				status,
				mimInChargeId: locals.user?.id ?? null,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning({
				id: incidents.id
			});

		const result = incident[0];
		if (result) {
			redirect(303, `/incidents/${result.id}/mim`);
		}

		return result;
	}
);

export const getIncidentDetail = query('unchecked', async (id: string) => {
	const result = await db.select().from(incidents).where(eq(incidents.id, id)).limit(1);
	return result[0] ?? null;
});

export const getAllIncidets = query('unchecked', async () => {
	const result = await db.select().from(incidents);
	return result;
});

//INCIDENT UPDATES TABLE
const createIncidentUpdateSchema = v.object({
	incidentId: v.pipe(v.string(), v.uuid()),
	title: v.string(),
	description: v.optional(v.string()),
	type: v.picklist(['Info', 'Hypothesis', 'Decision', 'Action', 'Status']) // Remove v.optional()
});

export const createIncidentUpdate = form(
	createIncidentUpdateSchema,
	async ({ incidentId, title, description, type }) => {
		// Changed incId to incidentId
		const { locals } = getRequestEvent();

		const incidentUpdate = await db
			.insert(incidentUpdates)
			.values({
				incId: incidentId, // Now it's clear we're using the incident's database ID
				title,
				description,
				type,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning({
				id: incidentUpdates.id
			});

		return incidentUpdate;
	}
);

export const getIncidentUpdates = query('unchecked', async (id: string) => {
	const result = await db.select().from(incidentUpdates).where(eq(incidentUpdates.incId, id));
	return result;
});

const createIncidentLogSchema = v.object({
	incidentId: v.pipe(v.string(), v.uuid()),
	type: v.string(),
	description: v.string(),
	metadata: v.optional(v.string())
});

export const createIncidentLog = form(
	createIncidentLogSchema,
	async ({ incidentId, type, description, metadata }) => {
		const { locals } = getRequestEvent();

		const incidentLog = await db
			.insert(incidentLogs)
			.values({
				incId: incidentId,
				type,
				description,
				metadata,
				userId: locals.user!.id,
				userName: locals.user!.name,
				timestamp: new Date()
			})
			.returning({
				id: incidentLogs.id
			});

		return incidentLog;
	}
);

export const getIncidentLogs = query('unchecked', async (id: string) => {
	const result = await db.select().from(incidentLogs).where(eq(incidentLogs.incId, id));
	return result;
});
