// types, interfaces, enums
type Role = "user" | "admin";

interface User {
    readonly name: string;
    age?: number;
    roles: Role[];
}

enum Status {
    Idle,
    Ready,
}

// generics
function clone<T>(value: T): T {
    return { ...value };
}

// class, access modifiers
class UserService {
    private users: User[] = [];

    add(user: User): void {
        this.users.push(user);
    }

    get count(): number {
        return this.users.length;
    }
}

// object literal + satisfies
const user = {
    name: "Madhan",
    age: 25,
    roles: ["admin"],
} satisfies User;

const service = new UserService();
service.add(clone(user));

// narrowing
function printStatus(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
}

// async
async function load(): Promise<Status> {
    return Status.Ready;
}

load().then(printStatus);
