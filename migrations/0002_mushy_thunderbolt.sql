PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_study_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`subject` text NOT NULL,
	`duration` integer NOT NULL,
	`date` text NOT NULL,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_study_sessions`("id", "user_id", "subject", "duration", "date", "notes", "created_at") SELECT "id", "user_id", "subject", "duration", "date", "notes", "created_at" FROM `study_sessions`;--> statement-breakpoint
DROP TABLE `study_sessions`;--> statement-breakpoint
ALTER TABLE `__new_study_sessions` RENAME TO `study_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;