import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    onClick,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case "primary":
                return "bg-dinkum-green text-white hover:bg-dinkum-green/90";
            case "secondary":
                return "bg-dinkum-blue text-white hover:bg-dinkum-blue/90";
            case "danger":
                return "bg-red-500 text-white hover:bg-red-600";
            default:
                return "bg-dinkum-green text-white hover:bg-dinkum-green/90";
        }
    };

    return (
        <button
            type={type}
            className={`btn ${getVariantClasses()} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
