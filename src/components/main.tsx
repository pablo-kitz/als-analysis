import { ALSReport } from "@/models/ALSReport";
import { FileInput } from "./file-input";
import { useReducer, useState } from "react";
import filesReducer from "./reducers/filesReducer";
import { ReportLine } from "./report-line";
import { Alert } from "./alert";

export type ToggleMenus = "tracks" | "devices" | "audios" | "";

export const Main = () => {
  // Reports state / actions
  const [state, dispatch] = useReducer(filesReducer, {
    reports: [] as ALSReport[],
    isLoading: false,
    replaceFile: {
      isOpen: false,
      duplicateReports: [] as ALSReport[],
    },
  });
  // Menus state
  const [selected, setSelected] = useState<number>();

  const hasInput = state.reports.length != 0;

  return (
    <>
      <Alert
        open={state.replaceFile.isOpen}
        dispatch={dispatch}
        duplicates={state.replaceFile.duplicateReports}
      />
      {hasInput || state.isLoading ? (
        <div className="border-secondary-foreground/20 bg-card/40 z-10 m-2 flex h-full max-h-full flex-1 flex-col justify-start overflow-y-scroll rounded-lg border shadow-inner">
          <div className="bg-secondary/20 max-h-full overflow-scroll border-b">
            {state.reports.map((report, index) => (
              <ReportLine
                key={index}
                lineKey={index}
                report={report}
                selected={selected}
                setSelected={(lineKey) => setSelected(lineKey)}
              />
            ))}
            {state.isLoading && <ReportLine.Skeleton />}
          </div>
          <FileInput.Floating
            floatingDisplay={true}
            className="right-16 top-8"
            dispatch={dispatch}
          />
        </div>
      ) : (
        <div className="z-10 mx-auto my-4 flex h-full w-3/4 flex-1 flex-col items-center justify-start">
          <FileInput floatingDisplay={false} dispatch={dispatch} />
        </div>
      )}
    </>
  );
};
