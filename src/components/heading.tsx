import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <>
      <Dialog>
        <header className="flex flex-col gap-2 bg-gradient-to-l from-muted to-popover px-8 py-4 lg:px-16">
          <div className="h-40 w-5/6">
            <ModeToggle />
            <h1 className="text-4xl font-bold tracking-wider xl:text-5xl/relaxed 2xl:text-6xl/relaxed">
              {t("heading.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("heading.subTitle")}
              <DialogTrigger className="ml-4 text-primary/70 hover:text-primary">
                {t("heading.faq")}
              </DialogTrigger>
            </p>
            <p className="text-sm tracking-wide text-muted-foreground/50">
              {t("heading.slogan")}
            </p>
          </div>
        </header>
        <DialogContent className="justify-start gap-4 ">
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className="mb-2 px-6 text-[38px] font-bold">
                {t("faq.title")}
              </h2>
            </DialogTitle>
            <DialogDescription>
              <div>{t("faq.subTitle1")}</div>
              <div>{t("faq.subTitle2")}</div>
            </DialogDescription>
          </DialogHeader>
          <hr />
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {t("faq.question1.question")}
            </h3>
            <div className="text-sm text-muted-foreground">
              {t("faq.question1.answer")}
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {t("faq.question2.question")}
            </h3>
            <div className="text-sm text-muted-foreground">
              {t("faq.question2.answer")}
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              <Trans
                i18nKey="faq.question3.question"
                components={{ b: <b /> }}
              />
            </h3>
            <div className="text-sm text-muted-foreground">
              <Trans i18nKey="faq.question3.answer" components={{ b: <b /> }} />
            </div>
            <div className="text-xs italic text-muted-foreground/70">
              {t("faq.question3.detail")}
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {t("faq.question4.question")}
            </h3>
            <div className="text-sm text-muted-foreground">
              <Trans
                i18nKey="faq.question4.answer"
                components={{ ul: <ul />, li: <li />, div: <div />, b: <b /> }}
              />
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {t("faq.contribute.title")}
            </h3>
            <div className="text-sm text-muted-foreground">
              <Trans
                i18nKey="faq.contribute.description"
                components={{ a: <a /> }}
              />
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
