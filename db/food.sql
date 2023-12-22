create table food (
    id text,
    name text,
    rateId text not null
);

alter table food rename column rateId to rate_id;