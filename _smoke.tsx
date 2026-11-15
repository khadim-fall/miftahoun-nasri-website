import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "@/App";
const paths = ["/", "/a-propos", "/activites", "/evenements", "/galerie", "/contact", "/inexistant"];
let bad = 0;
for (const p of paths) {
  const html = renderToString(<Router ssrPath={p}><App /></Router>);
  const nested = /<a [^>]*>(?:(?!<\/a>).)*<a /s.test(html);
  const h1 = (html.match(/<h1/g) || []).length;
  const hashLinks = (html.match(/href="#"/g) || []).length;
  console.log(p.padEnd(13), "bytes", String(html.length).padEnd(7), "h1:", h1, "nested<a>:", nested, 'href="#":', hashLinks);
  if (nested || h1 !== 1 || hashLinks) bad++;
}
const home = renderToString(<Router ssrPath="/"><App /></Router>);
console.log("home has empty-events msg:", home.includes("Aucun événement"));
console.log("contact has form:", renderToString(<Router ssrPath="/contact"><App /></Router>).includes('id="contact-message"'));
process.exit(bad ? 1 : 0);
