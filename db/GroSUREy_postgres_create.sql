CREATE TABLE "Users"
(
  "_id" serial NOT NULL,
  "username" varchar(255) NOT NULL UNIQUE,
  "profile_pic" bigint,
  "password" varchar(255) NOT NULL,
  "full_name" varchar(255) NOT NULL,
  "alias" varchar(255),
  "email" varchar(255) NOT NULL,
  CONSTRAINT "Users_pk" PRIMARY KEY ("_id")
)



CREATE TABLE "Groups"
(
  "_id" serial NOT NULL,
  "groupname" varchar(255) NOT NULL UNIQUE,
  "alias" varchar(255),
  "picture" bigint,
  CONSTRAINT "Groups_pk" PRIMARY KEY ("_id")
)



CREATE TABLE "UserGroups"
(
  "_id" serial NOT NULL,
  "user_id" bigint NOT NULL,
  "group_id" bigint NOT NULL,
  CONSTRAINT "UserGroups_pk" PRIMARY KEY ("_id")
)



CREATE TABLE "ShoppingList"
(
  "_id" serial NOT NULL,
  "group_id" bigint NOT NULL,
  "name" varchar(255) NOT NULL,
  CONSTRAINT "ShoppingList_pk" PRIMARY KEY ("_id")
)



CREATE TABLE "ItemType"
(
  "_id" serial NOT NULL,
  "name" varchar(255) NOT NULL,
  "max_price" bigint,
  "brand" varchar(255),
  "notes" varchar,
  "group_id" bigint NOT NULL,
  "picture" bigint,
  CONSTRAINT "ItemType_pk" PRIMARY KEY ("_id")
)



CREATE TABLE "Item"
(
  "_id" serial NOT NULL,
  "type_id" bigint NOT NULL,
  "quantity" bigint NOT NULL,
  "notes" varchar,
  "list_id" bigint NOT NULL,
  CONSTRAINT "Item_pk" PRIMARY KEY ("_id")
)





ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("_id");
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_fk1" FOREIGN KEY ("group_id") REFERENCES "Groups"("_id");

ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_fk0" FOREIGN KEY ("group_id") REFERENCES "Groups"("_id");

ALTER TABLE "ItemType" ADD CONSTRAINT "ItemType_fk0" FOREIGN KEY ("group_id") REFERENCES "Groups"("_id");

ALTER TABLE "Item" ADD CONSTRAINT "Item_fk0" FOREIGN KEY ("type_id") REFERENCES "ItemType"("_id");
ALTER TABLE "Item" ADD CONSTRAINT "Item_fk1" FOREIGN KEY ("list_id") REFERENCES "ShoppingList"("_id");

