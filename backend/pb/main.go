package main

import (
    "log"
    "net/http"
    "os"
    "path/filepath"
    "strings"

    "github.com/labstack/echo/v5"
    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/core"
)

func main() {
    app := pocketbase.New()

    // Define a custom HTTP handler
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

        // Determine the path to the requested resource
        path := filepath.Join("./pb_public", r.URL.Path)
        log.Printf("Checking for file at path: %s", path)

        // Check if the requested file exists
        _, err := os.Stat(path)
        if os.IsNotExist(err) || strings.HasSuffix(r.URL.Path, "/") {
            log.Printf("File not found at path: %s, serving index.html", path)
            // If the file does not exist, serve index.html
            http.ServeFile(w, r, "./pb_public/index.html")
            return
        }

        log.Printf("Serving file at path: %s", path)
        // If the file exists, serve it
        http.ServeFile(w, r, path)
    })

    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        // Use the custom handler for all routes
        e.Router.Any("/*", echo.WrapHandler(http.DefaultServeMux))
        return nil
    })

    log.Println("Starting PocketBase...")
    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
    log.Println("PocketBase started successfully")
}
