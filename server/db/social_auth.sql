create table social_auth (
    username text not null,
    provider text not null,
    authentication text not null,
    PRIMARY KEY (username, provider)
);