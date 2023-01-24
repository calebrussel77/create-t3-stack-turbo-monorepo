import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "@acme/api";
import { transformer } from "@acme/api/transformer";
import fetch from "node-fetch";

// ponyfill
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
globalThis.fetch = fetch as any;

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
  transformer,
});

async function main() {
  try {
    const result = await client.post.all.query();
    console.log("hi from testy node app");
    console.log(result.map((p) => p.title));
  } catch (err) {
    console.error(err);
  }
}

main().catch((err) => console.log(err));
