## UI Template rep

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Generating Schema / connecting to Github API

1. you need an access token
2. generate/update schema on demand
3. run `curl -H "Authorization: bearer TOKEN" https://api.github.com/graphql -o schema.json``

## Deployment

The production version of the app can be found [here](https://stargazer-count.vercel.app/)

## requirements

- node v18.17.0 >
- pnpm v8 >
- docker (optional)

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack used

- Next.js / React
- TypeScript
- jest
- react-testing-library (RTL)
- playwright
- tailwindcss
- eslint / prettier
- github actions (CI/CD)
- Vercel (deployments and PR previews)
- docker (optional)

## CICD integration

![image](https://user-images.githubusercontent.com/13686332/94494964-dbefa480-01c6-11eb-9ab3-11ecd6015d25.png)
