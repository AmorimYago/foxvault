import { SELF, env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

import worker from "../src";

const IncomingRequest =
  Request<unknown, IncomingRequestCfProperties>;

describe("FoxVault image delivery worker", () => {
  it("returns 404 for an unsupported path (unit style)", async () => {
    const request = new IncomingRequest(
      "http://example.com/",
    );

    const response = await worker.fetch(request, env);

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });

  it("returns 404 for an unsupported path (integration style)", async () => {
    const response = await SELF.fetch(
      "http://example.com/",
    );

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });

  it("returns 405 for unsupported methods", async () => {
    const response = await SELF.fetch(
      "http://example.com/i/12345678-1234-4123-8123-123456789abc.png",
      {
        method: "POST",
      },
    );

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe(
      "GET, HEAD",
    );
    expect(await response.text()).toBe(
      "Method Not Allowed",
    );
  });

  it("returns 404 for an invalid public image path", async () => {
    const response = await SELF.fetch(
      "http://example.com/i/not-a-valid-image.png",
    );

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });
});