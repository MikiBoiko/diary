DROP TABLE Entries;

CREATE TABLE Entries(
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    date DATE NOT NULL,
    timestamp timestamptz NOT NULL
);

INSERT INTO Entries (message, date, timestamp) VALUES('Hello I am Miki', (SELECT NOW()), (SELECT NOW()));
INSERT INTO Entries (message, date, timestamp) VALUES('And this is my Diary', (SELECT NOW()), (SELECT NOW()));