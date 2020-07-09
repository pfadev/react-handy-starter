import { minify } from "html-minifier";
import serialize from "serialize-javascript";

export default (
  content: string,
  extractor: Record<string, any>,
  initialState: Record<string, unknown>
): string => {
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

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__=${serialize(initialState)};
        </script>


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
