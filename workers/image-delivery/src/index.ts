const publicImagePathPattern =
  /^\/i\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.(jpg|png|webp|gif)$/i;

export default {
  async fetch(request, env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          Allow: "GET, HEAD",
        },
      });
    }

    const requestUrl = new URL(request.url);

    const pathMatch = requestUrl.pathname.match(
      publicImagePathPattern,
    );

    if (!pathMatch) {
      return new Response("Not Found", {
        status: 404,
      });
    }

    const publicImageId = pathMatch[1];
    const fileExtension = pathMatch[2]?.toLowerCase();

    if (!publicImageId || !fileExtension) {
      return new Response("Not Found", {
        status: 404,
      });
    }

    const objectKey = `images/${publicImageId}.${fileExtension}`;

    if (request.method === "HEAD") {
      const imageMetadata = await env.IMAGES_BUCKET.head(objectKey);

      if (!imageMetadata) {
        return new Response("Not Found", {
          status: 404,
        });
      }

      const responseHeaders = createResponseHeaders({
        imageObject: imageMetadata,
        publicImageId,
        fileExtension,
      });

      return new Response(null, {
        status: 200,
        headers: responseHeaders,
      });
    }

    const imageObject = await env.IMAGES_BUCKET.get(objectKey);

    if (!imageObject) {
      return new Response("Not Found", {
        status: 404,
      });
    }

    const responseHeaders = createResponseHeaders({
      imageObject,
      publicImageId,
      fileExtension,
    });

    return new Response(imageObject.body, {
      status: 200,
      headers: responseHeaders,
    });
  },
} satisfies ExportedHandler<Env>;

type CreateResponseHeadersInput = {
  imageObject: R2Object;
  publicImageId: string;
  fileExtension: string;
};

function createResponseHeaders({
  imageObject,
  publicImageId,
  fileExtension,
}: CreateResponseHeadersInput) {
  const responseHeaders = new Headers();

  imageObject.writeHttpMetadata(responseHeaders);

  responseHeaders.set("ETag", imageObject.httpEtag);

  responseHeaders.set(
    "Cache-Control",
    "public, max-age=31536000, immutable",
  );

  responseHeaders.set(
    "Content-Disposition",
    `inline; filename="${publicImageId}.${fileExtension}"`,
  );

  responseHeaders.set("X-Content-Type-Options", "nosniff");

  return responseHeaders;
}