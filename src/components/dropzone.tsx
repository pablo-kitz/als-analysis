import { FileUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dropzone({
  onChange,
  className,
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        "z-10 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-card-foreground bg-card px-4 py-6 text-center shadow-lg transition hover:border-primary hover:text-primary hover:shadow-2xl hover:shadow-primary",
        className,
      )}
    >
      <FileUp className="hidden h-8 w-8 md:block" />
      <p className="select-none text-sm md:text-xs lg:text-sm">
        <span className="font-semibold">Click to upload</span> or drag and drop
        your .als file
      </p>
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
