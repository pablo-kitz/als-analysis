import { ModeToggle } from "./mode-toggle";

export function Heading() {
  return (
    <header className="flex flex-col gap-2 bg-gradient-to-l from-muted to-popover px-8 py-4 lg:px-16">
      <div className="h-40 w-5/6">
        <ModeToggle />
        <h1 className="text-4xl font-bold tracking-wider xl:text-5xl/relaxed 2xl:text-6xl/relaxed">
          Scan your Ableton Live project files
        </h1>
        <p className="text-lg text-muted-foreground">
          Identify samples not collected or stored in your User Folder & list
          all the plugins used.
        </p>
        <p className="text-muted-foreground/50 text-sm tracking-wide ">
          Never loose a single sound in your creations
        </p>
      </div>
    </header>
  );
}
