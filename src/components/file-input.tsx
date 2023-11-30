"use client";

import {
  forwardRef,
  useReducer,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
// import { useToast } from "@/src/hooks/use-toast";
// import ImageUpload from "@/ui/image-upload";

import { cn } from "@/lib/utils";
import { ALSReport } from "@/models/ALSReport";
import filesReducer from "./reducers/filesReducer";
import { AnalizeALSFile } from "@/models";
import { FileUp, Plus } from "lucide-react";
import { ReportCardSkeleton } from "./report-card-skeleton";
import { ReportLine } from "./report-line";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    // const { toast } = useToast();
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [state, dispatch] = useReducer(filesReducer, {
      reports: [] as ALSReport[],
      isLoading: false,
    });

    const noInput = state.reports.length === 0;

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

        // const validFiles = files.filter((file) => validateFileType(file));

        // if (files.length !== validFiles.length) {
        //   toast({
        //     title: "Invalid file type",
        //     description: "Only image files are allowed.",
        //   });
        // }

        try {
          // const filesWithUrl = await Promise.all(
          //   validFiles.map(async (file) => {
          //     const { name, size } = file;
          //     const { getUrl, error } = await s3Upload(file);

          //     if (!getUrl || error) return { name, size, getUrl: "", error };
          //     return { name, size, getUrl };
          //   }),
          // );
          setDragActive(false);
          // at least one file has been selected
          addFilesToState(files);

          e.dataTransfer.clearData();
        } catch (error) {
          // already handled
        }
      }
    };

    // triggers when file is selected with click
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        if (e.target.files && e.target.files[0]) {
          const files = Array.from(e.target.files);
          addFilesToState(files);
        }
      } catch (error) {
        // already handled
      }
    };

    const addFilesToState = async (files: File[]) => {
      dispatch({ type: "LOADING" });
      const analysisResults = await Promise.all(
        files.map((file) => AnalizeALSFile(file)),
      );
      dispatch({ type: "ADD", payload: analysisResults });
    };

    const selectReport = (report: ALSReport) => {
      return;
    };

    return (
      <>
        <form
          onSubmit={(e) => e.preventDefault()}
          onDragEnter={handleDrag}
          className={cn(
            "z-10 flex h-full w-full flex-1 flex-col items-center justify-start",
            className,
          )}
        >
          <label
            htmlFor="dropzone-file"
            className="mx-auto my-4 flex w-3/4 flex-1 flex-col overflow-hidden rounded-lg shadow-lg transition hover:shadow-2xl"
          >
            {noInput ? (
              <>
                <div
                  className="flex h-full w-full flex-1 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-card-foreground bg-card/30 transition hover:bg-secondary/30"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileUp className="hidden h-8 w-8 md:block" />
                  <p className="select-none text-sm md:text-xs lg:text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop your .als file
                  </p>
                  <input
                    {...props}
                    ref={ref}
                    multiple
                    onChange={handleChange}
                    accept=".als"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex h-full w-full flex-1 flex-col justify-between rounded-lg border-2 border-card-foreground bg-card/30">
                  <table className="divide-y divide-secondary-foreground">
                    <tr className="h-fit bg-secondary text-secondary-foreground">
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Project
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Tracks
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Ext. Devices
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Ext. Audios
                      </th>
                    </tr>
                    <tbody className="relative divide-y divide-secondary-foreground">
                      {state.reports.map((report, index) => (
                        <ReportLine report={report} key={index} />
                      ))}
                      {state.isLoading && <ReportCardSkeleton />}
                    </tbody>
                  </table>

                  <label
                    htmlFor="dropzone-file-images-present"
                    className="group relative flex cursor-pointer justify-center border-t border-secondary-foreground py-4 transition hover:border-gray-500 hover:dark:bg-slate-800"
                  >
                    <Plus className="h-12 w-12 fill-slate-500 stroke-1 transition group-hover:fill-slate-400" />
                    <input
                      {...props}
                      ref={ref}
                      multiple
                      onChange={handleChange}
                      accept=".als"
                      type="file"
                      id="dropzone-file-images-present"
                      className="relative z-20 hidden"
                    />
                    <div
                      className="absolute inset-0"
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    />
                  </label>
                </div>
              </>
            )}
          </label>
        </form>
      </>
    );
  },
);
FileInput.displayName = "FileInput";

export { FileInput };
