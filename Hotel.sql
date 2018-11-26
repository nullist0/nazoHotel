CREATE TABLE `Department` 
(
	`name` varchar(255),
	`population` int,
	PRIMARY KEY(`name`)
);

CREATE TABLE `Customer` 
(
	`customer_id` int AUTO_INCREMENT,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`gender` varchar(255),
	`birthday` date,
	`mobile_number` int,
	`city` varchar(255),
	`street` varchar(255),
	`zip` int,
	`email` varchar(255),
	`membership` int,
	PRIMARY KEY(`customer_id`)
);

CREATE TABLE `Employee` 
(
	`employee_id` int AUTO_INCREMENT,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`department` varchar(255),
	`city` varchar(255),
	`street` varchar(255),
	`zip` int,
	`email` varchar(255),
	`gender` varchar(255),
	`mobile_number` int,
	`start_work` date,
	`salary` int,
	`responsible` int,
	PRIMARY KEY(`employee_id`),
	FOREIGN KEY(`department`) REFERENCES `Department`(`name`)
);

CREATE TABLE `Facility` 
(
	`facility_id` int AUTO_INCREMENT,
	`floor` int,
	`type` varchar(255),
	`main_staff_id` int,
	`sub_staff_id` int,
	PRIMARY KEY(`facility_id`),
	FOREIGN KEY(`main_staff_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`sub_staff_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Room` 
(
	`room_id` int,
	`room_type` varchar(255),
	`room_price` int,
	`view` varchar(255),
	`equipment` varchar(255),
	`main_staff_id` int,
	`sub_staff_id`int,
	PRIMARY KEY(`room_id`),
	FOREIGN KEY(`main_staff_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`sub_staff_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Claim` 
(
	`claim_id` int AUTO_INCREMENT,
	`room_id` int,
	`customer_call` varchar(255),
	`department` varchar(255),
	`deadline` varchar(255),
	PRIMARY KEY(`claim_id`),
	FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`)
);

CREATE TABLE `Vacation` 
(
	`employee_id` int,
	`start_date` timestamp,
	`end_date` timestamp,
	PRIMARY KEY(`employee_id`, `start_date`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Time_table` 
(
	`employee_id` int,
	`date` date,
	`enter_time` timestamp,
	`leave_time` timestamp,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Book` 
(
	`book_id` int AUTO_INCREMENT,
	`room_id` int,
	`customer_id` int,
	`check_in` timestamp,
	`check_out` timestamp,
	`book_price` int,
	`option_price` int,
	`total_price` int,
	PRIMARY KEY(`book_id`),
	FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`),
	FOREIGN KEY(`customer_id`) REFERENCES `Customer`(`customer_id`)
);

CREATE TABLE `Option_Kind` 
(
	`option_name` varchar(255),
	`option_price_per_num` int,
	PRIMARY KEY(`option_name`)
);

CREATE TABLE `Option` 
(
	`book_id` int,
	`option_name` varchar(255),
	`apply_num` int,
	PRIMARY KEY(`book_id`,`option_name`),
	FOREIGN KEY(`book_id`) REFERENCES `Book`(`book_id`),
	FOREIGN KEY(`option_name`) REFERENCES `Option_Kind`(`option_name`)
);

CREATE TABLE `Take` 
(
	`claim_id` int,
	`employee_id` int,
	`finish_time` timestamp,
	PRIMARY KEY(`claim_id`, `employee_id`),
	FOREIGN KEY(`claim_id`) REFERENCES `Claim`(`claim_id`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE `Use` 
(
	`facility_id` int,
	`room_id` int,
	`date` timestamp,
	`start_time` timestamp,
	`end_time` timestamp,
	PRIMARY KEY(`facility_id`, `room_id`, `date`),
	FOREIGN KEY(`room_id`) REFERENCES `Room`(`room_id`),
	FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);

CREATE TABLE `Fix` 
(
	`fix_id` int,
	`facility_id` int,
	`employee_id` int,
	`fixed_time` timestamp,
	PRIMARY KEY(`fix_id`),
	FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`employee_id`),
	FOREIGN KEY(`facility_id`) REFERENCES `Facility`(`facility_id`)
);

