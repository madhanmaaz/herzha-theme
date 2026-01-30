# User Manager App

**Version:** 1.0.0
**Status:** READY

---

## Features

* Add User
* Remove User
* Edit User
* Roles: `user`, `admin`, `moderator`
* Export Data

---

## Default Users

| ID | Name   | Age | Roles       | Active |
| -- | ------ | --- | ----------- | ------ |
| 1  | Madhan | 25  | user, admin | ✅      |
| 2  | Alice  | 30  | user        | ❌      |

---

## Sample Usage

```javascript
// JS example
const user = { name: "Madhan", age: 25, roles: ["admin"] };
console.log(`Hello ${user.name}`);
```

```python
# Python example
user = {"name": "Madhan", "age": 25, "roles": ["admin"]}
print(f"Hello {user['name']}")
```

```java
// Java example
User user = new User("Madhan", 25, Arrays.asList("admin"));
System.out.println("Hello " + user.getName());
```

---

## User Roles

* **Admin**: Full access
* **User**: Standard access
* **Moderator**: Can manage content

---

## Settings

* Theme: `light`
* Notifications:

  * Email: ✅
  * SMS: ❌
  * Push: ✅
* Maximum Users: 100

---

## Links

* [Project Repo](https://github.com/example/UserManager)
* [Documentation](https://example.com/docs)

---

## Notes

> This app demonstrates usage of **multiple programming syntaxes** for learning and testing purposes.
