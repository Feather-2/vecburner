# Vecburner

Just-so-so bitmap to vector graphics engine. 🤷

[![npm version](https://badge.fury.io/js/vecburner.svg)](https://www.npmjs.com/package/vecburner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Smart Color Quantization** - K-Means++ clustering with edge color filtering
- 🔍 **Sub-pixel Contour Tracing** - Marching Squares with interpolation
- ✨ **Smooth Curves** - VTracer-style 4-Point Subdivision and Chaikin smoothing
- 📐 **Corner Preservation** - Intelligent corner detection protects sharp angles
- 🖼️ **Multiple Presets** - Optimized settings for logos, lineart, photos, and more
- 📦 **Zero Dependencies** - Pure JavaScript, works in browser and Node.js

## Installation

```bash
npm install vecburner
```

Or use via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vecburner@1.0.0/dist/vecburner.umd.min.js"></script>
```

## Quick Start

### Browser (ES Module)

```javascript
import { Vecburner } from 'vecburner';

// Get ImageData from canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Vectorize with preset
const result = await Vecburner.vectorizeWithPreset(imageData, 'logo');
console.log(result.svg);

// Or with custom options
const result = await Vecburner.vectorize(imageData, {
  numColors: 16,
  smoothness: 2.5,
  pathTolerance: 1.0
});
```

### Browser (CDN / UMD)

```html
<script src="https://cdn.jsdelivr.net/npm/vecburner@1.0.0/dist/vecburner.umd.min.js"></script>
<script>
  const { Vecburner } = window.Vecburner;
  
  // Same API as above
  const result = await Vecburner.vectorizeWithPreset(imageData, 'logo');
</script>
```

### Node.js

```javascript
const { Vecburner } = require('vecburner');
// or
import { Vecburner } from 'vecburner';

// Note: You need to provide ImageData-like object
const imageData = {
  data: new Uint8ClampedArray([...]), // RGBA pixel data
  width: 100,
  height: 100
};

const result = await Vecburner.vectorize(imageData, { numColors: 8 });
```

## API

### `Vecburner.vectorize(imageData, options)`

Main vectorization function.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `numColors` | number | 16 | Number of colors to extract |
| `colorTolerance` | number | 25 | Color merging tolerance |
| `pathTolerance` | number | 1.0 | Path simplification tolerance |
| `smoothness` | number | 2.5 | Curve smoothness level |
| `mode` | string | 'spline' | Output mode: 'spline' or 'polygon' |
| `binaryMode` | boolean | false | Binary (2-color) mode |

**Returns:**

```javascript
{
  svg: string,           // Complete SVG string
  width: number,         // Original width
  height: number,        // Original height
  layers: Array,         // Color layers with paths
  paths: Array,          // All path objects
  colors: Array          // Extracted colors
}
```

### `Vecburner.vectorizeWithPreset(imageData, preset)`

Vectorize using a preset.

**Presets:**

| Preset | Best For |
|--------|----------|
| `'auto'` | Automatic detection |
| `'logo'` | Logos, icons, flat graphics |
| `'lineart'` | Line drawings, sketches |
| `'illustration'` | Digital illustrations |
| `'photo'` | Photographs |
| `'pixel'` | Pixel art |
| `'simple'` | Simple shapes |

### `Vecburner.simplify(pathD, level)`

Simplify an SVG path.

```javascript
const simplified = Vecburner.simplify(pathD, 2); // level 0-5
```

### `Vecburner.analyzeImage(imageData)`

Analyze image characteristics.

```javascript
const analysis = Vecburner.analyzeImage(imageData);
// { colorCount, isPhoto, isLineart, recommendedPreset }
```

### Advanced API

For advanced users, low-level algorithms are available:

```javascript
// Color quantization
const palette = Vecburner.advanced.quantize(imageData, 16);

// Contour tracing
const contours = Vecburner.advanced.traceContours(bitmap);

// Curve fitting
const bezierPath = Vecburner.advanced.fitBezier(points);

// Corner detection
const corners = Vecburner.advanced.detectCorners(points);
```

## Credits

This library incorporates algorithms from:

- **[VTracer](https://github.com/visioncortex/vtracer)** - 4-Point Subdivision, staircase removal (MIT)
- **[fit-curve](https://github.com/soswow/fit-curve)** - Bezier curve fitting (MIT)

## License

MIT Paper Burner Team
