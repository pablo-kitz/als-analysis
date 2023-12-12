import { useState, type ChangeEvent, type DragEvent } from "react";

import { cn } from "@/lib/utils";
import { FileAction } from "./reducers/filesReducer";
import { AnalizeALSFile } from "@/models";
import { FileUp } from "lucide-react";
import { useToast } from "./ui/use-toast";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  dispatch: React.Dispatch<FileAction>;
  floatingDisplay: boolean;
}

const FileInput = ({
  className,
  dispatch,
  floatingDisplay,
  ...props
}: InputProps) => {
  const { toast } = useToast();

  const [dragActive, setDragActive] = useState<boolean>(false);

  // handle drag events
  const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // validate file type
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) => validateFileType(file));

      if (files.length !== validFiles.length) {
        toast({
          title: "Invalid file type",
          description: "Only .als files are allowed.",
        });
        return;
      }

      try {
        setDragActive(false);

        addReportToState(files);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Error ocurred, please check the console",
        });
      }
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      if (e.target.files && e.target.files[0]) {
        const files = Array.from(e.target.files);

        addReportToState(files);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error ocurred, please check the console",
      });
    }
  };

  const addReportToState = async (files: File[]) => {
    dispatch({ type: "LOADING" });

    const analysisResults = await Promise.all(
      files.map((file) => AnalizeALSFile(file)),
    );
    dispatch({ type: "ADD", payload: analysisResults });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onDragEnter={handleDrag}
      className={cn(
        "flex h-full w-full flex-1 flex-col items-center justify-start",
        className,
      )}
    >
      <label
        htmlFor="dropzone-file"
        className={cn(
          "bg-card/30 hover:bg-primary/25 flex w-full flex-1 flex-col overflow-hidden rounded-lg border-2 border-card-foreground shadow-lg transition hover:border hover:border-primary hover:shadow-2xl",
          {
            "bg-primary/25 border border-primary": dragActive,
          },
        )}
      >
        <div
          className="flex h-full w-full flex-1 cursor-pointer flex-col items-center justify-center gap-4 "
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {floatingDisplay ? (
            <>
              <FileUp className="hidden h-8 w-8 md:block" />
              <input
                {...props}
                multiple
                onChange={handleChange}
                accept=".als"
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </>
          ) : (
            <>
              <FileUp className="hidden h-8 w-8 md:block" />
              <p className="select-none text-sm md:text-xs lg:text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop your .als file
              </p>
              <input
                {...props}
                multiple
                onChange={handleChange}
                accept=".als"
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </>
          )}
        </div>
      </label>
    </form>
  );
};

FileInput.Floating = ({ className, dispatch, ...props }: InputProps) => {
  return (
    <FileInput
      {...props}
      dispatch={dispatch}
      className={cn("absolute z-10 h-32 w-32", className)}
    />
  );
};

function validateFileType(file: File) {
  const validType = "als";
  return file.name.endsWith(validType);
}

export { FileInput };
