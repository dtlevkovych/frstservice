create table rate (
    id text,
    name text,
    value integer,
    created_at integer not null default 0
);
alter table rate add column color_hex text after value;