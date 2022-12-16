# MD Diary

A simple markdown diary for everyday use. \

## Framework:

- ### React (frontend)
  
You need to add a hash key (using `crypt` or something) in the `.env` file. \

`npm start` in the directory to start. \

- ### Express (backend)

In the `.env` file you need to set a password, a `TOKEN_KEY` hash key, and add the corresponding databse values with <>. \

`npm run dev` to run. \

- ### Postgres (database)

You need to create a database named `diary`, then create a user with an encrypted password named `diary_user`. Finally, you need to grant all privileges on table entries to user and give it serial persimions on its serial (google it, and make sure you are on the database). \
