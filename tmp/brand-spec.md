# NIROOH dashboard reference system

Source: `mq8z4c46-dashboard.png` and `mq8z4c3v-listagem.png`.

## Tokens

```css
:root {
  --bg: oklch(97% 0.004 250);
  --surface: oklch(100% 0 0);
  --fg: oklch(24% 0.05 258);
  --muted: oklch(52% 0.035 255);
  --border: oklch(90% 0.012 250);
  --accent: oklch(72% 0.18 70);

  --font-display: 'Avenir Next', 'Söhne', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace;
}
```

## Layout posture

- Fixed desktop sidebar on wide screens; compact top navigation on smaller screens.
- Light grey application canvas with white cards, 1px cool borders, and 10-16px radii.
- Orange is reserved for selected navigation and primary actions; status colors stay functional.
- Data modules use dense tables, compact filters, tabular numerics, and visible chart axes.
- Checking photos are product evidence: use labelled photo tiles with location, timestamp, and approval state.
