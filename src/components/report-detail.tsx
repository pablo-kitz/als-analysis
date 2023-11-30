import { ALSReport } from "@/models/ALSReport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { DeleteReport } from "./delete-report";

export function ReportDetail({
  report,
  deleteReport,
}: {
  report: ALSReport;
  deleteReport: (report: ALSReport) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between px-8">
        <h3 className="text-4xl font-extrabold text-primary">
          {report.shortFileName}
        </h3>
        <DeleteReport deleteReport={() => deleteReport(report)} />
      </div>
      <Accordion type="multiple">
        <AccordionItem value="audios">
          <AccordionTrigger className="py-2">Audios</AccordionTrigger>
          <AccordionContent>
            {report.externalAudios.map((audio) => (
              <div>
                {audio.audioFileName} - {audio.location}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
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
      </Accordion>
    </>
  );
}
