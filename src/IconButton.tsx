import React, { useState } from "react";
import { colors } from "@precooked/utils";
import { DynamicIcon } from "@precooked/react-dynamic-icon";
import { Icon } from "@precooked/react-icon";
import { Touchable } from "@precooked/react-touchable";

// Función para convertir un color HEX a RGB
const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

// Función para calcular la luminancia de un color RGB y determinar si es oscuro
const isDarkColor = (color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return false;

    const { r, g, b } = rgb;
    // Fórmula para calcular el brillo
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
};

const resolveIcon = (
    icon: string | undefined,
    paths?: any[],
    size?: number,
    color?: string
) => {
    if (icon) {
        return <Icon name={icon} size={size} color={color} />;
    } else if (paths) {
        return <DynamicIcon paths={paths} size={size} />;
    }
    return null;
};

interface IconButtonProps {
    onClick: () => void;
    color?: keyof typeof colors | string; // Ahora acepta clave de colors o string
    borderRadius?: number;
    type?: "clear" | "outline" | "solid";
    disabled?: boolean;
    icon?: string;
    iconPaths?: any[];
    iconSize?: number;
    hasShadow?: boolean;
    styles?: React.CSSProperties;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
    xs: { size: 32, iconSize: 16 },
    sm: { size: 36, iconSize: 18 },
    md: { size: 44, iconSize: 24 }, // Tamaño por defecto
    lg: { size: 52, iconSize: 32 },
    xl: { size: 60, iconSize: 40 },
};

const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    color = "primary",
    borderRadius = 22,
    type = "solid",
    disabled = false,
    icon,
    iconPaths,
    iconSize,
    hasShadow = true,
    styles,
    size = "md",
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressStart = () => {
        if (!disabled) {
            setIsPressed(true);
        }
    };

    const handlePressEnd = () => {
        if (!disabled) {
            setIsPressed(false);
        }
    };

    const buttonSize = sizeStyles[size].size;
    const calculatedIconSize = iconSize ?? sizeStyles[size].iconSize;

    // Resuelve el color de fondo para el botón
    const resolvedColor = color in colors ? colors[color as keyof typeof colors] : color;

    // Determina el color del icono según el fondo
    const iconColor =
        type === "solid"
            ? isDarkColor(resolvedColor || "") // Si el color es oscuro, el icono será blanco; si no, usa colors.text
                ? "#fff"
                : colors.textShade
            : resolvedColor; // En los demás casos, el icono usará el color del texto

    const buttonStyles: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        borderRadius: `${borderRadius}px`,
        border: type === "outline" ? `2px solid ${resolvedColor}` : "none",
        backgroundColor: type === "solid" ? resolvedColor : "transparent",
        boxShadow: hasShadow
            ? isPressed
                ? "none"
                : "0px 2px 5px rgba(0, 0, 0, 0.2)"
            : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        opacity: disabled ? 0.6 : 1,
        position: "relative",
        boxSizing: "border-box",
        ...styles,
    };

    return (
        <Touchable onClick={onClick} style={buttonStyles}>
            <button
                onClick={(e) => e.preventDefault()}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                }}
                disabled={disabled}
            >
                {resolveIcon(icon, iconPaths, calculatedIconSize, iconColor)}
            </button>
        </Touchable>
    );
};

export default IconButton;
