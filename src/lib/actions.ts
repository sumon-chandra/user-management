import { User } from "@/types";

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:5000/users");
  if (!response.ok) {
    throw new Error("Network error!");
  }
  const data = await response.json();
  return data;
}

export async function getSingleUser(userId: number) {
  const response = await fetch(`http://localhost:5000/users/${userId}`);
  const data = await response.json();
  return data;
}

export async function createUser(user: User) {
  console.log({ user });

  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // console.log({ response });

  if (!response.ok) {
    throw new Error("Network error!");
  }
  const data = await response.json();
  console.log({ data });

  return data;
}

export async function editUser(user: User) {
  const response = await fetch(`http://localhost:5000/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // console.log({ response });

  if (!response.ok) {
    throw new Error("Network error!");
  }
  const data = await response.json();
  console.log({ data });

  return data;
}

export async function deleteUser(userId: number) {
  const response = await fetch(`http://localhost:5000/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network error!");
  }
  const data = await response.json();
  return data;
}
