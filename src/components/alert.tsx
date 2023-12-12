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
import { Button } from "./ui/button";

// TODO: refactor to have a base alert and subcomponents for each case

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

interface DeleteAlertProps {
  open: boolean;
  dispatch: React.Dispatch<FileAction>;
  deleteIndex: number;
}

Alert.DeleteReport = ({ open, dispatch, deleteIndex }: DeleteAlertProps) => {
  const handleCancel = () => {
    dispatch({ type: "HANDLE_DELETE", payload: 0 });
  };

  const handleReplace = () => {
    dispatch({ type: "DELETE", payload: deleteIndex });
  };
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deleting report</AlertDialogTitle>
            <AlertDialogDescription>
              You are deleting the selected report, this action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              asChild
              className="bg-destructive/50 text-destructive-foreground hover:border-foreground hover:bg-destructive "
              onClick={handleReplace}
            >
              <Button variant="destructive">Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
