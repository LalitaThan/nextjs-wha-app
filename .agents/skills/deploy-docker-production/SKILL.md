---
name: deploy-nextjs-docker
description: >
  Use this skill to build and deploy a Next.js application using Docker.
  Triggers on: "deploy app", "build docker image", "run nextjs container",
  "redeploy application", "publish nextjs app", or when a user provides
  docker build/docker run commands.

  This skill validates Docker availability, verifies required files,
  checks whether the requested image version already exists, prevents
  accidental version overwrites, safely replaces existing containers,
  starts the application, and verifies deployment success.
---

# Deploy Next.js Application with Docker

## Purpose

Deploy a Next.js application as a Docker container following production deployment best practices.

---

## Configuration

```yaml
image_name: nextjs-wha-app
image_version: 1.0.0
container_name: my-nextjs-wha-app
env_file: .env.production
host_port: 4001
container_port: 3000
restart_policy: always
```

---

## Validation Rules

Before deployment always verify:

### Docker Available

```bash
docker --version
docker info
```

### Required Files Exist

```bash
test -f Dockerfile
test -f .env.production
```

### Port Availability

```bash
ss -tulpn | grep :4001
```

If the port is already in use, stop and report the conflict.

---

## Version Management

Always check whether the target image version already exists.

```bash
docker image inspect nextjs-wha-app:1.0.0 >/dev/null 2>&1
```

If the image exists:

1. Notify the user.
2. Recommend using a newer version.
3. Never overwrite production image tags without confirmation.

Recommended version progression:

```text
1.0.0
1.0.1
1.0.2
1.1.0
2.0.0
```

List available versions:

```bash
docker images nextjs-wha-app
```

---

## Build Image

```bash
docker build -t nextjs-wha-app:1.0.0 .
```

Verify build success before proceeding.

---

## Container Replacement

Check whether the container already exists.

```bash
docker ps -a --filter "name=my-nextjs-wha-app"
```

If found:

```bash
docker stop my-nextjs-wha-app || true
docker rm my-nextjs-wha-app || true
```

---

## Run Container

```bash
docker run \
--restart=always \
-d \
--name my-nextjs-wha-app \
--env-file .env.production \
-p 4001:3000 \
nextjs-wha-app:1.0.0
```

---

## Post Deployment Verification

### Container Status

```bash
docker ps --filter "name=my-nextjs-wha-app"
```

### Application Logs

```bash
docker logs --tail 100 my-nextjs-wha-app
```

### Health Check

```bash
curl http://localhost:4001
```

Expected:

```text
HTTP 200
```

---

## Success Response

Report:

```text
Deployment completed successfully.

Application: nextjs-wha-app
Image: nextjs-wha-app:1.0.0
Container: my-nextjs-wha-app
Port: 4001
Status: Running
```

---

## Rollback Procedure

List available images:

```bash
docker images nextjs-wha-app
```

Run previous version:

```bash
docker stop my-nextjs-wha-app
docker rm my-nextjs-wha-app

docker run \
--restart=always \
-d \
--name my-nextjs-wha-app \
--env-file .env.production \
-p 4001:3000 \
nextjs-wha-app:PREVIOUS_VERSION
```

---

## Best Practices

* Always check image version before building.
* Never use `latest` in production.
* Keep at least one rollback version.
* Verify logs after deployment.
* Validate environment files before running.
* Stop and remove existing containers before redeployment.
* Confirm application health before marking deployment complete.
