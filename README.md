
# web-app-template
This is a web application template making use of pocketbase, node, and svelte-kit

Check it out deployed live at https://web-app-template.fly.dev/

## Running Locally
1. Add the following environment variables to your appropriate source
   1. TEST_USER_PASSWORD (for running development and staging tests)
   1. PB_ADMIN_EMAIL (for running development and staging tests)
   1. PB_ADMIN_PASSWORD (for running development tests)

## Deploying to fly.io
1. Add the following environment variables to your GitHub secrets and appropriate development source
   1. STAGING_PB_ADMIN_PASSWORD (for running staging tests)
   1. FLY_API_TOKEN (for deploying to fly.io)

## Backend Setup
1. ### Install dependencies
   1. ```cd backend```
   1. ```npm install```

1. ### Run pocketbase
   1. Download appropriate pocketbase binary from https://pocketbase.io/docs
   1. Name the executable appropriately, place in backend/pb, then add to .gitignore and .dockerignore
   1. If the name of your executable is not "macos_arm64_pocketbase", then you will need to edit backend/tests/globalSetup.js
   1. ```./pb/<exe_name>_pocketbase serve```
   1. Create your admin account at the admin UI (http://127.0.0.1:8090/_/ by default)
   1. Create a new user record for which Email=test.user@web-app-template.dev and Verified=true 
   1. Be sure to stop pocketbase before running tests

1. ### Run tests
   1. ```npm run test```

## Frontend Setup
1. ### Install dependencies
   1. ```cd frontend```
   1. ```npm install```

1. ### Run tests
   1. ```npm run test``` (this also creates static build)

1. ### View frontend
   1. ```npm run dev``` to view in development mode on port 5173
   1. ```npm run build``` to create static build in frontend/build and copy to backend/pb/public_pb
   1. ```npm run preview``` to view on port 4173
   1. Serve pocketbase in backend/pb/ to view on port 8090

## Pocketbase configuration (via admin dashboard)
### Email
   1. Most easily achieved though SMTP
   1. I used https://account-app.brevo.com/
### Backups
   1. Most easily achieved using s3
   1. I used https://client.tebi.io/