import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";
import { usePerformanceTier } from "@/lib/performance";

export const springButtonTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 16,
  mass: 1.05,
};

export const springButtonInteraction = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.97, y: 0 },
};

const pressableBaseClass =
  "inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]";

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

export const SpringPressable = forwardRef<HTMLButtonElement, HTMLMotionProps<"button">>(
  ({ className, children, ...props }, ref) => {
    const { springMotion } = usePerformanceTier();
    const classes = cn(pressableBaseClass, className);

    if (!springMotion) {
      return (
        <button ref={ref} className={classes} {...(props as React.ComponentProps<"button">)}>
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={springButtonInteraction.whileHover}
        whileTap={springButtonInteraction.whileTap}
        transition={springButtonTransition}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
SpringPressable.displayName = "SpringPressable";

export const SpringAnchor = forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  ({ className, children, ...props }, ref) => {
    const { springMotion } = usePerformanceTier();
    const classes = cn(pressableBaseClass, className);

    if (!springMotion) {
      return (
        <a ref={ref} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <motion.a
        ref={ref}
        whileHover={springButtonInteraction.whileHover}
        whileTap={springButtonInteraction.whileTap}
        transition={springButtonTransition}
        className={classes}
        {...props}
      >
        {children}
      </motion.a>
    );
  },
);
SpringAnchor.displayName = "SpringAnchor";

const MotionLink = motion.create(Link);

export function SpringLink({ className, children, ...props }: LinkProps & { className?: string }) {
  const { springMotion } = usePerformanceTier();
  const classes = cn(pressableBaseClass, className);

  if (!springMotion) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <MotionLink
      whileHover={springButtonInteraction.whileHover}
      whileTap={springButtonInteraction.whileTap}
      transition={springButtonTransition}
      className={classes}
      {...props}
    >
      {children}
    </MotionLink>
  );
}

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
        whileHover={springButtonInteraction.whileHover}
        whileTap={springButtonInteraction.whileTap}
        transition={springButtonTransition}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
SpringButton.displayName = "SpringButton";

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
      whileHover={springButtonInteraction.whileHover}
      whileTap={springButtonInteraction.whileTap}
      transition={springButtonTransition}
      className={classes}
      {...props}
    >
      {children}
    </MotionLink>
  );
}

export { springButtonVariants };
