package main

import "fmt"

// struct
type User struct {
	Name  string
	Age   *int
	Roles []string
}

// function
func createUser(name string, age *int) User {
	return User{name, age, []string{"user"}}
}

// method
type UserService struct {
	users []User
}

func (s *UserService) Add(user User) {
	s.users = append(s.users, user)
}

func main() {
	age := 25
	user := createUser("Madhan", &age)
	user.Roles = append(user.Roles, "admin")

	service := UserService{}
	service.Add(user)

	if len(service.users) > 0 {
		fmt.Println("User added")
	}
}
