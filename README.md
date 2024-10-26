
# @precooked/react-icon-button

![Precooked Logo](https://precookedcode.com/assets/logos/logo-horizontal-dark.svg)

`@precooked/react-icon-button` is a versatile icon button component for React projects. It supports different button sizes, colors, and types, with customizable icons and shadows.

## Installation

```bash
npm install @precooked/react-icon-button
```

## Props

| Prop         | Type                        | Default     | Description                                                                                   |
|--------------|-----------------------------|-------------|-----------------------------------------------------------------------------------------------|
| `onClick`    | `() => void`                | **required** | Function to handle the button click.                                                          |
| `color`      | `keyof colors \| string`   | `'primary'` | Background color of the button when `type` is `solid`; or text color for other types.         |
| `borderRadius`| `number`                   | `22`        | Border radius of the button in pixels.                                                        |
| `type`       | `"clear" \| "outline" \| "solid"` | `'solid'`   | Button style type.                                                                            |
| `disabled`   | `boolean`                   | `false`     | Disables the button when true.                                                                |
| `icon`       | `string`                    | `undefined` | Icon name to display inside the button.                                                       |
| `iconPaths`  | `any[]`                     | `undefined` | Custom SVG paths for the icon.                                                                |
| `iconSize`   | `number`                    | `undefined` | Size of the icon in pixels, defaulting to the size based on `size`.                           |
| `hasShadow`  | `boolean`                   | `true`      | Whether the button has a shadow.                                                              |
| `styles`     | `React.CSSProperties`       | `undefined` | Custom styles for the button.                                                                 |
| `size`       | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `'md'`       | Size of the button, affecting its dimensions and icon size.                                   |

## Example Usage

```tsx
import React from 'react';
import IconButton from '@precooked/react-icon-button';

const MyComponent = () => (
    <div>
        <IconButton 
            onClick={() => alert('Button clicked!')} 
            color="primary" 
            icon="home" 
            size="lg" 
            type="solid" 
            hasShadow={true} 
        />
        <IconButton 
            onClick={() => alert('Another button clicked!')} 
            color="#ff5733" 
            icon="settings" 
            size="sm" 
            type="outline" 
            borderRadius={10} 
            hasShadow={false} 
        />
    </div>
);

export default MyComponent;
```

## License

MIT

---

For more information, visit [Precooked](https://precookedcode.com).
