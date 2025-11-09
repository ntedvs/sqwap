# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
```

## Project Overview

Sqwap is a keyboard-driven, browser-based image manipulation tool built with vanilla TypeScript and the Canvas API. Users upload images or capture from camera, then apply visual effects by typing numbers.

## Architecture

### Core Application Flow (src/main.ts)

The application maintains a single `ImageData` object representing the current canvas state, with separate undo/redo stacks that store cloned `ImageData` snapshots.

**Key State:**
- `image: ImageData` - Current canvas state
- `undo: ImageData[]` - History stack for Cmd/Ctrl+Z
- `redo: ImageData[]` - Forward history for Cmd/Ctrl+Y
- `effect: string` - Accumulated numeric input from keyboard

**Keyboard Interaction:**
- Number keys (0-9): Accumulate effect ID (e.g., "1", "12", "30")
- Enter: Apply effect from `effects` registry, push to undo stack, clear redo stack
- Cmd/Ctrl+Z: Pop from undo, push to redo
- Cmd/Ctrl+Y: Pop from redo, push to undo

**Image Loading:**
- File input: Uses `createImageBitmap()` for async loading
- Camera: `getUserMedia()` captures video stream, "stop" button captures current frame via `move()`

The `move()` function is the single source of truth for loading new images - it resets canvas dimensions, draws the source, captures ImageData, and clears undo/redo history.

### Effect Registry System (src/collect.ts)

The `collect.ts` module acts as the central registry. It imports all 30 effects, assigns each a numeric index (1-30), and dynamically generates the UI list.

**Critical Pattern:**
```typescript
effects[i + 1] = effect  // 1-indexed for user-friendly keyboard input
```

The `effects` object is keyed by numbers (1-30), not effect names. When Enter is pressed, `main.ts` looks up `effects[+effect]` where `effect` is the accumulated string (e.g., "12").

**Adding New Effects:**
1. Create file in `src/effects/your-effect.ts` with default export
2. Import in `collect.ts`
3. Add to `all` array in desired position (position determines numeric ID)
4. UI list and keyboard mapping update automatically

### Effect Implementation Pattern

All effects follow this signature:
```typescript
export default (data: Uint8ClampedArray, width?: number, height?: number) => void
```

**Key Points:**
- Direct mutation of pixel array (RGBA format: data[i] = R, data[i+1] = G, data[i+2] = B, data[i+3] = A)
- Width/height optional - only needed for spatial operations (pixelate, ripple, rotate, etc.)
- Most effects are 6-11 lines, focused on single transformation
- No return value - mutate in place for performance

**Pixel Array Access:**
```typescript
// Linear scan for color operations
for (let i = 0; i < data.length; i += 4) {
  data[i]     // Red
  data[i + 1] // Green
  data[i + 2] // Blue
  data[i + 3] // Alpha
}

// 2D spatial operations
const i = (y * width + x) * 4
```

## TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true` - All strict checks enabled
- `noUnusedLocals` and `noUnusedParameters` - No dead code
- `verbatimModuleSyntax` - Explicit type imports
- `erasableSyntaxOnly` - Future-proof for type stripping

When adding code, ensure it passes `tsc` checks (run via `npm run build`).

## Build Tooling

- **Vite**: Using `rolldown-vite@7.1.17` (Rust-based bundler) instead of standard Vite
- **Tailwind CSS 4.x**: Via `@tailwindcss/vite` plugin, configured in `src/style.css`
- **Prettier**: Auto-formats with `prettier-plugin-tailwindcss` for class ordering

## Styling Conventions

Pure Tailwind utility classes in `index.html`. No CSS-in-JS, no component frameworks. Keep all styling declarative in HTML attributes.
