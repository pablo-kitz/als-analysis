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

export type FileAction = AddFiles | ReplaceFile | Loading;

interface State {
  reports: ALSReport[];
  isLoading: boolean;
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
        return {
          ...state,
          reports: [...state.reports, ...action.payload],
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
    case "REPLACE":
      if (action.payload.length === 0) {
        return {
          ...state,
          replaceFile: {
            isOpen: false,
            duplicateReports: [] as ALSReport[],
          },
        };
      }
      return {
        ...state,
        reports: state.reports.map((report) => {
          const foundReplacement = action.payload.find(
            (newReport) => newReport.fileName === report.fileName,
          );
          return foundReplacement || report;
        }),
        replaceFile: {
          isOpen: false,
          duplicateReports: [] as ALSReport[],
        },
      };
    default:
      return state;
  }
};

export default filesReducer;
