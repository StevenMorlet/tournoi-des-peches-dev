This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the `.env.dist` file to a `.env` and edit as needed:
   ```bash
   cp .env.local.dist .env.local
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
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Contributing

**Branch & Commit types :**

- <span style="color: lime;">feature</span> (for new features)
- <span style="color: lime;">fix</span> (for bug fixes)
- <span style="color: lime;">docs</span> (for documentation)
- <span style="color: lime;">refactor</span> (for code cleanup)
- <span style="color: lime;">sandbox</span> (for testing and experimentation)

### Branching

<pre>
git checkout <span style="color: orange;">main</span>
git pull origin <span style="color: orange;">main</span>
git checkout -b <span style="color: lime;">branchtype</span>/<span style="color: cyan;">branchname</span>
</pre>

### Committing

<pre>
git add .
git commit -m "<span style="color: lime;">type</span>: <span style="color: cyan;">message</span>"
</pre>      

### Pushing

<pre>
git push origin <span style="color: lime;">branchtype</span>/<span style="color: cyan;">branchname</span>
</pre>  

### Merge Request

- Go to Pull Requests
- Click on "New Pull Request"
- Base: <span style="color: orange;">main</span>
- Compare: <span style="color: lime;">branchtype</span>/<span style="color: cyan;">branchname
- Click on "Create Pull Request"
- Click on “Squash and merge” or “Rebase and merge”

**Delete the branch (local and remote)**
<pre>git branch -d <span style="color: lime;">branchtype</span>/<span style="color: cyan;">branchname</span></pre>

### Additional

**List branches**
<pre>git branch -a</pre>

**Update local branch**
<pre>
git checkout <span style="color: orange;">main</span>
git pull origin <span style="color: orange;">main</span>
git checkout <span style="color: lime;">branchtype</span>/<span style="color: cyan;">branchname</span>
git rebase <span style="color: orange;">main</span>
</pre>

<pre>
git push --force-with-lease
</pre>

## Specs

This project uses:

- [Next.js](https://nextjs.org) as the React framework
- [Prisma](https://prisma.io) as the ORM for database access
- [TailwindCSS](https://tailwindcss.com) for styling
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and
  load [Geist](https://vercel.com/font)

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
