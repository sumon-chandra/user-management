import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { SyntheticEvent } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { User } from "@/types";

interface Props {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User[], Error>>;
}

export default function FilterBox({ refetch }: Props) {
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const handleSubmit = (e: SyntheticEvent) => {
    // refetch();
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    const searchText = target.search.value;
    setSearchParams((prev) => {
      prev.set("search", searchText);
      return prev;
    });
    refetch();
  };
  const q = searchParams.get("search");

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="Filter" name="search" defaultValue={q!} />
    </form>
  );
}
