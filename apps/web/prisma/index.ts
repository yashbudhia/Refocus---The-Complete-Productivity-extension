import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, create a new instance of PrismaClient
  prisma = new PrismaClient();
} else {
  if (typeof window === "undefined") {
    // In development on the server side, recreate PrismaClient for each request
    prisma = new PrismaClient();
  } else {
    // On the client side in development, reuse PrismaClient across HMR updates
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

export { prisma };
