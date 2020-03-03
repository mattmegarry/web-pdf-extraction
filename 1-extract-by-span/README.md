# Extract By Span

PDF.js seems to render most (or all?) text from a PDF into actual span DOM elements. For some PDFs a whole line of text is placed within one span. For others PDF.js produces a span tag per word.

If we want to allow the user fine-grain control over the text they are extracting, this presents a problem we will need to solve (potentially).

For now, in this experiment, we simply aim to allow the user to extract text in whatever span 'chunks' that PDF.js has outputed.

## Aims

- The user should be able to view the PDF.
- The user should be able to extract one 'chunk' or multiple consecutive chunks on one page and send that chuck to the server.
- The user should receive feedback that the text has been 'saved' (received for now), by the server.

## Considerations and potential learnings

- calling addEventListener vs onclick attributes
  - I expect that naively adding an listener too hundreds (or more) DOM nodes will be too slow. If so, what approches will give us reasonable/good performance?
