export const createPage = (appHTML = '') => {
  return `
  <!doctype html>
  <title>ProvoJS ES6 App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <body>
    <div id='app'>${appHTML}</div>
  `
}
