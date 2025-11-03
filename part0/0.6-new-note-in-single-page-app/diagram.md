# 0.6 New Note in Single Page App

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The browser execute sendToServer() function
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
    Note left of server: The server send message  indicates that the HTTP request has led to the creation of a resource.
    Note right of browser: The browser execute redrawNotes() function to render the note
```
