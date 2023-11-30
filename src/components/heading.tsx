import { ModeToggle } from "./mode-toggle";

export function Heading() {
  return (
    <header className="flex flex-col gap-2 bg-gradient-to-l from-muted to-popover px-8 py-4 lg:px-16">
      <ModeToggle />
      <h1 className="text-2xl font-bold tracking-wider lg:text-6xl/relaxed">
        Scan your Ableton Live project files
      </h1>
      <p className="text-lg text-muted-foreground lg:text-4xl/snug ">
        Identify samples not collected or stored in your User Folder & list all
        the plugins used.
      </p>
      <p className="text-sm tracking-wide text-muted-foreground/50 ">
        Never loose a single sound in your creations
      </p>
    </header>
  );
}
