# web-app-template
This is a web application template making use of pocketbase, node, and react

## First Time Setup

1. ### Install Dependencies
```npm install```

1. ### Run pocketbase
   1. Download appropriate pocketbase binary from https://pocketbase.io/docs
   1. Name the executable appropriately then add to .gitignore and .dockerignore
   1. If the name of your executable is not "macos_arm64_pocketbase", then you will need to edit globalSetup.js
   1. ```./pb/<exe_name>_pocketbase serve```
   1. Create your admin account at the admin UI ( http://127.0.0.1:8090/_/ by default)
   1. Be sure to stop pocketbase before moving on

1. ### Run tests
```npm run test```