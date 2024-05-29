import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { PropsRefetch } from "./header";
import FilterByName from "./filter/filter-by-name";
import FilterByEmail from "./filter/filter-by-email";

export default function FilterSheet({ refetch }: PropsRefetch) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal size={12} />
          <span className="ml-2">Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center mb-2">Filter</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <FilterByName refetch={refetch} />
          <FilterByEmail refetch={refetch} />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
