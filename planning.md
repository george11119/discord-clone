<h1 align="center">Project plan</h1>

### Todo

---

<ul>
  <li>Create frontend UI</li>
  <ul>
    <li>Create sidebar - DONE</li>
    <li>Create input box - DONE</li>
    <li>Create message view - DONE</li>
  </ul>
  <li>Create backend</li>
  <ul>
    <li>Implement messaging feature - DONE</li>
    <li>Fix folder structure</li>
    <li>Write tests for code</li>
    <li>Add users/login functionality</li>
    <li>Add channels</li>
    <li>Add servers</li>
  </ul>
</ul>

### Database layout

---

```mermaid
erDiagram
  user ||--|{ message: has_many_belongs_to
  user {
    int id PK
    string username
    string email
    string password
  }

  server ||--|{ channel: has_many_belongs_to
  server {
    int id PK
  }

  channel ||--|{ message: has_many_belongs_to
  channel {
    int id PK
    int server_id FK
  }

  message {
    int id PK
    string text
    int user_id FK
    int channel_id FK
  }
```
