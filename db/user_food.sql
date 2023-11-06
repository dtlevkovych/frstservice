create table user_food (
    id text,
    user_id text,
    food_id text,
    unique(user_id, food_id)
);

alter table user_food add column created_at integer not null default 0;