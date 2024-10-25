var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import { colors } from "@precooked/utils";
import { DynamicIcon } from "@precooked/react-dynamic-icon";
import { Icon } from "@precooked/react-icon";
import { Touchable } from "@precooked/react-touchable";
// Función para convertir un color HEX a RGB
var hexToRgb = function (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var fullHex = hex.replace(shorthandRegex, function (r, g, b) { return r + r + g + g + b + b; });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};
// Función para calcular la luminancia de un color RGB y determinar si es oscuro
var isDarkColor = function (color) {
    var rgb = hexToRgb(color);
    if (!rgb)
        return false;
    var r = rgb.r, g = rgb.g, b = rgb.b;
    // Fórmula para calcular el brillo
    var brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
};
var resolveIcon = function (icon, paths, size, color) {
    if (icon) {
        return React.createElement(Icon, { name: icon, size: size, color: color });
    }
    else if (paths) {
        return React.createElement(DynamicIcon, { paths: paths, size: size });
    }
    return null;
};
var sizeStyles = {
    xs: { size: 32, iconSize: 16 },
    sm: { size: 36, iconSize: 18 },
    md: { size: 44, iconSize: 24 }, // Tamaño por defecto
    lg: { size: 52, iconSize: 32 },
    xl: { size: 60, iconSize: 40 },
};
var IconButton = function (_a) {
    var onClick = _a.onClick, _b = _a.color, color = _b === void 0 ? "primary" : _b, _c = _a.borderRadius, borderRadius = _c === void 0 ? 22 : _c, _d = _a.type, type = _d === void 0 ? "solid" : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, icon = _a.icon, iconPaths = _a.iconPaths, iconSize = _a.iconSize, _f = _a.hasShadow, hasShadow = _f === void 0 ? true : _f, style = _a.style, _g = _a.size, size = _g === void 0 ? "md" : _g;
    var _h = useState(false), isPressed = _h[0], setIsPressed = _h[1];
    var handlePressStart = function () {
        if (!disabled) {
            setIsPressed(true);
        }
    };
    var handlePressEnd = function () {
        if (!disabled) {
            setIsPressed(false);
        }
    };
    var buttonSize = sizeStyles[size].size;
    var calculatedIconSize = iconSize !== null && iconSize !== void 0 ? iconSize : sizeStyles[size].iconSize;
    // Resuelve el color de fondo para el botón
    var resolvedColor = color in colors ? colors[color] : color;
    // Determina el color del icono según el fondo
    var iconColor = type === "solid"
        ? isDarkColor(resolvedColor || "") // Si el color es oscuro, el icono será blanco; si no, usa colors.text
            ? "#fff"
            : colors.textShade
        : resolvedColor; // En los demás casos, el icono usará el color del texto
    var buttonStyles = __assign({ display: "flex", justifyContent: "center", alignItems: "center", width: "".concat(buttonSize, "px"), height: "".concat(buttonSize, "px"), borderRadius: "".concat(borderRadius, "px"), border: type === "outline" ? "2px solid ".concat(resolvedColor) : "none", backgroundColor: type === "solid" ? resolvedColor : "transparent", boxShadow: hasShadow
            ? isPressed
                ? "none"
                : "0px 2px 5px rgba(0, 0, 0, 0.2)"
            : "none", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s ease-in-out", opacity: disabled ? 0.6 : 1, position: "relative", boxSizing: "border-box" }, style);
    return (React.createElement(Touchable, { onClick: onClick, style: buttonStyles },
        React.createElement("button", { onMouseDown: handlePressStart, onMouseUp: handlePressEnd, onMouseLeave: handlePressEnd, onTouchStart: handlePressStart, onTouchEnd: handlePressEnd, style: {
                position: "absolute",
                width: "100%",
                height: "100%",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "transparent",
            }, disabled: disabled }, resolveIcon(icon, iconPaths, calculatedIconSize, iconColor))));
};
export default IconButton;
