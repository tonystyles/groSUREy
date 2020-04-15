CREATE TABLE "users"
(
  "_id" serial NOT NULL,
  "username" varchar(255) NOT NULL UNIQUE,
  "profile_pic" bigint,
  "password" varchar(255) NOT NULL,
  "full_name" varchar(255) NOT NULL,
  "alias" varchar(255),
  "email" varchar(255) NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
);



CREATE TABLE "groups"
(
  "_id" serial NOT NULL,
  "groupname" varchar(255) NOT NULL UNIQUE,
  "alias" varchar(255),
  "picture" bigint,
  CONSTRAINT "groups_pk" PRIMARY KEY ("_id")
);



CREATE TABLE "user_groups"
(
  "_id" serial NOT NULL,
  "user_id" bigint NOT NULL,
  "group_id" bigint NOT NULL,
  CONSTRAINT "user_groups_pk" PRIMARY KEY ("_id")
);



CREATE TABLE "lists"
(
  "_id" serial NOT NULL,
  "group_id" bigint NOT NULL,
  "name" varchar(255) NOT NULL,
  CONSTRAINT "lists_pk" PRIMARY KEY ("_id")
);


-- removed, stretch feature
-- CREATE TABLE "item_types"
-- (
--   "_id" serial NOT NULL,
--   "name" varchar(255) NOT NULL,
--   "max_price" bigint,
--   "brand" varchar(255),
--   "notes" varchar,
--   "group_id" bigint NOT NULL,
--   "picture" bigint,
--   CONSTRAINT "item_types_pk" PRIMARY KEY ("_id")
-- );


CREATE TABLE "items"
(
  "_id" serial NOT NULL,
  "type_id" bigint NOT NULL,
  "quantity" bigint NOT NULL,
  "max_price" bigint,
  "brand" varchar(255),
  "notes" varchar,
  "checked" boolean NOT NULL,
  "picture" varchar(255),
  "list_id" bigint NOT NULL,
  CONSTRAINT "items_pk" PRIMARY KEY ("_id")
);





ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_fk1" FOREIGN KEY ("group_id") REFERENCES "groups"("_id");

ALTER TABLE "lists" ADD CONSTRAINT "lists_fk0" FOREIGN KEY ("group_id") REFERENCES "groups"("_id");

ALTER TABLE "item_types" ADD CONSTRAINT "item_types_fk0" FOREIGN KEY ("group_id") REFERENCES "groups"("_id");

-- ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("type_id") REFERENCES "item_types"("_id");
ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("list_id") REFERENCES "lists"("_id");

