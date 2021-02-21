import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  'base64'
);

function getCss() {
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        font-family: "helvetica neue",helvetica,arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        margin:0;
        padding: 0;

        background-color: black;
        background-size: cover;
        background-image: url("https://test.sessions.fm/static/media/guitar.6d9a205c.jpg");

        color: white;
    }

    .darken {
        position relative;
        height: 100vh;
        background-color: #000b;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
        padding-left: 530px;
        padding-right: 50px;
    }

    .photo {
        position: absolute;
        left: -150px;
        top: 300px;
        width: 600px;
        height 600px;
        border: solid 10px black;
        border-radius: 0 50% 50% 0;
    }

    h1 {
        font-weight: 300;
        font-size: 13vw;
        text-transform: lowercase;
        margin: 0;
        color: rgb(209, 206, 199);
        text-shadow: rgb(0, 0, 0) 0px 0px 15px;
    }

    h2 {
        font-weight: 300;
        font-size: 3.8vw;
        margin: 0 0 100px 0;
        color: rgb(132, 239, 253);
        text-shadow: rgb(0, 0, 0) 0px 0px 6px;
    }

    h2 span {
        white-space: nowrap;
    }
    h2 span b {
        font-weight: 400;
    }
`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { name, imageUrl } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="darken">
            <img class="photo" src="${sanitizeHtml(imageUrl)}" />
            <h1>sessions:</h1>
            <h2>Book a session with <span><b>${sanitizeHtml(
              name
            )}</b> today!</span></h2>
        </div>
    </body>
</html>`;
}
