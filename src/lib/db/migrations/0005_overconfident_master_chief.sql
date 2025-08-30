CREATE TABLE `devices_to_categories` (
	`device` integer,
	`category` integer,
	FOREIGN KEY (`device`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `device_categories`;