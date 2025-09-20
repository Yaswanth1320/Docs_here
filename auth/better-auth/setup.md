# Adding Better Auth to Next.js with Neon and Drizzle Github & Google providers

## Introduction

In this guide, I'll walk you through how I integrated Better Auth into a Next.js application using Neon as the database and Drizzle ORM. Better Auth is a modern authentication library that provides a simple way to add authentication with social providers like Google and GitHub.

## Prerequisites

Before we start, make sure you have:
- A Next.js project set up
- A Neon database account
- Node.js and npm installed

## Step 1: Install Dependencies

First, install the required packages:

```bash
npm install better-auth @neondatabase/serverless drizzle-orm drizzle-kit
```

These packages include:
- `better-auth`: The authentication library
- `@neondatabase/serverless`: Neon database driver
- `drizzle-orm` and `drizzle-kit`: For database operations and migrations

## Step 2: Set Up Neon Database

1. Create a new project in your Neon dashboard
2. Get your database connection string from the dashboard
3. Add it to your environment variables as `DATABASE_URL`

## Step 3: Configure Drizzle Schema

Create your database schema in `src/db/schema.ts`:

```typescript
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
```

## Step 4: Set Up Drizzle Configuration

Create `drizzle.config.ts` in your root directory:

```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Step 5: Create Database Connection

Create `src/index.ts` for your database connection:

```typescript
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });
export default db;
```

## Step 6: Configure Better Auth

Create `src/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/index";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    github: {
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

export const getSession = async () => {
  await auth.api.getSession({
    headers: await headers(),
  });
};
```

## Step 7: Set Up API Route

Create the API route at `src/app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

## Step 8: Create Auth Client

Create `src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
```

## Step 9: Get Secrets from Google and GitHub

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" > "OAuth 2.0 Client IDs"
6. Configure the OAuth consent screen if prompted
7. Set application type to "Web application"
8. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
9. Copy the Client ID and Client Secret

### GitHub OAuth Setup

1. Go to GitHub and click on your profile picture > Settings
2. Scroll down to "Developer settings" in the left sidebar
3. Click "OAuth Apps" > "New OAuth App"
4. Fill in the form:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` (or your production URL)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Click "Register application"
6. Copy the Client ID and generate a new Client Secret

## Step 10: Set Up Environment Variables

Create a `.env.local` file in your root directory:

```env
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_URL=http://localhost:3000
```

## Step 11: Run Database Migrations

Generate and run your database migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Step 12: Usage in Components

Now you can use Better Auth in your components. Here's an example of a sign-in button:

```typescript
import { authClient } from "@/lib/auth-client";

function SignInButton() {
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const signInWithGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={signInWithGitHub}>Sign in with GitHub</button>
    </div>
  );
}
```

## Conclusion

That's it! You've successfully integrated Better Auth with Next.js, Neon, and Drizzle. The setup provides secure authentication with social login options for Google and GitHub. Make sure to update your redirect URIs in production and keep your secrets secure.