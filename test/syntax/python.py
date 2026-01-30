"""Simple user app using many Python features"""

import asyncio
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional


# enum
class Status(Enum):
    IDLE = 0
    READY = 1


# dataclass
@dataclass
class User:
    name: str
    age: Optional[int]
    roles: List[str]


# function with defaults
def create_user(name: str, age: int | None = None) -> User:
    return User(name, age, ["user"])


# class, property
class UserService:
    def __init__(self):
        self._users: list[User] = []

    @property
    def count(self) -> int:
        return len(self._users)

    def add(self, user: User) -> None:
        self._users.append(user)


# control flow, match
service = UserService()
user = create_user("Madhan", 25)
user.roles.append("admin")
service.add(user)

match service.count:
    case 0:
        status = Status.IDLE
    case _:
        status = Status.READY


async def fetch_status() -> Status:
    await asyncio.sleep(0.1)
    return status


asyncio.run(fetch_status())
