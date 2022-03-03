# Docker

This file will introduce how to run Jimmi with Docker 🐳.  You can use this for local or production environments

> ⚠️ Please keep in mind, that right now Jimmi has no password protection and should not be exposed to the public internet without any additional measurements from your side!

## Architecture

Jimmi has two separated Docker images, so that you can start and use the backend without the web interface.

### Backend Docker Image

The backend Docker image executes the Deno application. Its HTTP web server listens on the given port (right now: 8000 hard coded). It can not terminate HTTPS traffic. Please use a proxy, gateway or a customized (Jimmi-)frontend container to handle TLS(-certificates).

### Frontend Docker Image

The frontend docker image is powered by a lightweight nginx webserver. You can find the default configurations at `./frontend/nginx`. If you are NOT using a reverse proxy that forwards `/api*` traffic to the backend container, please copy/paste the `jimmi.conf` and update `server 127.0.0.1:503;` with the name (and listening port!) of the backend container (like `server jimmi_backend:8000;`). The `docker-compose.yml` file shows an example how to load your updated `custom-jimmi.conf`.

## Production Example

We have prepared a `docker-compose.yml` file for you which uses the traefic proxy as a reverse proxy to handle TLS certificates for you and forward API requests to the right container. **Before you can start**, please update all occurrences of `Host(´localhost´)` and replace `localhost` with your domain.
Or keep it if you run Jimmi locally.


<details>
<summary>🔐 Setup Let's Encrypt</summary>

If Jimmi is available on the public internet, you probably want to use TLS for a secured communication. *Let's Encrypt* is one of the easiest ways to get a free TLS certificates. To use *Let's Encrypt* certificates, do the following within the docker-compose file:

1. uncomment the corresponding block of the reverse-proxy container
2. update your email address
3. uncomment the `HTTPS` blocks of each Jimmi container

That's it 🎉!  

</details>

You can use one of the following commands to start Jimmi:
```
# Build container images from source:
docker-compose -f docker-compose.yml -f docker-compose.build.yml up

# Use container images from ghcr.io
docker-compose -f docker-compose.yml up
```   

If you are familiar with docker compose, you probably already know that you can use `docker-compose down` to stop Jimmi.

## Troubleshooting

<details>
<summary>'/api*' always returns HTTP 503</summary>

Update the upstream server as described [here](#frontend-docker-image).
</details>
