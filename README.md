## Setup

1. Install dependencies:  
   `pnpm install`

2. Copy the <ins>.env.dist</ins> file to a <ins>.env</ins> and edit as needed:  
   `cp .env.dist .env`

3. Generate Prisma client:  
   `npx prisma generate` or `pnpm generate`

4. Launch Docker container
   `pnpm docker:up`

5. Create and apply database migrations:  
   `npx prisma migrate dev` or `pnpm migrate`

6. Stop Docker container
   `pnpm docker:down`

## Running

Start docker container and dev server:

`pnpm dev:full`

## Stopping

Stop dev server using `CTRL+C` then docker container with:

`pnpm docker:down`

> Open [http://localhost:3000](http://localhost:3000)

## Versioning

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
- Click "New Pull Request”
- Base: <span style="color: orange;">main</span>
- Compare: <span style="color: lime;">branchtype</span>/<span style="color: cyan;">branchname
- Click “Create Pull Request”
- Click “Squash and merge” or “Rebase and merge”

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
- [Phaser](https://phaser.io/) as the game engine
- [Docker](https://www.docker.com/) to run the app

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
