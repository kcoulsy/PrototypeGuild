# PrototypeGuild Setup Guide

This guide will help you set up the PrototypeGuild application with SQLite database.

## Prerequisites

-   Node.js 20 or later
-   npm or yarn

## Quick Setup

1. **Clone and install dependencies:**

    ```bash
    npm install
    ```

2. **Set up environment variables:**

    ```bash
    cp env.example .env
    ```

    Edit `.env` and update the values as needed:

    - `DATABASE_URL`: SQLite database file path (default: `file:./dev.db`)
    - `JWT_SECRET`: A secure random string for JWT tokens
    - `RECAPTCHA_SECRET` and `RECAPTCHA_KEY`: reCAPTCHA credentials (optional for development)

3. **Set up the database:**
    ```bash
    npm run setup
    ```
    This will:
    - Create the SQLite database
    - Run database migrations
    - Seed the database with initial data including an admin user

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run start` - Start production server
-   `npm run db:push` - Push schema changes to database
-   `npm run db:seed` - Seed database with initial data
-   `npm run db:reset` - Reset database and reseed
-   `npm run db:studio` - Open Prisma Studio (database GUI)
-   `npm run setup` - Complete setup (install + db setup + seed)

## Default Admin Account

After running the seed script, you'll have an admin account:

-   **Username:** `admin`
-   **Password:** `admin123`
-   **Character:** Admin (Warrior)
-   **Role:** Guild Master

⚠️ **Important:** Change the admin password after first login!

## Database

The application uses SQLite with Prisma ORM. The database file is located at `prisma/dev.db` and is automatically created when you run the setup commands.

### Database Schema

-   **Users:** Guild members and applicants
-   **Events:** Guild events and raids
-   **Posts:** Guild announcements and news
-   **Recruitment:** Class recruitment status
-   **Tokens:** User authentication tokens

## Development

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open [http://localhost:3001](http://localhost:3000) in your browser

3. Login with the admin account to access the admin panel

## Production Deployment

1. Build the application:

    ```bash
    npm run build
    ```

2. Start the production server:
    ```bash
    npm run start
    ```

Make sure to:

-   Set proper environment variables
-   Use a secure JWT secret
-   Configure reCAPTCHA if needed
-   Set up proper file upload handling for production

## Troubleshooting

### Database Issues

-   If you encounter database errors, try running `npm run db:reset`
-   Check that the `DATABASE_URL` in your `.env` file is correct
-   Ensure the `prisma` directory has write permissions

### Build Issues

-   Make sure all dependencies are installed: `npm install`
-   Check that Node.js version is 20 or later
-   Clear Next.js cache: `rm -rf .next`

### Authentication Issues

-   Verify JWT_SECRET is set in your `.env` file
-   Check that the admin user exists in the database
-   Try resetting the database and reseeding: `npm run db:reset`
