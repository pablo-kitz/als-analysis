import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";

import { Heading } from "./components/heading";
import { Footer } from "./components/footer";
import { Main } from "./components/main";
import { Toaster } from "./components/ui/toaster";

function App() {
  // const checkDuplicateReport = (fileName: string) => {
  //   if (reports.some((ALSReport) => ALSReport.fileName == fileName)) {
  //     throw new Error("duplicate report");
  //   }
  // };

  return (
    <>
      <TooltipProvider delayDuration={500}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background font-satoshi">
            <Heading />
            <Main />
            <Footer />
            <Toaster />
          </main>
        </ThemeProvider>
      </TooltipProvider>
    </>
  );
}

export default App;
