import { CassetteTape, ListMusic, Tv2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type InfoPillProps = {
  info: number;
  icon: "track" | "audio" | "device";
};

export function InfoPill({ info, icon }: InfoPillProps) {
  let iconComponent;
  let iconTooltip;

  switch (icon) {
    case "track":
      iconComponent = <ListMusic className="h-full" />;
      iconTooltip = "Number of Tracks";
      break;
    case "audio":
      iconComponent = <CassetteTape className="h-full" />;
      iconTooltip = "Number of Audio Files";
      break;
    case "device":
      iconComponent = <Tv2 className="h-full" />;
      iconTooltip = "Number of non-Ableton Devices";
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="ml-8 flex h-8 w-[80px] items-center justify-around gap-2 rounded bg-accent px-2 text-accent-foreground">
          <span className="align-middle">{info}</span>
          {iconComponent}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{iconTooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
