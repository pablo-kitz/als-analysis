import { ChangeEventHandler } from "react";
import { FileUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dropzone({
  onChange,
  className,
}: {
  onChange: ChangeEventHandler;
  className?: string;
}) {
  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-card-foreground bg-card hover:border-primary hover:text-primary hover:shadow-primary",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center px-4 py-6">
        <FileUp className="mb-4 h-8 w-8" />
        <p className="mb-2 select-none text-sm ">
          <span className="font-semibold">Click to upload</span> or drag and
          drop your .als file
        </p>
      </div>
      <input
        id="dropzone-file"
        multiple
        type="file"
        className="hidden"
        accept=".als"
        onChange={onChange}
      />
    </label>
  );
}
