CREATE TABLE IF NOT EXISTS `request_records` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL DEFAULT 'request',
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`payload` text NOT NULL,
	`status` text NOT NULL,
	`token_hash` text NOT NULL,
	`created` text NOT NULL,
	`archived` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `contact_records` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL DEFAULT 'contact',
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`payload` text NOT NULL,
	`status` text NOT NULL,
	`token_hash` text NOT NULL,
	`created` text NOT NULL,
	`archived` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT OR IGNORE INTO `request_records` (id,kind,name,email,phone,payload,status,token_hash,created,archived)
SELECT id,kind,name,email,phone,payload,status,token_hash,created,archived FROM `records` WHERE kind='request';
--> statement-breakpoint
INSERT OR IGNORE INTO `contact_records` (id,kind,name,email,phone,payload,status,token_hash,created,archived)
SELECT id,kind,name,email,phone,payload,status,token_hash,created,archived FROM `records` WHERE kind='contact';
