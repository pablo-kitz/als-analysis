import { Button, ButtonProps } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoPillProps = {
  pillNumber: number;
  tooltipText: string;
  variant?: ButtonProps["variant"];
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function InfoPill({
  pillNumber,
  tooltipText,
  variant,
  children,
  onClick,
}: InfoPillProps) {
  if (!pillNumber) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("flex w-[80px] justify-around gap-2 px-2")}
          variant={variant}
          onClick={onClick}
        >
          <span className="align-middle">{pillNumber}</span>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
