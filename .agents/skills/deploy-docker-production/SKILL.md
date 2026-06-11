# Skill: Deploy Next.js WHA App ด้วย Docker

## Build Docker Image

```bash
docker build -t nextjs-wha-app:1.0.0 .
```

## Run Docker Container

```bash
docker run --restart=always -d \
--name my-nextjs-wha-app \
--env-file .env.production \
-p 4001:3000 \
nextjs-wha-app:1.0.0
```

## ตรวจสอบ Container

```bash
docker ps
```

## ตรวจสอบ Log

```bash
docker logs -f my-nextjs-wha-app
```

## Restart Application

```bash
docker restart my-nextjs-wha-app
```

## Stop Application

```bash
docker stop my-nextjs-wha-app
```

## Remove Container

```bash
docker rm -f my-nextjs-wha-app
```

## Deploy Version ใหม่

```bash
docker rm -f my-nextjs-wha-app

docker build -t nextjs-wha-app:1.0.0 .

docker run --restart=always -d \
--name my-nextjs-wha-app \
--env-file .env.production \
-p 4001:3000 \
nextjs-wha-app:1.0.0
```

## Access Application

```text
http://SERVER_IP:4001
```

หรือ

```text
http://localhost:4001
```

### Configuration

* Image Name: `nextjs-wha-app`
* Version: `1.0.0`
* Container Name: `my-nextjs-wha-app`
* Environment File: `.env.production`
* Host Port: `4001`
* Container Port: `3000`
* Restart Policy: `always`
