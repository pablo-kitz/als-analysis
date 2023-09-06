import { ChangeEvent, useState } from "react";
import { AnalizeALSFile } from "./models";
import { ALSReport } from "./models/ALSReport";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Dropzone } from "./components/dropzone";
import { ReportCard } from "./components/report-card";
import { cn } from "./lib/utils";
import { ReportSkeleton } from "./components/report-skeleton";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const [results, setResults] = useState<ALSReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      const analysisResult = await AnalizeALSFile(formData);
      setResults((prev) => [...prev, analysisResult]);
      console.log(analysisResult);
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

  return (
    <>
      <TooltipProvider delayDuration={500}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="relative flex max-h-screen min-h-screen flex-col bg-background font-satoshi">
            <main className="flex flex-grow flex-col">
              <ModeToggle />
              <div className="flex gap-8 bg-gradient-to-l from-muted to-popover px-8 py-4 lg:px-16">
                <div>
                  <h1 className="text-4xl font-bold tracking-wider lg:text-6xl/relaxed">
                    Scan your Ableton Live project files
                  </h1>
                  <p className="text-lg text-muted-foreground lg:text-4xl/snug ">
                    Identify samples not collected or stored in your User Folder
                  </p>
                  <p className="text-lg text-muted-foreground lg:text-4xl/tight">
                    & list all the plugins used.
                  </p>
                  <p className="text-sm tracking-wide text-muted-foreground/50 ">
                    Never loose a single sound in your creations
                  </p>
                </div>
                <Dropzone
                  className={cn(
                    "mx-auto mb-8 mt-auto h-[180px] w-[350px] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl ",
                    { hidden: results.length === 0 },
                  )}
                  onChange={handleFileUpload}
                />
              </div>
              <div className="flex flex-col divide-y divide-solid divide-muted-foreground/50 border-y border-muted-foreground/50">
                {results.map((report) => (
                  <ReportCard report={report} />
                ))}
                {isLoading && <ReportSkeleton />}
                <ReportSkeleton />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <Dropzone
                className={cn(
                  "mx-auto mb-8 mt-auto h-[150px] w-[350px] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl ",
                  { "opacity-0": results.length != 0 },
                  { hidden: isHidden },
                )}
                onChange={handleFileUpload}
              />
            </main>
            <footer className="z-20 mx-auto mb-2">
              <ul className="flex items-center gap-2 text-sm font-medium">
                <li>
                  <a href="" className="">
                    Github
                  </a>
                </li>
                <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                <li>
                  <a href="" className="">
                    Created By
                  </a>
                </li>
                <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                <li>
                  <a className="">{new Date().getFullYear().toString()}</a>
                </li>
              </ul>
            </footer>
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </>
  );
}

export default App;
