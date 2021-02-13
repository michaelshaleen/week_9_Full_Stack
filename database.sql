DROP TABLE "tasks";


CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(2048),
	"due_date" DATE
	);


INSERT INTO "tasks"("name", "due_date")
VALUES 
	('Start To Do List', '01-01-2022'),
	('Dishes', '01-01-2022');



SELECT * FROM "tasks"
WHERE "id"=1