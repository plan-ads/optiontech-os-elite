CREATE TABLE `ads_accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accountId` varchar(20) NOT NULL,
	`accountName` varchar(255) NOT NULL,
	`status` enum('pending','linked','rejected','disconnected') NOT NULL DEFAULT 'pending',
	`protectionEnabled` boolean NOT NULL DEFAULT false,
	`protectionLevel` enum('quick','medium','strong','nuclear') DEFAULT 'quick',
	`linkedAt` timestamp,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ads_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `link_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accountId` varchar(20) NOT NULL,
	`accountName` varchar(255) NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`notes` text,
	`processedAt` timestamp,
	`processedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `link_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`nameAr` varchar(100) NOT NULL,
	`description` text,
	`descriptionAr` text,
	`priceMonthly` decimal(10,2) NOT NULL,
	`priceYearly` decimal(10,2) NOT NULL,
	`maxAccounts` int NOT NULL DEFAULT 1,
	`protectionLevel` enum('quick','medium','strong','nuclear') NOT NULL DEFAULT 'quick',
	`features` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `protection_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accountId` int NOT NULL,
	`date` timestamp NOT NULL,
	`blockedClicks` int NOT NULL DEFAULT 0,
	`suspiciousClicks` int NOT NULL DEFAULT 0,
	`savedAmount` decimal(10,2) NOT NULL DEFAULT '0',
	`totalClicks` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `protection_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`planId` int NOT NULL,
	`status` enum('active','cancelled','expired','pending') NOT NULL DEFAULT 'pending',
	`billingCycle` enum('monthly','yearly') NOT NULL DEFAULT 'monthly',
	`startDate` timestamp NOT NULL DEFAULT (now()),
	`endDate` timestamp,
	`cancelledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
