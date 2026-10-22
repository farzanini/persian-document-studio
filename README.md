# Persian Document Studio

Persian Document Studio is a browser-based editor for laying out Persian right-to-left documents and exporting them as PDF. Built by Farzan Hosseini ([farzanini](https://github.com/farzanini)), an AI and software engineer.

## Features

- Edit document text with a rich-text editor and choose from short and multi-page Persian sample templates.
- Preview A4 cover and letterhead pages with dynamically paginated content.
- Adjust typography, margins, page metadata, colors, and preview zoom.
- Drag document elements to position them on the page.
- Upload custom cover and letterhead backgrounds and a partner logo; these assets are cached in browser storage.
- Export the document as a PDF.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 4
- `html2pdf.js` and `html2canvas-pro` for PDF export
- Vazirmatn fonts for Persian text

## Getting started

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

To create and serve a production build locally:

```sh
npm run build
npm run preview
```

## Project structure

```text
public/                 Fonts and public icons
src/
  components/           Editor, controls, and document preview
  constants/            Sample document templates
  utils/                Browser asset storage and pagination
  App.jsx               Editor state and PDF export
Dockerfile              Production image build
docker-compose.yaml     Container service configuration
```
