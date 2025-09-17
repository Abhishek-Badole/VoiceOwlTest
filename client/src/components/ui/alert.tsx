import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "destructive";
}

export const Alert: React.FC<AlertProps> = ({ variant = "success", className, children, ...props }) => {
  const base = "border rounded px-4 py-3 mb-2 ";
  const color = variant === "success" ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-800";
  return (
    <div className={base + color + (className ? " " + className : "")} {...props}>
      {children}
    </div>
  );
};

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={"font-bold mb-1" + (className ? " " + className : "")} {...props}>{children}</div>
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={"text-sm" + (className ? " " + className : "")} {...props}>{children}</div>
);
