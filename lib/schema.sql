CREATE TABLE "users" (
  "user_id" SERIAL UNIQUE PRIMARY KEY,
  "user_email" text NOT NULL,
  "password" varchar(255) NOT NULL,
  "token" varchar(255) NOT NULL
);
CREATE TABLE "friends" (
  "friend_id" SERIAL UNIQUE PRIMARY KEY,
  "current_user" int,
  "friend" int
);
CREATE TYPE status AS ENUM ('pending', 'active', 'done', 'late');
CREATE TABLE "todos" (
  "todo_id" SERIAL UNIQUE PRIMARY KEY,
  "start_date" timestamp,
  "duration" timestamp NOT NULL,
  "todo_body" text NOT NULL,
  "category" text,
  "status" status,
  "user_id" int
);
ALTER TABLE "friends" ADD FOREIGN KEY ("current_user") REFERENCES "users" ("user_id");
ALTER TABLE "friends" ADD FOREIGN KEY ("friend") REFERENCES "users" ("user_id");
ALTER TABLE "todos" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
