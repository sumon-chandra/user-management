import { User } from "@/types";

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:5000/users");
  if(!response.ok) {
    throw new Error("Network error!");
  }
  const data = await response.json();
  return data;
}

export async function getSingleUser(userId:number) {
  const response = await fetch(`http://localhost:5000/users/${userId}`);
  const data = await response.json();
  return data;
}
