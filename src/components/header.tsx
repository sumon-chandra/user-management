import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import FilterBox from "./filter-box";
import { AddUserDialog } from "./widgets/add-user-dialog";
import { User } from "@/types";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User[], Error>>;
}

export default function Header({ refetch }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClearFilter = () => {
    setSearchParams({ search: "" });
    refetch();
  };
  const query = searchParams.get("search");

  return (
    <header className="flex items-center justify-between py-2">
      <h3 className="text-3xl font-bold text-gray-800">All users</h3>
      <div className="flex items-center justify-start gap-2">
        <FilterBox refetch={refetch} />
        {query && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs flex gap-1"
            onClick={handleClearFilter}
          >
            <SlidersHorizontal size={10} />
            <span>Clear filter</span>
          </Button>
        )}
      </div>
      <AddUserDialog />
    </header>
  );
}
