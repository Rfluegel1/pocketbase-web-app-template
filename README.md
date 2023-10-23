
# web-app-template
This is a web application template making use of pocketbase, node, and svelte-kit

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
   1. Be sure to stop pocketbase before moving on

1. ### Run tests
      1.```npm run test```

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
   1. serve pocketbase to view on port 8090
