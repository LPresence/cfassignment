export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/").filter(Boolean); // ['secure', 'FR'] ou ['secure']
    
    // Lecture des headers injectés par Cloudflare Access
    const email = request.headers.get("cf-access-authenticated-user-email");
    const country = request.headers.get("cf-ipcountry");
    const timestamp = new Date().toISOString();

    // Vérifie que l'utilisateur est authentifié
    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Route : /secure/XX → affiche le drapeau
    if (pathParts.length === 2 && pathParts[0] === "secure") {
      const requestedCountry = pathParts[1].toLowerCase(); // ex: 'fr'
      const object = await env.FLAGS_BUCKET.get(`${requestedCountry}.webp`);
      
      if (!object) {
        return new Response("Flag not found", { status: 404 });
      }

      return new Response(object.body, {
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    // Route : /secure → retourne HTML avec infos
    if (pathParts.length === 1 && pathParts[0] === "secure") {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>User Info</title></head>
        <body>
          <h1>
            ${email} authenticated at ${timestamp} from 
            <a href="/secure/${country.toLowerCase()}">${country}</a>
          </h1>
        </body>
        </html>
      `;

      return new Response(html, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};

