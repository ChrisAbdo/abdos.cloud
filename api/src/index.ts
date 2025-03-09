/**
 * Simple Bun HTTP server for abdos.cloud
 */

// Import types
import { type Server, type BunRequest } from "bun";

// Define the port to listen on (default to 4000)
const PORT = process.env.PORT || 4000;

// Define allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://abdos.cloud',
  'http://localhost:3000',  // For local development
];

// Helper function to add CORS headers to responses
const addCorsHeaders = (response: Response, origin: string): Response => {
  const headers = new Headers(response.headers);
  
  // Only add CORS headers if the origin is allowed
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  }
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

// Create and start the server
const server: Server = Bun.serve({
  port: Number(PORT),
  
  // Define routes
  routes: {
    // Health check endpoint
    "/api/health": (req: Request) => {
      const origin = req.headers.get('origin') || '';
      return addCorsHeaders(new Response("OK"), origin);
    },
    
    // API version endpoint
    "/api/version": (req: Request) => {
      const origin = req.headers.get('origin') || '';
      return addCorsHeaders(Response.json({ 
        version: "1.0.0",
        env: process.env.NODE_ENV || "development" 
      }), origin);
    },
    
    // Example dynamic route with parameters
    "/api/users/:id": (req: BunRequest<"/api/users/:id">) => {
      const origin = req.headers.get('origin') || '';
      return addCorsHeaders(Response.json({ 
        userId: req.params.id,
        message: `User data for ID: ${req.params.id}`
      }), origin);
    },
    
    // Example route with different HTTP methods
    "/api/data": {
      OPTIONS: (req: Request) => {
        const origin = req.headers.get('origin') || '';
        return addCorsHeaders(new Response(null, { status: 204 }), origin);
      },
      GET: (req: Request) => {
        const origin = req.headers.get('origin') || '';
        return addCorsHeaders(Response.json({ message: "This is GET response" }), origin);
      },
      POST: async (req: Request) => {
        const origin = req.headers.get('origin') || '';
        const body = await req.json();
        return addCorsHeaders(Response.json({ 
          received: true, 
          data: body 
        }), origin);
      },
      PUT: (req: Request) => {
        const origin = req.headers.get('origin') || '';
        return addCorsHeaders(Response.json({ message: "This is PUT response" }), origin);
      },
      DELETE: (req: Request) => {
        const origin = req.headers.get('origin') || '';
        return addCorsHeaders(new Response(null, { status: 204 }), origin);
      }
    },
    
    // Wildcard route for unmatched API routes
    "/api/*": (req: Request) => {
      const origin = req.headers.get('origin') || '';
      return addCorsHeaders(Response.json(
        { error: "Not found" }, 
        { status: 404 }
      ), origin);
    },
  },
  
  // Fallback for routes not matched above
  fetch(req: Request) {
    const url = new URL(req.url);
    const origin = req.headers.get('origin') || '';
    
    // Handle preflight OPTIONS requests for CORS
    if (req.method === 'OPTIONS') {
      return addCorsHeaders(new Response(null, { status: 204 }), origin);
    }
    
    return addCorsHeaders(
      new Response(`Route not found: ${url.pathname}`, { status: 404 }),
      origin
    );
  },
  
  // Error handler
  error(error: Error) {
    console.error("Server error:", error);
    return new Response(`Server Error: ${error.message}`, { 
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
});

console.log(`🚀 API server running at ${server.url}`); 