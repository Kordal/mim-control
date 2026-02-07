import { relations } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	boolean,
	index,
	pgEnum,
	uuid,
	decimal,
	integer,
	json
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	role: text('role', { enum: ['MIM', 'Ops', 'Business'] }).default('Ops'),
	banned: boolean('banned').default(false),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires')
});

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at').notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		impersonatedBy: text('impersonated_by')
	},
	(table) => [index('session_userId_idx').on(table.userId)]
);

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('account_userId_idx').on(table.userId)]
);

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));

//INCIDENT TABLE
export const severityEnum = pgEnum('severity', ['P1', 'P2', 'P3']);
export const statusEnum = pgEnum('status', ['ONGOING', 'MITIGATED', 'SOLVED']);

// 2. The Incidents Table
export const incidents = pgTable('incidents', {
	id: uuid('id').defaultRandom().primaryKey(),
	incId: text('inc_id').notNull().unique(), // e.g. "INC-1001"
	title: text('title').notNull(),
	description: text('description'), // "User Impact"

	status: statusEnum('status').default('ONGOING').notNull(),
	severity: severityEnum('severity').default('P1').notNull(),

	mimInChargeId: text('mim_in_charge_id').references(() => user.id),
	impactedServices: text('impacted_services').array(), // Postgres Array

	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	resolvedAt: timestamp('resolved_at')
});

// 3. Define Relations (For easy querying later)
export const incidentRelations = relations(incidents, ({ one }) => ({
	mimInCharge: one(user, {
		fields: [incidents.mimInChargeId],
		references: [user.id]
	})
}));

//INCIDENT UPDATES TABLE
export const incidentUpdates = pgTable('incident_updates', {
	id: uuid('id').defaultRandom().primaryKey(),

	//HERE WE ARE USING THE ID OF THE INCIDENT TABLE, NOT THE INCID (not from ServiceNow eg.)
	incId: uuid('inc_id')
		.notNull()
		.references(() => incidents.id, { onDelete: 'cascade' }),
	type: text('type').notNull(),
	title: text('title').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Define the relationship FROM the incidents table
export const incidentsRelations = relations(incidents, ({ many, one }) => ({
	updates: many(incidentUpdates),
	logs: many(incidentLogs), // ADD THIS
	mimInCharge: one(user, {
		fields: [incidents.mimInChargeId],
		references: [user.id]
	})
}));

// Define the relationship FROM the incidentUpdates table
export const incidentUpdatesRelations = relations(incidentUpdates, ({ one }) => ({
	incident: one(incidents, {
		fields: [incidentUpdates.incId], // The field in THIS table
		references: [incidents.id] // The field in the OTHER table
	})
}));

//INCIDENT LOG TABLE

export const incidentLogs = pgTable(
	'incident_logs',
	{
		id: uuid('id').defaultRandom().primaryKey(),

		// Reference to incident
		incId: uuid('inc_id')
			.notNull()
			.references(() => incidents.id, { onDelete: 'cascade' }),

		// Log details - type accepts any string
		type: text('type').notNull(),
		description: text('description').notNull(),

		// Who performed the action
		userId: text('user_id')
			.notNull()
			.references(() => user.id),
		userName: text('user_name').notNull(),

		// Optional metadata as JSON
		metadata: json('metadata').$type<Record<string, any>>().default({}),

		// Timestamp
		timestamp: timestamp('timestamp').defaultNow().notNull()
	},
	(table) => [
		index('incident_logs_incId_idx').on(table.incId),
		index('incident_logs_timestamp_idx').on(table.timestamp)
	]
);

export const incidentLogsRelations = relations(incidentLogs, ({ one }) => ({
	incident: one(incidents, {
		fields: [incidentLogs.incId],
		references: [incidents.id]
	}),
	user: one(user, {
		fields: [incidentLogs.userId],
		references: [user.id]
	})
}));

//SERIVCES table

export const services = pgTable('services', {
	id: uuid('id').defaultRandom().primaryKey(),

	// Service identification
	name: text('name').notNull().unique(), // e.g., 'Mobile App', 'API Gateway', 'Payment Service'
	displayName: text('display_name').notNull(), // User-friendly name

	// Service metadata
	description: text('description'), // What this service does
	type: text('type').notNull(), // e.g., 'frontend', 'backend', 'database', 'infrastructure'
	category: text('category'), // e.g., 'customer-facing', 'internal', 'third-party'

	// Status and health

	healthCheckUrl: text('health_check_url'), // For monitoring

	// Ownership
	ownerId: text('owner_id').references(() => user.id), // Primary owner/responsible person
	teamId: text('team_id'), // If you have teams

	// SLA and criticality
	criticalityLevel: text('criticality_level').notNull().default('medium'), // 'low' | 'medium' | 'high' | 'critical'
	slaUptime: integer('sla_uptime').default(99), // SLA target (percentage)

	// Dependencies (JSON array of service IDs)
	dependencies: json('dependencies').$type<string[]>().default([]), // Services this one depends on

	// Contact info
	slackChannel: text('slack_channel'), // e.g., '#mobile-app-alerts'
	pagerDutyKey: text('pagerduty_key'), // Integration key
	documentationUrl: text('documentation_url'),

	// Metadata
	isActive: boolean('is_active').notNull().default(true), // Soft delete
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const warRoomPresence = pgTable('war_room_presence', {
	id: uuid('id').defaultRandom().primaryKey(),
	incId: uuid('inc_id')
		.notNull()
		.references(() => incidents.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	userName: text('user_name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastSeen: timestamp('last_seen').defaultNow().notNull()
});
