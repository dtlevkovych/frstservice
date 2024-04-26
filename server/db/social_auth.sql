create table auth_user (
    authentication_id text not null,
    username text not null,
    provider text not null,
    name text,
    profile_pic text,
    PRIMARY KEY (authentication_id),
    CONSTRAINT auth_user UNIQUE (username, provider)
);