FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json /app
COPY pnpm-lock.yaml /app

RUN pnpm install

COPY . /app
