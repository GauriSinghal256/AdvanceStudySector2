# Blog Backend

Simple Express + MongoDB backend: one configured admin can log in and create/edit/delete blogs, while public visitors can read blogs.

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
4. `npm run dev` (or `npm start`)

## How admin works
There is one admin account, configured with `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`. Public registration is disabled. On the first successful login, the configured admin user is created in MongoDB; later logins sync that account's password and admin role.

## Routes

### Auth — `/api/auth`
| Method | Route | Access | Body |
|---|---|---|---|
| POST | `/login` | Public | `{ email, password }` |
| GET | `/me` | Logged-in user | — |

### Blogs — `/api/blogs`
| Method | Route | Access | Body |
|---|---|---|---|
| GET | `/` | Public | — |
| GET | `/:id` | Public | — |
| POST | `/` | Admin only | `{ title, content, coverImage? }` |
| PUT | `/:id` | Admin only | `{ title?, content?, coverImage? }` |
| DELETE | `/:id` | Admin only | — |
| PUT | `/:id/like` | Logged-in user | — (toggles like) |

### Uploads — `/api/uploads`
| Method | Route | Access | Body |
|---|---|---|---|
| POST | `/image` | Admin only | multipart field `image` (max 5 MB) |

Send the JWT from login/register as `Authorization: Bearer <token>` for protected routes.
