import { appRouter, createContext } from "@acme/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";

// If you need to enable cors, you can do so like this:
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // Let the tRPC handler do its magic
  return createNextApiHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
