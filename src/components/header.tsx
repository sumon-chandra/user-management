import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import FilterBox from "./filter-box";
import { AddUserDialog } from "./widgets/add-user-dialog";
import { User } from "@/types";

interface Props {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User[], Error>>;
}

export default function Header({ refetch }: Props) {
  return (
    <header className="flex items-center justify-between py-2">
      <h3 className="text-3xl font-bold text-gray-800">All users</h3>
      <FilterBox refetch={refetch} />
      <AddUserDialog />
    </header>
  );
}
