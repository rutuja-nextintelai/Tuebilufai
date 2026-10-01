# Tuebiluf AI

Marketing site for Tuebiluf AI, built with React 19, Vite 8 and React Router. The contact,
newsletter and careers forms post to Google Apps Script endpoints (source in `apps-script/`).

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/ locally
```

## Form endpoints

Vite bakes these three variables into the bundle at build time. Without them the site still
works, but each form shows a "not configured" message instead of submitting.

| Variable                     | Used by              |
| ---------------------------- | -------------------- |
| `VITE_GOOGLE_SCRIPT_URL`     | Contact form         |
| `VITE_CAREERS_SCRIPT_URL`    | Job application form |
| `VITE_NEWSLETTER_SCRIPT_URL` | Newsletter sign-up   |

Put them in a `.env.production` file at the repo root (they end up in the public JavaScript
bundle anyway, so they are not secrets), or pass them as Docker build args. A non-empty build
arg takes priority over the file.

## Deploy to Google Cloud Run

The `Dockerfile` builds the site and serves it with nginx (config in `nginx/`). nginx listens on
the port Cloud Run provides, falls back to `index.html` for client-side routes, gzips text assets
and sets cache headers: fingerprinted bundles for a year, HTML always revalidated.

### One-time setup

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

### Deploy from your machine

Create `.env.production` with the three form endpoints, then run from the repo root:

```bash
gcloud run deploy tuebiluf-ai --source . --region asia-south1 --allow-unauthenticated
```

Cloud Build builds the image from the `Dockerfile`, stores it in Artifact Registry and deploys
it. The command prints the service URL when it finishes. Run it again to ship a new version.
Pick any region; `asia-south1` is Mumbai.

### Deploy automatically from GitHub

`cloudbuild.yaml` builds the image, pushes it and deploys it in one pipeline.

1. Create the image repository once (same region as in `cloudbuild.yaml`):

   ```bash
   gcloud artifacts repositories create web --repository-format=docker --location=asia-south1
   ```

2. Let the service account Cloud Build runs as (shown under Cloud Build > Settings; on newer
   projects it is the Compute Engine default account) push images and deploy to Cloud Run:

   ```bash
   PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format='value(projectNumber)')
   SA="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
   for ROLE in roles/run.admin roles/iam.serviceAccountUser roles/artifactregistry.writer; do
     gcloud projects add-iam-policy-binding YOUR_PROJECT_ID --member="$SA" --role="$ROLE"
   done
   ```

3. In the Cloud Console open Cloud Build > Triggers, connect this GitHub repository and create a
   trigger on pushes to `main` with type "Cloud Build configuration file" and location
   `cloudbuild.yaml`. If you do not commit `.env.production`, set the `_VITE_GOOGLE_SCRIPT_URL`,
   `_VITE_CAREERS_SCRIPT_URL` and `_VITE_NEWSLETTER_SCRIPT_URL` substitution variables on the trigger.

The same pipeline can be run by hand: `gcloud builds submit --config cloudbuild.yaml`.

### Custom domain

Cloud Run's built-in domain mapping is offered only in some regions; see
https://cloud.google.com/run/docs/mapping-custom-domains. If your region is not listed, put a
global external Application Load Balancer in front of the service, which also gives you Cloud CDN.

### Run the container locally

```bash
docker build -t tuebiluf-ai .
docker run --rm -p 8080:8080 tuebiluf-ai
# open http://localhost:8080
```

## Netlify

`netlify.toml` is kept for the existing Netlify deployment; set the three `VITE_*` variables in
the Netlify site settings.
