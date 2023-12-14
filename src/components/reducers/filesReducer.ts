import { ALSReport } from "@/models/ALSReport";

interface AddFiles {
  type: "ADD";
  payload: ALSReport[];
}

interface Loading {
  type: "LOADING";
}

interface ReplaceFile {
  type: "REPLACE";
  payload: ALSReport[];
}

interface DeleteFile {
  type: "DELETE";
  payload: number;
}

interface HandleDelete {
  type: "HANDLE_DELETE";
  payload: number;
}

export type FileAction =
  | AddFiles
  | ReplaceFile
  | HandleDelete
  | DeleteFile
  | Loading;

interface State {
  reports: ALSReport[];
  isLoading: boolean;
  deleteReport: {
    deleteModal: boolean;
    deleteIndex: number;
  };
  replaceFile: {
    isOpen: boolean;
    duplicateReports: ALSReport[];
  };
}

const checkDuplicateReport = (state: ALSReport[], files: ALSReport[]) => {
  files.forEach((file) => {
    if (state.some((ALSReport) => ALSReport.fileName === file.fileName)) {
      throw new Error("duplicate report");
    }
  });
};

const filesReducer = (state: State, action: FileAction): State => {
  switch (action.type) {
    case "ADD":
      try {
        checkDuplicateReport(state.reports, action.payload);
        const newReports = state.reports.concat(action.payload);
        localStorage.setItem("reports", JSON.stringify(newReports));
        return {
          ...state,
          reports: [...newReports],
          isLoading: false,
        };
      } catch (error) {
        return {
          ...state,
          isLoading: false,
          replaceFile: {
            isOpen: true,
            duplicateReports: action.payload,
          },
        };
      }
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "REPLACE": {
      if (action.payload.length === 0) {
        return {
          ...state,
          replaceFile: {
            isOpen: false,
            duplicateReports: [] as ALSReport[],
          },
        };
      }
      const replacedReports = state.reports.map((report) => {
        const foundReplacement = action.payload.find(
          (newReport) => newReport.fileName === report.fileName,
        );
        return foundReplacement || report;
      });

      localStorage.setItem("reports", JSON.stringify(replacedReports));
      return {
        ...state,
        reports: replacedReports,
        replaceFile: {
          isOpen: false,
          duplicateReports: [] as ALSReport[],
        },
      };
    }
    case "HANDLE_DELETE":
      return {
        ...state,
        deleteReport: {
          deleteModal: !state.deleteReport.deleteModal,
          deleteIndex: action.payload,
        },
      };
    case "DELETE": {
      const newReports = state.reports.filter(
        (_, index) => index !== action.payload,
      );
      localStorage.setItem("reports", JSON.stringify(newReports));
      return {
        ...state,
        deleteReport: {
          deleteModal: !state.deleteReport.deleteModal,
          deleteIndex: -1,
        },
        reports: newReports,
      };
    }
    default:
      return state;
  }
};

export default filesReducer;
