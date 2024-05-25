import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-2">
      <h3 className="text-3xl font-bold text-gray-800">All users</h3>
      <Button>Add new user</Button>
    </header>
  );
}
