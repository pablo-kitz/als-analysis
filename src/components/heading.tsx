import { ModeToggle } from "./mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function Heading() {
  return (
    <>
      <Dialog>
        <header className="flex flex-col gap-2 bg-gradient-to-l from-muted to-popover px-8 py-4 lg:px-16">
          <div className="h-40 w-5/6">
            <ModeToggle />
            <h1 className="text-4xl font-bold tracking-wider xl:text-5xl/relaxed 2xl:text-6xl/relaxed">
              Scan Your Ableton Live Project Files
            </h1>
            <p className="text-lg text-muted-foreground">
              Identify samples not stored in your User Folder & list all the
              plugins used.
              <DialogTrigger className="ml-4 text-primary/70 hover:text-primary">
                How does this site work?
              </DialogTrigger>
            </p>
            <p className="text-sm tracking-wide text-muted-foreground/50">
              Never lose a single sound in your creations.
            </p>
          </div>
        </header>
        <DialogContent className="justify-start gap-4 ">
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className="mb-2 px-6 text-[38px] font-bold">
                Usage of ALS Analysis
              </h2>
            </DialogTitle>
            <DialogDescription>
              <div>
                This online tool displays information from your Ableton Live
                projects without loading them in your DAW.
              </div>
              <div>
                It identifies plugin and audio file dependencies in a project.
              </div>
            </DialogDescription>
          </DialogHeader>
          <hr />
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">How is the analysis done?</h3>
            <div className="text-sm text-muted-foreground">
              Each selected file is processed using client-side JavaScript to
              gather information without uploading your project's data
              externally.
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              Where is my analysis information stored?
            </h3>
            <div className="text-sm text-muted-foreground">
              Information is stored in the browser's local storage, ensuring
              it's not saved on any database or sent externally.
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              How are Audio Clips marked as{" "}
              <b className="text-destructive">External</b> identified?
            </h3>
            <div className="text-sm text-muted-foreground">
              Any audio clip not containing the terms{" "}
              <b className="text-primary">Project</b> or{" "}
              <b className="text-primary">User Library</b> in their file paths
              are marked as <b className="text-destructive">External</b>.
            </div>
            <div className="text-xs italic text-muted-foreground/70">
              This process will be optimized in the future.
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              What information will I get from my projects?
            </h3>
            <div className="text-sm text-muted-foreground">
              You will be able to see:
              <ul className="flex list-disc flex-col gap-3 px-6">
                <li>
                  A list of each track type (Audio, MIDI, Group, Send, Master)
                  with a summary of devices and audios on it.
                  <div className="text-xs italic text-muted-foreground/70">
                    Tip: Hover over the Devices & Audios counter for details.
                  </div>
                </li>
                <li>
                  A summary of all <b className="text-destructive">External</b>{" "}
                  (VST, VST3, or M4L) devices used.
                </li>
                <li>
                  A summary of all Audio Clips, marking any{" "}
                  <b className="text-destructive">External</b> Clips.
                  <div className="text-xs italic text-muted-foreground/70">
                    Tip: Hover over the Audio Clip path for the full directory.
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              Have any feedback or suggestions?
            </h3>
            <div className="text-sm text-muted-foreground">
              Feel free to create an issue on the{" "}
              <a
                href="https://github.com/pablo-kitz/als-analysis"
                className="font-bold hover:underline"
              >
                Github Repo
              </a>{" "}
              or{" "}
              <a
                href="https://www.instagram.com/pablokitz/"
                className="font-bold  hover:underline"
              >
                contact me
              </a>
              .
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
