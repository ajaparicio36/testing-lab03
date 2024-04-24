-- migrate:up
CREATE TABLE Users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL DEFAULT 'user',
    funds FLOAT NOT NULL DEFAULT 300.00,
    owned_pogs VARCHAR
);

-- migrate:down
DROP TABLE Users
