import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <Table className="mt-6">
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Profession</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.profession}</TableCell>
            <TableCell>{user.location.city}</TableCell>
            <TableCell>{user.location.country}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
