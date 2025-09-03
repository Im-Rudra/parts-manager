CREATE TABLE `devices_to_parts` (
	`device_id` integer,
	`parts_id` integer,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"',
	PRIMARY KEY(`device_id`, `parts_id`),
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parts_id`) REFERENCES `parts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `parts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100) NOT NULL,
	`description` text,
	`parts_type_id` integer,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"',
	FOREIGN KEY (`parts_type_id`) REFERENCES `parts_types`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `parts_name_unique` ON `parts` (`name`);--> statement-breakpoint
CREATE TABLE `parts_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`description` text,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `parts_types_name_unique` ON `parts_types` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_brands` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`country` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"'
);
--> statement-breakpoint
INSERT INTO `__new_brands`("id", "name", "country", "description", "created_at") SELECT "id", "name", "country", "description", "created_at" FROM `brands`;--> statement-breakpoint
DROP TABLE `brands`;--> statement-breakpoint
ALTER TABLE `__new_brands` RENAME TO `brands`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `Brand name must be unique` ON `brands` (`name`);--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`description` text,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"'
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "name", "description", "created_at") SELECT "id", "name", "description", "created_at" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE TABLE `__new_devices_to_categories` (
	`device_id` integer,
	`category_id` integer,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"',
	PRIMARY KEY(`device_id`, `category_id`),
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_devices_to_categories`("device_id", "category_id", "created_at") SELECT "device_id", "category_id", "created_at" FROM `devices_to_categories`;--> statement-breakpoint
DROP TABLE `devices_to_categories`;--> statement-breakpoint
ALTER TABLE `__new_devices_to_categories` RENAME TO `devices_to_categories`;--> statement-breakpoint
CREATE TABLE `__new_devices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100) NOT NULL,
	`brand` integer,
	`model` text(100) NOT NULL,
	`release_year` integer,
	`created_at` integer DEFAULT '"2025-09-03T20:20:09.278Z"',
	FOREIGN KEY (`brand`) REFERENCES `brands`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_devices`("id", "name", "brand", "model", "release_year", "created_at") SELECT "id", "name", "brand", "model", "release_year", "created_at" FROM `devices`;--> statement-breakpoint
DROP TABLE `devices`;--> statement-breakpoint
ALTER TABLE `__new_devices` RENAME TO `devices`;--> statement-breakpoint
CREATE UNIQUE INDEX `devices_model_unique` ON `devices` (`model`);