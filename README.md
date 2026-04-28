# irc.inovuslabs.org

Static Astro landing page for the Inovus Labs IRC server.

The IRC daemon is separate from this site:

```text
irc.inovuslabs.org:443  -> this webpage, through your reverse proxy
irc.inovuslabs.org:6697 -> Ergo IRC TLS, direct Docker port publish
```

Do not bind this webpage container directly to public `80` or `443` on the Oracle host if Listmonk or a reverse proxy is already using those ports.

## Local Development

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
```

## Docker Build

```sh
docker build -t irc-web .
docker run --rm -p 8081:80 irc-web
```

Open `http://localhost:8081`.

## GHCR Image

Run the `Publish container` workflow manually from GitHub Actions to publish a production image to GitHub Container Registry:

```text
ghcr.io/inovus-labs/irc.inovuslabs.org:latest
```

The workflow lives in `.github/workflows/publish-image.yml`. In GitHub, make sure the package visibility allows the Oracle server to pull it. For a private package, log in on the server with a GitHub token that has `read:packages`.

## Oracle Deployment

Recommended deployment shape:

```text
Oracle public IP
├─ 80/443  -> existing reverse proxy
│  ├─ listmonk.inovuslabs.org -> Listmonk container
│  └─ irc.inovuslabs.org      -> irc-web container on 127.0.0.1:8081
└─ 6697    -> Ergo container directly
```

On the Oracle server:

```sh
cd /home/ubuntu

git clone https://github.com/inovus-labs/irc.inovuslabs.org.git irc-web
cd irc-web

docker compose pull
docker compose up -d
```

For a private GHCR package:

```sh
echo '<github-token-with-read-packages>' | docker login ghcr.io -u <github-username> --password-stdin
```

This exposes the webpage only on the host loopback interface:

```text
127.0.0.1:8081 -> irc-web:80
```

Then configure your existing reverse proxy for:

```text
Host: irc.inovuslabs.org
Upstream: http://127.0.0.1:8081
TLS: enabled at the reverse proxy
```

If your reverse proxy is a Docker container and cannot reach `127.0.0.1:8081`, attach `irc-web` to the same Docker network as the proxy and proxy to `http://irc-web:80` instead.

Ergo should remain separate and keep publishing only the IRC TLS port:

```yaml
ports:
  - "6697:6697"
```
