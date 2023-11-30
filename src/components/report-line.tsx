import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { ALSReport } from "@/models/ALSReport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function ReportLine({ report }: { report: ALSReport }) {
  return (
    <>
      <Accordion type="multiple" asChild>
        <tr>
          <td>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-6">{report.shortFileName}</div>
              </TooltipTrigger>
              <TooltipContent>
                {`${report.fileName} - ${report.liveVer}`}
              </TooltipContent>
            </Tooltip>
          </td>
          <td>
            <Badge variant="outline">Tracks - {report.tracks.length}</Badge>
          </td>
          <td>
            <Badge variant="outline">
              External Devices - {report.nonNativeDevices.length}
            </Badge>
          </td>
          <td>
            <AccordionItem value="audios">
              <AccordionTrigger className="py-2">
                <Badge
                  variant={
                    report.externalAudios.length > 0 ? "destructive" : "outline"
                  }
                >
                  External Audios - {report.externalAudios.length}
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                {report.externalAudios.map((audio) => (
                  <div>
                    {audio.audioFileName} - {audio.location}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </td>
          <td>
            <AccordionItem value="devices">
              <AccordionTrigger className="py-2">
                M4L Devices / Plugins
              </AccordionTrigger>
              <AccordionContent>
                {report.nonNativeDevices.map((device) => (
                  <div>
                    {device.name} - {device.type} - {device.path}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </td>
        </tr>
      </Accordion>
    </>
  );
}
