FROM 864899836744.dkr.ecr.eu-central-1.amazonaws.com/linklegals-base:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
FROM 864899836744.dkr.ecr.eu-central-1.amazonaws.com/linklegals-base:latest
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000
CMD ["npm", "start"]

# docker buildx build --platform linux/amd64 \
#  -t 864899836744.dkr.ecr.eu-central-1.amazonaws.com/linklegals-server:latest \
#  --push .