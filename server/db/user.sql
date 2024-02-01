create table user (
    id text,
    first_name text,
    last_name text,
    age integer,
    active integer
);

alter table user add column created_at integer not null default 0;
alter table user rename column age to dob;