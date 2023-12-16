import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

type Language = {
  nativeName: string;
};

const lngs: Record<string, Language> = {
  en: { nativeName: "English" },
  es: { nativeName: "Spanish" },
};

export function LangToggle() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-14 z-20"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Language Selection</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.keys(lngs).map((lng) => (
          <DropdownMenuItem key={lng} onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
