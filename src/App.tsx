import { useTranslation } from "react-i18next";

import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";

import { Heading } from "./components/heading";
import { Footer } from "./components/footer";
import { Main } from "./components/main";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);
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
