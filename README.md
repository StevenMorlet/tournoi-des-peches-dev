This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the `.env.dist` file to a `.env` and edit as needed:
   ```bash
   cp .env.dist .env
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Create and apply database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Running

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Specs

This project uses:
- [Next.js](https://nextjs.org) as the React framework
- [Prisma](https://prisma.io) as the ORM for database access
- [TailwindCSS](https://tailwindcss.com) for styling
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font)

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
