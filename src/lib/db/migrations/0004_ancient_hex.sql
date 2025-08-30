DROP INDEX `brands_name_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `Brand name must be unique` ON `brands` (`name`);