import { File } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { ALSReport } from "@/models/ALSReport";

export function ReportCard({
  report,
  selectReport,
}: {
  report: ALSReport;
  selectReport: (report: ALSReport) => void;
}) {
  return (
    <Button
      key={report.fileName}
      variant="outline"
      className="z-20 flex h-32 w-64 flex-col items-start justify-normal gap-1 rounded-lg bg-card p-2 text-card-foreground shadow hover:shadow-lg"
      onClick={() => selectReport(report)}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex w-full items-center gap-3">
            <div className="p-1">
              <File />
            </div>
            <div className="w-fit truncate pr-2 font-semibold text-primary">
              {report.shortFileName}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {`${report.fileName} - ${report.liveVer}`}
        </TooltipContent>
      </Tooltip>
      <div className="ml-auto">
        <Badge variant="outline">Tracks - {report.tracks.length}</Badge>
      </div>
      <div className="ml-auto">
        <Badge variant="outline">
          External Devices - {report.nonNativeDevices.length}
        </Badge>
      </div>
      <div className="ml-auto">
        <Badge variant="destructive">
          External Audios - {report.externalAudios.length}
        </Badge>
      </div>
    </Button>
  );
}
