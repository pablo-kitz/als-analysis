import { ChangeEvent, useState } from "react";

import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";

import { ALSReport } from "./models/ALSReport";

import { ModeToggle } from "./components/mode-toggle";
import { Dropzone } from "./components/dropzone";
import { Footer } from "./components/footer";
import { Heading } from "./components/heading";

import { ReportCard } from "./components/report-card";
import { ReportCardSkeleton } from "./components/report-card-skeleton";
import { ReportDetail } from "./components/report-detail";
import { FileInput } from "./components/file-input";

function App() {
  const [reports, setReports] = useState<ALSReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<ALSReport>();
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      checkDuplicateReport(file.name);
      // const analysisResult = await AnalizeALSFile(formData);
      // setReports((prev) => [...prev, analysisResult]);
      // console.log(analysisResult);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setError(error.message);
        setIsLoading(false);
        throw error;
      } else if (typeof error === "string") {
        console.error("Error:", error);
        setError(error);
        setIsLoading(false);
        throw new Error(error);
      } else {
        console.error("Unknown error occurred");
        setError("Unknown error occurred");
        setIsLoading(false);
        throw new Error("Unknown error occurred");
      }
    }
    setTimeout(() => {
      setIsHidden(true);
    }, 800);
    setIsLoading(false);
  };

  const checkDuplicateReport = (fileName: string) => {
    if (reports.some((ALSReport) => ALSReport.fileName == fileName)) {
      throw new Error("duplicate report");
    }
  };

  const deleteReport = (report: ALSReport) => {
    setReports(reports.filter((i) => i.fileName !== report.fileName));
  };

  const selectReport = (report: ALSReport) => {
    setSelectedReport(report);
  };

  return (
    <>
      <TooltipProvider delayDuration={500}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background font-satoshi">
            <Heading />
            <FileInput />
            <Footer />
          </main>
          {/* {error && (
              <AlertDialog open>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )} */}
        </ThemeProvider>
      </TooltipProvider>
    </>
  );
}

export default App;
