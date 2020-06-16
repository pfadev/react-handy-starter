export default (content: string, extractor: Record<string, any>): string => {
  const html = `
    <!doctype html>
    <html>
      <head>
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>

      <body>
        <div id="react-view">${content}</div>

        ${extractor.getScriptTags()}
      </body>
    </html>
  `;

  return html;
};
