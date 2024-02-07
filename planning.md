### Todo

<ul>
  <li>Create frontend</li>
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

```mermaid
erDiagram
  user ||--|{ message: has_many
  user {
    int id
    string username
    string email
    string password
  }

  server ||--|{ channel: has_many
  server {
    int id
  }

  channel ||--|{ message: has_many
  channel {
    int id
  }

  message {
    int id
    string text
  }
```
