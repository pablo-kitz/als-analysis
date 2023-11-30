import { ALSReport } from "@/models/ALSReport";

interface AddFiles {
  type: "ADD";
  payload: ALSReport[];
}

interface Loading {
  type: "LOADING";
}

type FileAction = AddFiles | Loading;

interface State {
  reports: ALSReport[];
  isLoading: boolean;
}

// const checkDuplicateReport = (state: ALSReport[], files: ALSReport[]) => {
//   files.forEach((file) => {
//     if (state.some((ALSReport) => ALSReport == file)) {
//       throw new Error("duplicate report");
//     }
//   });
// };

const filesReducer = (state: State, action: FileAction): State => {
  switch (action.type) {
    case "ADD":
      return {
        reports: [...state.reports, ...action.payload],
        isLoading: false,
      };
    case "LOADING":
      state.isLoading = true;
      return state;
    default:
      return state;
  }
};

export default filesReducer;
