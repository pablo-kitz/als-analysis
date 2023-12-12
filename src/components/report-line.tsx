import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ALSReport } from "@/models/ALSReport";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState } from "react";
import { Track } from "@/models/Track";
import { Device } from "@/models/Device";
import { AudioClip } from "@/models/Audio";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export type ToggleMenus = "tracks" | "devices" | "audios" | "";

type ReportLineProps = {
  report: ALSReport;
};

export function ReportLine({ report }: ReportLineProps) {
  const [value, setValue] = useState<ToggleMenus>("");

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

  return (
    <>
      <div className="border-secondary/50 grid w-full grid-cols-2 border-t px-4 py-2 first:border-t-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="my-auto mr-auto font-bold tracking-wide">
              {report.shortFileName}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {`${report.fileName} - ${report.liveVer}`}
          </TooltipContent>
        </Tooltip>
        <ToggleGroup
          value={value}
          onValueChange={(value) => setValue(value as ToggleMenus)}
          type="single"
          className="mr-16 flex justify-around gap-8"
        >
          <ToggleGroupItem
            variant={"outline"}
            className="shadow-foreground/10 w-28 shadow-md"
            value="tracks"
          >
            {report.tracks.length} Tracks
          </ToggleGroupItem>
          <ToggleGroupItem
            variant={"outline"}
            className="shadow-foreground/10 w-28 shadow-md"
            value="devices"
          >
            {report.devices.length} Devices
          </ToggleGroupItem>
          <ToggleGroupItem
            variant={"outline"}
            className="shadow-foreground/10 w-28 shadow-md"
            value="audios"
          >
            {report.audios.length} Audios
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {toggleContent}
    </>
  );
}

ReportLine.Skeleton = () => {
  return (
    <>
      <div className="border-secondary/50 grid w-full grid-cols-2 border-t px-4 py-2">
        <Skeleton className="h-8 w-[300px]" />
        <div className="mr-16 flex justify-around gap-8">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
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
      <div className="divide-secondary-foreground/20 grid grid-cols-3 bg-accent px-6 text-xs text-primary">
        <div>{cols[0]}</div>
        <div className="text-center">{cols[1]}</div>
        <div className="text-center">{cols[2]}</div>
      </div>
      {type.map((type, index) => (
        <div
          key={index}
          className="divide-secondary-foreground/5 bg-card/20 shadow-foreground/10 grid max-h-6 grid-cols-3 divide-x divide-dashed px-6 shadow-sm"
        >
          <div
            className={cn(
              {
                "text-destructive":
                  "location" in type && !type.isOnRecommendedDir,
              },
              "font-bold",
            )}
          >
            {getName(type)}
          </div>
          <div className="overflow-clip text-ellipsis text-center">
            {getDetail1(type)}
          </div>
          {"location" in type ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="line-clamp-1 overflow-clip">
                  {getDetail2(type)}
                </div>
              </TooltipTrigger>
              <TooltipContent>{getDetail2(type)}</TooltipContent>
            </Tooltip>
          ) : (
            <div className="line-clamp-1 overflow-clip text-right">
              {getDetail2(type)}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// utility functions to get correct field depending on detail type
const getName = (type: Track | Device | AudioClip) => {
  if ("name" in type) {
    return type.name;
  } else {
    return type.audioFileName;
  }
};

const getDetail1 = (type: Track | Device | AudioClip) => {
  if ("type" in type) {
    return type.type;
  }
  if ("location" in type) {
    return type.view;
  }
};

const getDetail2 = (type: Track | Device | AudioClip) => {
  if ("devices" in type) {
    return type.devices.length + " - " + type.audios.length;
  }
  if ("path" in type) {
    return type.path;
  }
  if ("view" in type) {
    return type.location;
  }
};
