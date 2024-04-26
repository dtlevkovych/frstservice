create table auth_user (
    authentication_id text not null,
    username text not null,
    provider text not null,
    email text,
    name text,
    profile_pic text,
    updated_date integer not null default 0,
    PRIMARY KEY (authentication_id),
    CONSTRAINT auth_user UNIQUE (username, provider)
);