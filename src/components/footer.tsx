export function Footer() {
  return (
    <footer className="relative flex justify-center py-2">
      <div className="absolute -top-16 z-0 h-64 w-64 rounded-full bg-primary blur-3xl filter"></div>
      <ul className="z-10 flex items-center gap-2 text-sm font-medium">
        <li className="mx-2">
          <a
            href="https://github.com/pablo-kitz/als-analysis"
            className="hover:underline"
          >
            Github
          </a>
        </li>
        <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
        <li className="mx-2">
          Created by{" "}
          <a
            href="https://www.instagram.com/pablokitz/"
            className="hover:underline"
          >
            Pablo Kitzberger
          </a>
        </li>
        <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
        <li className="mx-2">
          <a className="">{new Date().getFullYear().toString()}</a>
        </li>
      </ul>
    </footer>
  );
}
