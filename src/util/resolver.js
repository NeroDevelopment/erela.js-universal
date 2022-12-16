const { request } = require("undici");

async function resolve(link) {
  const data = await request(link, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.5",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
    },
    bodyTimeout: 5000,
    headersTimeout: 5000,
  }).catch(() => null)
  const body = await data.body.text()
  if(!body.includes("<title>") || !body.includes("</title>")) return;
  const title = body.split("<title>")[1].split("</title>")[0]
  return title
}

module.exports = resolve;
