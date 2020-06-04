export default (content: string) => {
  const html = `
    <!doctype html>
    <html>
      <head>

      </head>

      <body>
        <div id="react-view">${content}</div>

        <script src="main.js"></script>
      </body>
    </html>
  `;

  return html;
}
