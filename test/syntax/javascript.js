// comments & constants
const APP_NAME = "UserApp";

// types via JSDoc
/**
 * @typedef {{ name: string, age?: number, roles: string[] }} User
 */

// function + default params
function createUser(name, age = null) {
    return { name, age, roles: ["user"] };
}

// arrow, destructuring, spread
const addRole = (user, role) => ({
    ...user,
    roles: [...user.roles, role],
});

// class, static, getter
class UserService {
    static version = "1.0";

    constructor(users = []) {
        this.users = users;
    }

    get count() {
        return this.users.length;
    }

    add(user) {
        this.users.push(user);
    }
}

// control flow, optional chaining, nullish
const user = addRole(createUser("Madhan", 25), "admin");
const service = new UserService([user]);

if (service.count > 0) {
    console.log(`${APP_NAME}: ${service.users[0]?.name ?? "Unknown"}`);
}

// async / promise
async function fetchStatus() {
    return await Promise.resolve("OK");
}

fetchStatus().then(console.log);
