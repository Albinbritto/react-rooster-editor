# react-rooster-editor

A lightweight React wrapper around RoosterJS for building rich text editors in React.

## Features

- 🚀 Built with TypeScript for full type safety
- ⚛️ React 18+ support
- 🎨 Styled with TailwindCSS
- 📦 Tree-shakeable ESM and CJS builds
- 🪝 Custom React hooks for easy integration
- 🎯 Minimal bundle size
- 💪 Powered by RoosterJS

## Installation

```bash
npm install react-rooster-editor
# or
yarn add react-rooster-editor
# or
pnpm add react-rooster-editor
```

## Usage

### Basic Example

```tsx
import { RoosterEditor } from 'react-rooster-editor';
import 'react-rooster-editor/styles.css';

function App() {
  const handleChange = (content: string) => {
    console.log('Content changed:', content);
  };

  return (
    <RoosterEditor
      placeholder="Start typing..."
      onChange={handleChange}
      minHeight="300px"
    />
  );
}
```

### With Initial Content

```tsx
import { RoosterEditor } from 'react-rooster-editor';
import 'react-rooster-editor/styles.css';

function App() {
  return (
    <RoosterEditor
      initialContent="<p>Hello World!</p>"
      placeholder="Start typing..."
    />
  );
}
```

### Using the Hook Directly

```tsx
import { useRoosterEditor } from 'react-rooster-editor';

function CustomEditor() {
  const { divRef, getContent, setContent } = useRoosterEditor({
    initialContent: '<p>Initial content</p>',
    onChange: (content) => console.log(content),
  });

  const handleSave = () => {
    const content = getContent();
    // Save content to your backend
  };

  return (
    <div>
      <div ref={divRef} style={{ minHeight: '200px', border: '1px solid #ccc' }} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

### Read-only Mode

```tsx
import { RoosterEditor } from 'react-rooster-editor';
import 'react-rooster-editor/styles.css';

function App() {
  return (
    <RoosterEditor
      initialContent="<p>This content is read-only</p>"
      readOnly
    />
  );
}
```

## API Reference

### RoosterEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content for the editor |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text when editor is empty |
| `className` | `string` | `''` | Additional CSS class names |
| `onChange` | `(content: string) => void` | `undefined` | Callback fired when content changes |
| `onReady` | `(editor: IEditor) => void` | `undefined` | Callback fired when editor is ready |
| `readOnly` | `boolean` | `false` | Whether the editor is read-only |
| `minHeight` | `string` | `'200px'` | Minimum height of the editor |

### useRoosterEditor Hook

```typescript
const {
  divRef,      // Ref to attach to the editor div
  editor,      // RoosterJS editor instance
  isReady,     // Whether the editor is initialized
  getEditor,   // Get the editor instance
  setContent,  // Set editor content
  getContent,  // Get editor content
} = useRoosterEditor(options);
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `initialContent` | `string` | Initial HTML content |
| `onChange` | `(content: string) => void` | Content change callback |
| `onReady` | `(editor: IEditor) => void` | Editor ready callback |
| `readOnly` | `boolean` | Read-only mode |

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run type checking
npm run type-check

# Run linter
npm run lint

# Watch mode for development
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
