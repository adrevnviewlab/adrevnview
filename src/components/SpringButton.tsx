import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";
import { usePerformanceTier } from "@/lib/performance";

const springTransition = { type: "spring" as const, stiffness: 420, damping: 22, mass: 0.85 };

const springButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "brand-gradient text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-400/35",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-border bg-background text-foreground hover:bg-secondary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary/80 text-foreground",
        link: "text-primary underline-offset-4 hover:underline border-0 shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type SpringButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof springButtonVariants> & {
    asChild?: boolean;
  };

export const SpringButton = forwardRef<HTMLButtonElement, SpringButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const { springMotion, borderBlink } = usePerformanceTier();
    const classes = cn(
      springButtonVariants({ variant, size, className }),
      borderBlink && "border-blink-once",
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes}>
          {children}
        </Slot>
      );
    }

    if (!springMotion) {
      return (
        <button ref={ref} className={classes} {...props}>
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={springTransition}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
SpringButton.displayName = "SpringButton";

const MotionLink = motion.create(Link);

type SpringNavLinkProps = LinkProps &
  VariantProps<typeof springButtonVariants> & {
    className?: string;
  };

export function SpringNavLink({ className, variant, size, children, ...props }: SpringNavLinkProps) {
  const { springMotion, borderBlink } = usePerformanceTier();
  const classes = cn(
    springButtonVariants({ variant, size, className }),
    borderBlink && "border-blink-once",
  );

  if (!springMotion) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <MotionLink
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={springTransition}
      className={classes}
      {...props}
    >
      {children}
    </MotionLink>
  );
}

export { springButtonVariants };
