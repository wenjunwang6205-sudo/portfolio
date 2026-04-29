# Product Records Portfolio

Next.js App Router portfolio prototype with Tailwind CSS, Framer Motion shared element transitions, and lucide-react icons.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub Pages

This project is configured with `output: "export"` in `next.config.mjs`, so `npm run build` creates a static `out/` folder.

Deployment is handled by `.github/workflows/deploy.yml`.

1. Push this project to a GitHub repository.
2. In the repository, open `Settings -> Pages`.
3. Set `Build and deployment -> Source` to `GitHub Actions`.
4. Push to the `main` branch.
5. Open the workflow run from the `Actions` tab and wait for it to finish.

For a normal project repository, the final URL will be:

```text
https://你的用户名.github.io/仓库名/
```

For a user site repository named `你的用户名.github.io`, the final URL will be:

```text
https://你的用户名.github.io/
```
