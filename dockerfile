FROM node:16.14 as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:16.14

WORKDIR /app

RUN adduser --disabled-password --no-create-home kenny
RUN addgroup nodejs && groupmod -g 1002 nodejs

RUN adduser kenny nodejs

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder --chown=kenny:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER kenny

CMD ["node_modules/.bin/next", "start"]
