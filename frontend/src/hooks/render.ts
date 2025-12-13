import { renderToStaticMarkup } from "react-dom/server";

export default function jsxToHtml(Dom: React.JSX.Element) {
    const html = renderToStaticMarkup(Dom);
    return html;
}
