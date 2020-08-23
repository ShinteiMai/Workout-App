# stronk

Workout App for Chads, presented by Chad Academy.

### BACKEND API

#### Authentication

/register
/login
/logout
/me

/user
/users

#### Routines

/routines
METHOD: GET
data: None
description:
Get all routines from the database

/routine
METHOD: GET, POST, PUT, DELETE
data:

- GET, DELETE
  - id - String
- POST
  - title - String
  - description - String
- PUT
  - id - String
  - title - String
  - description - String

/routine/push-exercise
METHOD: POST
data:

- POST
  - routine_id - String
  - exercise_id - String
    /routine/pop-exercise
- POST
  - routine_id - String
  - exercise_id - String

#### Exercises

/exercises
METHOD: GET
data: None
Description:
Get all exercises from the database

/exercise
METHOD: GET, POST, PUT, DELETE
data:

- GET, DELETE:
  - id - String
- POST:
  - name - String
  - sets - Number (integer)
  - reps - Number (integer)
- PUT:
  - id - String
  - name? - String
  - sets? - Number (integer)
  - reps? - Number (integer)
    Description:
    Perform CRUD on exercise model
