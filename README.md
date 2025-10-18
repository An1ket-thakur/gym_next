This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` "development"

`DATABASE_URL` "postgresql://username:password@localhost:5432/databasename?schema=gym_next&options=-c%20TimeZone=Asia/Kolkata"

replace username, password and databasename with yours local database's name, username and password


 run in console:
1.
```bash
npm install
```
2.
```bash
npx prisma migrate dev
```
3.
```bash
npx prisma generate
```
4.
```bash
npm run dev
```