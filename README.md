This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Current Plan:

1. Finish "/workouts -> /workouts/new -> /workouts/[id]" flow:

```bash
05/11
# add all pages✅
# add the form✅
06/11
# make the form functional✅
# add GET API for exercises✅
# connect GET to list of available exercises✅
#
# --- task 1 complete ---
#
```

2. Continue working on CRUDs: Update for all(workout, set, exercise?), Delete for all(workout, set, exercise?), Create for exercise

```bash
# add DELETE for Workouts(button on page)✅
- add UPDATE for Workouts(page): adding new set, updating and deleting existing sets(but for now just editing workout "notes"!!! and maybe "date")
- add CREATE for Exercise(page?)
- add DELETE for Exercise(button on page)
- add /exercises page with the list of them
- think of a better Prisma Schema - "notes" + "names" for Workouts; better use of "category" of Exercise; add "note" to Sets and Exercise(rename description?)
```

3. Deploy

```bash
- deploy on Vercel(decide which production db to use: Firebase/Supabase/Neon)
```

4. Add all "wanted" content, fix styles(add library: shadcn?) and hydration errors

```bash
- add to main page proper content
- resolve hydration issue
- add screenshots
```
