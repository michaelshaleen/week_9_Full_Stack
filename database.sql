DROP TABLE "tasks";


CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(2048),
	"due_date" DATE
  <!--"complete" BOOLEAN DEFAULT FALSE

	);


INSERT INTO "tasks"("name", "due_date", "complete")
VALUES 
	('Start To Do List', '01-01-2022', FALSE),
	('Dishes', '01-01-2022', FALSE);



SELECT * FROM "tasks"
WHERE "id"=1