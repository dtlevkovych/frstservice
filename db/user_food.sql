create table user_food (
    id text,
    user_id text,
    food_id text,
    unique(user_id, food_id)
);