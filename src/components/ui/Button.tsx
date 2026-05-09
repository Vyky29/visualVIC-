import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      type={props.type ?? "button"}
      className={cn(
        "inline-flex min-h-touch items-center justify-center rounded-2xl px-5 py-3 text-[15px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:pointer-events-none disabled:opacity-40 active:transition-[transform,colors] active:duration-100",
        variant === "primary" &&
          "bg-ink text-cream shadow-soft active:bg-ink/78 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/90",
        variant === "secondary" &&
          "bg-cream text-ink shadow-card ring-1 ring-ink/10 active:bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white",
        variant === "ghost" &&
          "bg-transparent text-ink active:bg-ink/10 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/5",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
