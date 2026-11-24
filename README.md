# Lab 14.1 — Basic Login System

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