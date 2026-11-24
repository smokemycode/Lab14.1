# Lab 14.1 — Basic Login System

An Express + MongoDB API for the "Innovate Inc." user portal. Users can register (password hashed with bcrypt) and log in (password checked, signed JWT returned).

## Tech
Node.js · Express · MongoDB Atlas · Mongoose · bcrypt · jsonwebtoken · dotenv · ES modules

## Setup
1. Clone the repo and run `npm install`
2. Create a `.env` file in the project root:
```
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=a-long-random-secret
PORT=3000
```
3. Run `npm run dev`. You should see "Server is running" and "MongoDB connected".

## Endpoints
| Method | Path | Body | Success | Errors |
|---|---|---|---|---|
| POST | `/api/users/register` | `username`, `email`, `password` | 201 + user (no password) | 400 email taken / validation |
| POST | `/api/users/login` | `email`, `password` | 200 + `token` + user | 400 "Incorrect email or password." |

## How it works
- `models/User.js`: the schema, plus a **pre-save hook** that hashes the password, an **isCorrectPassword** method that compares with bcrypt, and a **toJSON** transform that hides the password.
- `routes/userRoutes.js`: register checks for an existing email before creating the user. Login finds the user, checks the password, and signs a JWT with only `_id` and `username`.
- `config/db.js`: connects to Atlas using `MONGO_URI`.

## Register tests (POST /api/users/register)
- New user → 201, password not in response
- Same email again → 400 "A user with that email already exists."
- Password under 8 characters → 400 validation error
- Bad email → 400 "Please fill a valid email address"
- Missing username → 400 "username is required"
- Atlas shows passwords saved as bcrypt hashes ($2b$10$...)

## Login tests (POST /api/users/login)
- Right email + password → 200 with signed JWT token and user (no password)
- Right email + wrong password → 400 "Incorrect email or password."
- Unknown email → 400 "Incorrect email or password." (same message so attackers can't tell which emails exist)
- Token payload holds only _id and username, signed with JWT_SECRET, expires in 2h

## Reflection
**What tripped me up**
- I imported `bcryptjs` but had installed `bcrypt`. The import name has to match `package.json`.
- My lesson showed `function (next)` in the pre-save hook, but Mongoose 9 removed `next` from async hooks.
- `app.use('/api/users', ...)` has to come after `express.json()`, or `req.body` is empty.
- I forgot to push once, and once forgot to save a file before committing. Now I run `git status` after every push.

**What I learned**
- **Hashing vs. storing:** the database never sees the real password, only a salted bcrypt hash.
- **Authentication vs. authorization:** login proves who you are. The JWT is the pass that lets later routes decide what you're allowed to do.
- **Generic error messages** keep attackers from finding out which emails are registered.
- A JWT's payload can be read by anyone, so it should only hold non-secret info like `_id` and `username`.
