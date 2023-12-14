import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ALSReport } from "@/models/ALSReport";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useEffect, useState } from "react";
import { Track } from "@/models/Track";
import { Device } from "@/models/Device";
import { AudioClip } from "@/models/Audio";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Button, buttonVariants } from "./ui/button";
import { Trash } from "lucide-react";
import { toggleVariants } from "./ui/toggle";

export type ToggleMenus = "tracks" | "devices" | "audios" | "";

type ReportLineProps = {
  lineKey: number;
  report: ALSReport;
  selected: number | undefined;
  setSelected: (lineKey: number) => void;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
};

export function ReportLine({
  lineKey,
  report,
  selected,
  setSelected,
  onDelete,
}: ReportLineProps) {
  const [value, setValue] = useState<ToggleMenus>("");

  useEffect(() => {
    if (selected != lineKey) {
      setValue("");
    }
  }, [selected, lineKey]);

  const isOpen = value ? true : false;

  const toggleContent = {
    tracks: (
      <ReportLine.Detail
        cols={["Track Name", "Track Type", "Track Devices - Audios"]}
        type={report.tracks}
      />
    ),
    devices: (
      <ReportLine.Detail
        cols={["Device Name", "Device Type", "Device Location"]}
        type={report.devices}
      />
    ),
    audios: (
      <ReportLine.Detail
        cols={["Audio Name", "Audio View Location", "Audio File Location"]}
        type={report.audios}
      />
    ),
    "": null,
  }[value];

  function handleToggleSelect(type: ToggleMenus) {
    setTimeout(() => setValue(type), 100);
    setSelected(lineKey);
  }

  return (
    <>
      <div className="group grid w-full grid-cols-2 border-t border-secondary/50 px-4 py-2 first:border-t-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="my-auto mr-auto font-bold tracking-wide ">
              {report.shortFileName}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {`${report.fileName} - ${report.liveVer}`}
          </TooltipContent>
        </Tooltip>
        <div className="flex">
          <ToggleGroup
            value={value}
            onValueChange={(value) => handleToggleSelect(value as ToggleMenus)}
            type="single"
            className="mr-16 flex flex-grow justify-around gap-8"
          >
            <ToggleGroupItem
              variant={"outline"}
              className="w-28 shadow-md shadow-foreground/10"
              value="tracks"
            >
              {report.tracks.length} Tracks
            </ToggleGroupItem>
            <ToggleGroupItem
              variant={"outline"}
              className="w-28 shadow-md shadow-foreground/10"
              value="devices"
            >
              {report.devices.length} Devices
            </ToggleGroupItem>
            <ToggleGroupItem
              variant={"outline"}
              className="w-28 shadow-md shadow-foreground/10"
              value="audios"
            >
              {report.audios.length} Audios
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            variant="outline"
            size="icon"
            className="opacity-0 transition-all duration-500 hover:bg-destructive/25 hover:text-destructive group-hover:opacity-100"
            onClick={onDelete}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div
        className={`overflow-scroll bg-muted shadow-inner transition-[height] ${
          isOpen ? "h-[270px]" : "h-0"
        }`}
      >
        {toggleContent}
      </div>
    </>
  );
}

ReportLine.Skeleton = () => {
  return (
    <>
      <div className="grid w-full grid-cols-2 border-t border-secondary/50 px-4 py-2">
        <Skeleton className="my-auto h-8 w-[300px]" />
        <div className="flex">
          <div className="mr-16 flex flex-grow justify-around gap-8">
            <Skeleton
              className={cn(
                toggleVariants({ variant: "outline", className: "w-28" }),
              )}
            />
            <Skeleton
              className={cn(
                toggleVariants({ variant: "outline", className: "w-28" }),
              )}
            />
            <Skeleton
              className={cn(
                toggleVariants({ variant: "outline", className: "w-28" }),
              )}
            />
          </div>
          <Skeleton
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              }),
            )}
          />
        </div>
      </div>
    </>
  );
};

ReportLine.Detail = ({
  type,
  cols,
}: {
  type: Track[] | Device[] | AudioClip[];
  cols: string[];
}) => {
  return (
    <>
      <div className="sticky top-0 grid grid-cols-3 divide-secondary-foreground/20 bg-accent px-6 text-xs text-primary shadow-sm">
        <div>{cols[0]}</div>
        <div className="text-center">{cols[1]}</div>
        <div className="text-center">{cols[2]}</div>
      </div>
      {type.map((type, index) => (
        <div
          key={index}
          className="grid max-h-6 grid-cols-3 divide-x divide-dashed divide-secondary-foreground/50 border-b border-muted bg-background px-6 shadow-sm shadow-foreground/50 last:border-b-0"
        >
          {getName(type)}
          {getDetail1(type)}
          {getDetail2(type)}
        </div>
      ))}
    </>
  );
};

// utility functions to get correct field depending on detail type
const getName = (type: Track | Device | AudioClip) => {
  if ("devices" in type) {
    return <div className={cn("font-bold")}>{type.name}</div>;
  }
  if ("path" in type) {
    return <div className={cn("font-bold")}>{type.name}</div>;
  }
  if ("view" in type) {
    return (
      <div
        className={cn("font-bold", {
          "text-destructive": !type.isOnRecommendedDir,
        })}
      >
        {type.audioFileName}
      </div>
    );
  }
};

const getDetail1 = (type: Track | Device | AudioClip) => {
  if ("type" in type) {
    return (
      <div className="overflow-clip text-ellipsis text-center">{type.type}</div>
    );
  }
  if ("location" in type) {
    return (
      <div className="overflow-clip text-ellipsis text-center">{type.view}</div>
    );
  }
};

const getDetail2 = (type: Track | Device | AudioClip) => {
  // Track
  if ("devices" in type) {
    return (
      <div className="line-clamp-1 overflow-clip pl-8 text-right">
        <Tooltip>
          <TooltipTrigger
            className={cn({ "cursor-default": type.devices.length === 0 })}
          >
            Devices: {type.devices.length}
          </TooltipTrigger>
          {type.devices.length > 0 && (
            <TooltipContent>
              {type.devices.map((device, index) => (
                <div key={index}>{device.name}</div>
              ))}
            </TooltipContent>
          )}
        </Tooltip>
        {" - "}
        <Tooltip>
          <TooltipTrigger
            className={cn({ "cursor-default": type.audios.length === 0 })}
          >
            Audios: {type.audios.length}
          </TooltipTrigger>
          {type.audios.length > 0 && (
            <TooltipContent>
              {type.audios.map((audio, index) => (
                <div key={index}>{audio.audioFileName}</div>
              ))}
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    );
  }
  // Device
  if ("path" in type) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="line-clamp-1 overflow-clip pl-8">{type.path}</div>
        </TooltipTrigger>
        <TooltipContent>{type.path}</TooltipContent>
      </Tooltip>
    );
  }
  // Audio
  if ("view" in type) {
    return (
      <div className="line-clamp-1 flex justify-around overflow-clip pl-8 text-right">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn("line-clamp-1 overflow-clip font-bold", {
                "text-destructive": !type.isOnRecommendedDir,
              })}
            >
              {type.location}
            </div>
          </TooltipTrigger>
          <TooltipContent>{type.location}</TooltipContent>
        </Tooltip>
      </div>
    );
  }
};
