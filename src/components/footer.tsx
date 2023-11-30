export function Footer() {
  return (
    <footer className="mx-auto mb-2 overflow-hidden">
      <div className="-bottom-30 absolute mx-auto  h-64 w-64 -translate-x-8 rounded-full bg-purple-600/90 blur-3xl"></div>
      <ul className="flex items-center gap-2 text-sm font-medium">
        <li>
          <a href="" className="">
            Github
          </a>
        </li>
        <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
        <li>
          <a href="" className="">
            Created By
          </a>
        </li>
        <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
        <li>
          <a className="">{new Date().getFullYear().toString()}</a>
        </li>
      </ul>
    </footer>
  );
}
