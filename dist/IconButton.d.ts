import React from "react";
import { colors } from "@precooked/utils";
interface IconButtonProps {
    onClick: () => void;
    color?: keyof typeof colors | string;
    borderRadius?: number;
    type?: "clear" | "outline" | "solid";
    disabled?: boolean;
    icon?: string;
    iconPaths?: any[];
    iconSize?: number;
    hasShadow?: boolean;
    style?: React.CSSProperties;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
declare const IconButton: React.FC<IconButtonProps>;
export default IconButton;
