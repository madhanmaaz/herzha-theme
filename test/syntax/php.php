<?php
// =========================================
// PHP User Manager App
// =========================================

// ---------- Enum (PHP 8.1+) ----------
enum Status: string
{
    case IDLE = "idle";
    case READY = "ready";
    case ERROR = "error";
}

// ---------- User Class ----------
class User
{
    public string $name;
    public ?int $age;
    public array $roles;

    public function __construct(
        string $name,
        ?int $age = null,
        array $roles = ["user"],
    ) {
        $this->name = $name;
        $this->age = $age;
        $this->roles = $roles;
    }

    public function addRole(string $role): void
    {
        if (!in_array($role, $this->roles)) {
            $this->roles[] = $role;
        }
    }

    public function greet(): string
    {
        return "Hello, {$this->name}";
    }

    public function __toString(): string
    {
        $roles = implode(", ", $this->roles);
        return "{$this->name} ({$this->age}) Roles: {$roles}";
    }
}

// ---------- User Repository ----------
class UserRepository
{
    private array $users = [];

    public function add(User $user): void
    {
        $this->users[] = $user;
    }

    public function getAll(): array
    {
        return $this->users;
    }

    public function count(): int
    {
        return count($this->users);
    }
}

// ---------- Main App ----------
try {
    $repo = new UserRepository();

    // create default users
    $user1 = new User("Madhan", 25);
    $user1->addRole("admin");
    $repo->add($user1);

    $user2 = new User("Alice", 30);
    $repo->add($user2);

    // iterate users
    foreach ($repo->getAll() as $user) {
        echo $user->greet() . PHP_EOL;
        echo $user . PHP_EOL;
    }

    // conditional
    if ($repo->count() > 1) {
        echo "Multiple users in repository" . PHP_EOL;
    } else {
        echo "Single user" . PHP_EOL;
    }

    // switch-case
    $currentStatus = Status::READY;
    switch ($currentStatus) {
        case Status::IDLE:
            echo "System idle" . PHP_EOL;
            break;
        case Status::READY:
            echo "System ready" . PHP_EOL;
            break;
        case Status::ERROR:
            echo "System error" . PHP_EOL;
            break;
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
