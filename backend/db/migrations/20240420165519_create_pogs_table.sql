-- migrate:up
CREATE TABLE Pogs (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    symbol VARCHAR NOT NULL,
    current_price NUMERIC NOT NULL,
    previous_price NUMERIC NOT NULL DEFAULT 0,
    color VARCHAR NOT NULL,
    owner INTEGER,
    CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES Users(id),
    CONSTRAINT previous_price_default CHECK (previous_price = 0 OR previous_price = current_price)
);

CREATE OR REPLACE FUNCTION update_previous_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.previous_price := OLD.current_price;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_previous_price_trigger
BEFORE UPDATE ON Pogs
FOR EACH ROW
EXECUTE FUNCTION update_previous_price();


-- migrate:down
DROP TABLE Pogs;
