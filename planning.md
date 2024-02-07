<h1 align="center">Project plan</h1>

### Todo

---

<ul>
  <li>Create frontend UI</li>
  <ul>
    <li>Create sidebar</li>
    <li>Create input box</li>
    <li>Create message view</li>
  </ul>
  <li>Create backend</li>
  <ul>
    <li>Implement messaging feature</li>
    <li>Add users/login functionality</li>
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
