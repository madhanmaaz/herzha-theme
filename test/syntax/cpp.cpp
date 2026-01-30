#include <iostream>
#include <vector>
#include <optional>

using namespace std;

// struct
struct User {
    string name;
    optional<int> age;
    vector<string> roles;
};

// function
User createUser(string name, optional<int> age = nullopt) {
    return {name, age, {"user"}};
}

// class
class UserService {
    vector<User> users;

public:
    void add(const User& user) {
        users.push_back(user);
    }

    size_t count() const {
        return users.size();
    }
};

int main() {
    User user = createUser("Madhan", 25);
    user.roles.push_back("admin");

    UserService service;
    service.add(user);

    if (service.count() > 0) {
        cout << "User added\n";
    }
}
