// =========================================
// Rust User Manager App
// =========================================

use std::fmt;

// ---------- Enum ----------
#[derive(Debug)]
enum Status {
    Idle,
    Ready,
    Error,
}

// ---------- Trait ----------
trait Greet {
    fn greet(&self) -> String;
}

// ---------- User Struct ----------
struct User {
    name: String,
    age: Option<u32>,
    roles: Vec<String>,
}

impl User {
    fn new(name: &str, age: Option<u32>) -> Self {
        User {
            name: name.to_string(),
            age,
            roles: vec!["user".to_string()],
        }
    }

    fn add_role(&mut self, role: &str) {
        if !self.roles.contains(&role.to_string()) {
            self.roles.push(role.to_string());
        }
    }
}

// Implement trait for User
impl Greet for User {
    fn greet(&self) -> String {
        format!("Hello, {}", self.name)
    }
}

// Implement Display for User
impl fmt::Display for User {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let age_str = match self.age {
            Some(a) => a.to_string(),
            None => "N/A".to_string(),
        };
        write!(f, "{} ({}) Roles: {:?}", self.name, age_str, self.roles)
    }
}

// ---------- User Repository ----------
struct UserRepository {
    users: Vec<User>,
}

impl UserRepository {
    fn new() -> Self {
        UserRepository { users: vec![] }
    }

    fn add(&mut self, user: User) {
        self.users.push(user);
    }

    fn all(&self) -> &Vec<User> {
        &self.users
    }

    fn count(&self) -> usize {
        self.users.len()
    }
}

// ---------- Main ----------
fn main() {
    let mut repo = UserRepository::new();

    let mut user1 = User::new("Madhan", Some(25));
    user1.add_role("admin");
    repo.add(user1);

    let user2 = User::new("Alice", Some(30));
    repo.add(user2);

    // Iterate users
    for user in repo.all() {
        println!("{}", user.greet());
        println!("{}", user);
    }

    // Conditional
    if repo.count() > 1 {
        println!("Multiple users in repository");
    } else {
        println!("Single user");
    }

    // Match statement
    let current_status = Status::Ready;
    match current_status {
        Status::Idle => println!("System idle"),
        Status::Ready => println!("System ready"),
        Status::Error => println!("System error"),
    }
}
