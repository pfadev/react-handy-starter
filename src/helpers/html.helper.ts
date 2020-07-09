import { minify } from "html-minifier";

export default (content: string, extractor: Record<string, any>): string => {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>

      <body>
        <div id="react-view">${content}</div>

        ${extractor.getScriptTags()}
      </body>
    </html>
  `;

  const minifyConfig = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    trimCustomFragments: true,
  };

  return DEV ? html : minify(html, minifyConfig);
};
