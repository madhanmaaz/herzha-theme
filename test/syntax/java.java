// =========================================
// Java User Manager App (Syntax Coverage)
// =========================================

import java.util.*;

// ---------- Enum ----------
enum Status {
    IDLE,
    READY,
    ERROR,
}

// ---------- Interface ----------
interface Greetable {
    String greet();
}

// ---------- Class ----------
class User implements Greetable {

    private final String name;
    private int age;
    private List<String> roles;

    // constructor
    public User(String name, int age, List<String> roles) {
        this.name = name;
        this.age = age;
        this.roles = new ArrayList<>(roles);
    }

    // getter
    public String getName() {
        return name;
    }

    // getter & setter
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public List<String> getRoles() {
        return Collections.unmodifiableList(roles);
    }

    public void addRole(String role) {
        roles.add(role);
    }

    // override interface method
    @Override
    public String greet() {
        return "Hello, " + name;
    }

    // toString
    @Override
    public String toString() {
        return name + " (" + age + ") Roles: " + roles;
    }
}

// ---------- Generic Class ----------
class Repository<T> {

    private List<T> items = new ArrayList<>();

    public void add(T item) {
        items.add(item);
    }

    public int count() {
        return items.size();
    }

    public List<T> getAll() {
        return Collections.unmodifiableList(items);
    }
}

// ---------- Exception ----------
class UserException extends Exception {

    public UserException(String message) {
        super(message);
    }
}

// ---------- Main Application ----------
public class UserApp {

    // static field
    private static final String APP_NAME = "UserManager";

    // static method
    public static void printAppHeader() {
        System.out.println("=== " + APP_NAME + " ===");
    }

    // main method
    public static void main(String[] args) {
        printAppHeader();

        try {
            // create users
            User user1 = new User("Madhan", 25, Arrays.asList("user"));
            user1.addRole("admin");

            User user2 = new User("Alice", 30, Arrays.asList("user"));

            // repository
            Repository<User> userRepo = new Repository<>();
            userRepo.add(user1);
            userRepo.add(user2);

            // loop through users
            for (User u : userRepo.getAll()) {
                System.out.println(u.greet());
                System.out.println(u);
            }

            // control flow
            if (userRepo.count() > 1) {
                System.out.println("Multiple users in repo");
            } else {
                System.out.println("Single user");
            }

            // switch-case
            Status currentStatus = Status.READY;
            switch (currentStatus) {
                case IDLE -> System.out.println("System idle");
                case READY -> System.out.println("System ready");
                case ERROR -> System.out.println("System error");
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
