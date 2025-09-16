## Installing and Configuring Prisma in Next.js App Router

Prisma is an open-source database toolkit that simplifies database access and management in modern application development. It consists of three main tools:

- **Prisma ORM**: An object-relational mapping (ORM) tool for Node.js and TypeScript
- **Prisma Migrate**: A declarative database schema migration system
- **Prisma Studio**: A GUI for viewing and editing data in your database

Prisma supports various databases, including:

- PostgreSQL
- MySQL
- SQLite
- MongoDB

This makes it a versatile choice for developers working with different database technologies.

### Step-by-Step Guide to Installing Prisma in Next.js App Router

#### 1. Install Next.js

create a nextjs app using the following command

```bash
npx create-next-app@latest prisma-nextjs
cd prisma-nextjs
```

#### 2. Install Prisma

Install Prisma in your Next.js project using npm:

```bash
npm install prisma --save-dev
```

This command installs Prisma CLI as a development dependency in your project.

#### 3. Initialize Prisma

Initialize Prisma in your project by running the following command:

```bash
npx prisma init
```

This command does two important things:

- Creates a new prisma directory containing a schema.prisma file. This file is where you'll define your database schema and models.
- Creates a .env file in the root of your project. This file is used to store environment variables, including your database connection string.

#### 4. Configure Prisma

Open the prisma/schema.prisma file in your project. This file defines your database schema and models.

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Add your database connection string to the .env file. For example:

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```

Replace user, password, localhost, 5432, and mydatabase with your actual database credentials.

#### 5. Define Your Schema

Open the schema.prisma file, define your data models. For example:

```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

#### 6.Generate Prisma Client

Generate the Prisma Client, which is a type-safe database client, by running the following command:

```bash
npx prisma generate
```

This command reads the schema.prisma file and generates the Prisma Client code in the prisma/generated directory.

#### 7.Migrate Your Database

Apply the database migrations to create the necessary tables in your database by running the following command:

```bash
npx prisma db push
```

This command creates a new migration file in the prisma/migrations directory and applies it to your database.

#### 8.Prisma Studio

Prisma Studio is a GUI tool that allows you to view and edit data in your database. It provides a user-friendly interface for performing CRUD operations on your models.

To start Prisma Studio, run the following command:

```bash
npx prisma studio
```

This command opens Prisma Studio in your default web browser. You can use it to explore your database schema, view and edit data, and perform other database-related tasks.

## Install and Generate Prisma Client

Prisma Client is an auto-generated database client that enables type-safe database access and reduces boilerplate code. To install it:

```bash
npm install @prisma/client
```

### Setting Up Prisma Client in Next.js

In lib/db.ts, paste the following code:

```bash
import { PrismaClient } from "@/generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient()
}
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

This code ensures that only one instance of PrismaClient is created and reused across your application, preventing the creation of multiple instances during development hot reloads. It creates a single PrismaClient instance and saves it on the globalThis object, reusing it if it already exists.

### Using Prisma in Next.js App Router

To use Prisma in your Next.js App Router, you can import the prisma client from lib/db.ts and use it to interact with your database.

#### Example: Server Component

In a server component (e.g., app/actions/user.ts):

```bash
"use server"
import prisma from '@/lib/db'

const allUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}
```

### Example: Client Component

For client components, you’ll need to create an API route to fetch data. First, create an API route (e.g., app/api/users/route.ts):

```bash
import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}
```

Then, in your client component:

```bash
import { useState } from 'react'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

By following these steps, you’ll have Prisma successfully integrated into your Next.js application with the App Router, allowing for efficient and type-safe database operations.
