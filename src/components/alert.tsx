import { ALSReport } from "@/models/ALSReport";
import { FileAction } from "./reducers/filesReducer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface AlertProps {
  open: boolean;
  dispatch: React.Dispatch<FileAction>;
  duplicates: ALSReport[];
}

export function Alert({ open, dispatch, duplicates }: AlertProps) {
  const handleCancel = () => {
    dispatch({ type: "REPLACE", payload: [] });
  };

  const handleReplace = () => {
    dispatch({ type: "REPLACE", payload: duplicates });
  };

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {duplicates.length === 1 ? (
                <>Duplicate Report Found</>
              ) : (
                <>Duplicate Reports Found</>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mb-2">
                {duplicates.length === 1 ? (
                  <>
                    The following report is a duplicate of another report. Do
                    you wish to replace it?
                  </>
                ) : (
                  <>
                    The following reports are duplicates of other reports. Do
                    you wish to replace it?
                  </>
                )}
              </div>
              {duplicates.map((report) => {
                return <div className="font-bold">{report.fileName}</div>;
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReplace}>
              Replace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
