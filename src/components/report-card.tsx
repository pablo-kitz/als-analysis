import { ALSReport } from "@/models/ALSReport";

import { AlertTriangle, File, Trash2Icon } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { InfoPill } from "./info-pill";

dayjs.extend(relativeTime);

export function ReportCard({ report }: { report: ALSReport }) {
  const audioSum = sumAudios(report);

  function sumAudios(report: ALSReport) {
    let count = 0;
    for (let i = 0; i < report.tracks.length; i++) {
      const curr = report.tracks[i];
      count += curr.audios.length;
    }
    return count;
  }

  return (
    <div className="grid grid-cols-3 px-8 py-1 lg:px-16">
      <a title={report.liveVer} className="flex items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary p-1 text-secondary-foreground">
          <File />
        </div>
        <h2 className="ml-2 min-w-[100px] text-2xl font-semibold text-primary">
          {report.shortFileName}
        </h2>
      </a>
      <div className="mx-auto flex items-center">
        <InfoPill info={report.tracks.length} icon="track" />
        <InfoPill info={audioSum} icon="audio" />
        <InfoPill info={report.nonNativeDevices.length} icon="device" />
      </div>
      <div className="ml-auto flex items-center space-x-2.5 overflow-hidden">
        <p className="text-[0.6rem] font-thin text-muted-foreground lg:text-xs">
          uploaded {dayjs(report.createdDate).fromNow()}
        </p>
        <AlertTriangle className="h-8 w-8" />
        <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
        <Trash2Icon className="h-8 w-8 rounded bg-destructive p-1 text-destructive-foreground" />
      </div>
    </div>
  );
}
