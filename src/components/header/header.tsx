import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { AddUserDialog } from "../widgets/add-user-dialog";
import { User } from "@/types";
import FilterSheet from "./filter-sheet";

export interface PropsRefetch {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User[], Error>>;
}

export default function Header({ refetch }: PropsRefetch) {
  return (
    <header className="flex items-center justify-between py-2">
      <h3 className="text-3xl font-bold text-gray-800">All users</h3>
      <div className="space-x-2">
        <AddUserDialog />
        <FilterSheet refetch={refetch} />
      </div>
    </header>
  );
}
