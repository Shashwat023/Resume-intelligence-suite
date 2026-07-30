import { MongoClient } from "mongodb"
import dns from "dns"

// Fix for SRV lookup ECONNREFUSED in local dev
dns.setServers(['8.8.8.8', '8.8.4.4']);
declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment")
}

let clientPromise: Promise<MongoClient>

const tlsInsecure = process.env.MONGODB_TLS_INSECURE === "true"
const clientOptions = {
  serverSelectionTimeoutMS: 10_000,
  tls: true,
  family: 4, // Force IPv4 to avoid SRV DNS resolution failures on local networks
  ...(tlsInsecure
    ? {
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
      }
    : {}),
} as const

if (process.env.NODE_ENV === "development") {
  if (!global.__mongoClientPromise) {
    console.log("[MongoDB] Initialize connection to development database...");
    const client = new MongoClient(uri, clientOptions)
    global.__mongoClientPromise = client.connect().then(c => {
      console.log("[MongoDB] Successfully connected to development database.");
      return c;
    }).catch((error) => {
      console.error("[MongoDB] Connection error:", error);
      global.__mongoClientPromise = undefined
      throw error
    })
  }
  clientPromise = global.__mongoClientPromise
} else {
  console.log("[MongoDB] Initialize connection to production database...");
  const client = new MongoClient(uri, clientOptions)
  clientPromise = client.connect().then(c => {
    console.log("[MongoDB] Successfully connected to production database.");
    return c;
  }).catch((error) => {
    console.error("[MongoDB] Connection error:", error);
    throw error;
  });
}

export default clientPromise
