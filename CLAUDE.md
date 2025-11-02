# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sqwap is a browser-based image effects editor that applies pixel manipulation effects to images in real-time using Canvas API. Users can upload images or capture from camera, then apply 29+ different effects using keyboard shortcuts.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Architecture

### Effect System

All effects are pure functions located in `src/effects/` that directly mutate the `ImageData.data` array (a `Uint8ClampedArray` of RGBA values).

**Effect function signatures:**

- Simple effects (pixel-independent): `(data: ImageDataArray) => void`
- Spatial effects (require positioning): `(data: ImageDataArray, width: number, height: number) => void`

Effects are registered in `src/collect.ts` where they're:

1. Imported and added to an array with display names
2. Mapped to numeric keys (1-29) in the `effects` object
3. Automatically added to the UI list with capitalized names

**Adding a new effect:**

1. Create `src/effects/neweffect.ts` with default export matching signature above
2. Import in `src/collect.ts`
3. Add to the `all` array with `{ name: "neweffect", effect: neweffect }`
4. Effect will auto-register and appear in UI

### Application Flow

**src/main.ts** contains the core application logic:

- Image loading from file input or camera capture
- Keyboard event handling for effect selection and undo/redo
- Canvas rendering and state management

**State management:**

- `image`: Current `ImageData` object (mutated in place by effects)
- `undo[]`: Array of previous states (created via `structuredClone`)
- `redo[]`: Array for redo functionality

**User interaction:**

1. Type numeric keys to build effect number (shown as overlay preview)
2. Press Enter to apply the selected effect
3. Ctrl/Cmd+Z to undo, Ctrl/Cmd+Y to redo

### Pixel Data Format

The `ImageData.data` array uses RGBA format:

- Index `i`: Red
- Index `i+1`: Green
- Index `i+2`: Blue
- Index `i+3`: Alpha
- Values are 0-255 (Uint8ClampedArray)

**2D coordinate to array index:** `const i = (y * width + x) * 4`

**Effect pattern examples:**

- Per-pixel operations: Iterate `i += 4` and modify `data[i]`, `data[i+1]`, `data[i+2]`
- Spatial operations: Use nested loops over `x`/`y`, convert to array index
- Geometric transformations: Create `output` buffer, map source to destination pixels, then `data.set(output)`

## TypeScript Configuration

- Strict mode enabled with additional safety: `noUnusedLocals`, `noUnusedParameters`
- Uses `verbatimModuleSyntax` and `allowImportingTsExtensions` for Vite compatibility
- Target: ES2022 with DOM types

## Build Tool Notes

The project uses `rolldown-vite` (specified in package.json overrides) instead of standard Vite. This is a performance-optimized variant and should not be changed without testing.
