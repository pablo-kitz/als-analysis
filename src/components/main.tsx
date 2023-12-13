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
    reports: JSON.parse(localStorage.getItem("reports") || "[]"),
    isLoading: false,
    deleteReport: {
      deleteModal: false,
      deleteIndex: -1,
    },
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
      <Alert.DeleteReport
        open={state.deleteReport.deleteModal}
        dispatch={dispatch}
        deleteIndex={state.deleteReport.deleteIndex}
      />
      {hasInput || state.isLoading ? (
        <div className="z-10 m-2 flex h-full max-h-full flex-1 flex-col justify-start overflow-y-scroll rounded-lg border border-secondary-foreground/20 bg-card/40 shadow-inner">
          <div className="max-h-full overflow-scroll border-b bg-secondary/20">
            {state.reports.map((report, index) => (
              <ReportLine
                key={index}
                lineKey={index}
                report={report}
                selected={selected}
                setSelected={(lineKey) => setSelected(lineKey)}
                onDelete={() =>
                  dispatch({ type: "HANDLE_DELETE", payload: index })
                }
              />
            ))}
            {state.isLoading && <ReportLine.Skeleton />}
          </div>
          <FileInput.Floating
            floatingDisplay={true}
            className="right-16 top-8"
            dispatch={dispatch}
            isLoading={state.isLoading}
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
