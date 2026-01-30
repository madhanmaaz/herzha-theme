import React, { useState } from "react";

// ---------- User Component ----------
const UserCard = ({ user }) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "5px 0",
                backgroundColor: user.roles.includes("admin")
                    ? "#f0f8ff"
                    : "#fff",
            }}
        >
            <strong>{user.name}</strong> (Age: {user.age})<br />
            Roles: {user.roles.join(", ")}
            <br />
            Hello, {user.name}!
        </div>
    );
};

// ---------- Main App Component ----------
const UserManager = () => {
    const [users, setUsers] = useState([
        { name: "Madhan", age: 25, roles: ["user", "admin"] },
    ]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const addUser = () => {
        if (!name || !age) return;
        const newUser = { name, age: parseInt(age), roles: ["user"] };
        if (users.length === 0) newUser.roles.push("admin"); // first user admin
        setUsers([...users, newUser]);
        setName("");
        setAge("");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>User Manager App</h1>

            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button onClick={addUser}>Add User</button>
            </div>

            <h2>Users:</h2>
            <div>
                {users.map((user, idx) => (
                    <UserCard key={idx} user={user} />
                ))}
            </div>
        </div>
    );
};

export default UserManager;
