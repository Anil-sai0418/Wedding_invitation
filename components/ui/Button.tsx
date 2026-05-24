"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-gold to-gold-light text-charcoal shadow-gold hover:shadow-gold-lg",
  secondary:
    "border border-gold/40 bg-cream/60 text-maroon backdrop-blur-sm hover:border-gold hover:bg-cream",
  ghost: "text-gold hover:text-gold-light underline-offset-4 hover:underline",
  whatsapp: "bg-[#25D366] text-white shadow-lg hover:shadow-xl",
};

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  as?: "button" | "a";
  href?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, as = "button", href, ...props }, ref) => {
    const base =
      "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 font-ceremonial text-sm tracking-wide transition-all duration-300";

    if (as === "a" && href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className={`${base} ${variantStyles[variant]} ${className}`}
          {...(props as HTMLMotionProps<"a">)}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
