## Stargazer count

This is a simple app that allows you to search for a github repository and see the number of stargazers and forks it has.

## Deployment

The production version of the app can be found [here](https://stargazer-count.vercel.app/)

## requirements

- node v20.10.0 >
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

## Generating Schema / connecting to Github API

Accessing the Github API requires a token, and can be a bit tricky to access on the codegen tool since Github blocks a lot of requests from non-human users, the alternative, is to generate the schema manually based on their GET endpoint and then use the codegen tool to generate the types.

1. Generate a PAT (Personal Access Token) on Github
2. Run `curl -H "Authorization: bearer TOKEN" https://api.github.com/graphql -o schema.json``
3. Update/replace the schema.json file on the root of the project

## Stack used

- Next.js / React
- TypeScript
- jest
- react-testing-library (RTL)
- playwright
- eslint / prettier
- github actions (CI/CD)
- Vercel (deployments and PR previews)
- docker (optional)
- Material UI / emotion css
- Apollo Client
- GraphQL Code Generator
- Volta (Node / Package version manager)

## Architectural decisions and choices

- Nextjs: Although the app is very simple as a single page and doesn't require any routing or SSR feature (apollo was designed to only work on client side), it's part of my personal stack and I'm very familiar with it, so it was a natural choice, along with other benefits such as the file based routing, and the ability to easily add SSR in the future if needed, making it easily scalable.

- Volta: By having a single tool to manage the node version and the package manager, it's easier to ensure that the project will run on any machine, and that the versions are the same across all environments and developers won't mismatch versions.

- Material UI: As part of the proposal, the app should use a UI library, it was chosen given the familiarity and ready components to my use cases, it also provided my a CSS-in-JS solution, which is a requirement for the project.

- Apollo client and Graphql codegen: Based on the options for Graphql clients, Apollo has been so far the most used and stable one, and the tooling around it is very mature, making it easy to integrate with the codegen tool, which is a very powerful tool to provide type-safe queries based on the schema.

## CICD integration

![image](https://github.com/gabrielreisn/stargazer-count/assets/13686332/9a5a3170-1356-4048-b62c-42f07e9aa4db)

## Coverage and testing strategy

In this project, it was decided to use a combination of unit, integration, e2e and static analysis (eslint, typescript) steps to ensure the quality of the code.

![telegram-cloud-photo-size-1-5125622222134815971-y](https://github.com/gabrielreisn/stargazer-count/assets/13686332/9facd027-b255-46a8-8c2e-aedfc612bb76)
