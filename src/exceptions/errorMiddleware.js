import { HttpError } from "./httpErrors.js";

const prismaKnownRequestErrorCodeToStatus = {
  P2002: 409, // Unique constraint failed
  P2025: 404, // Record not found
};

export const errorMiddleware = (err, _req, res, next) => {
  if (res.headersSent) return next(err);

  // Map Prisma known errors to HttpError-like response
  if (err && err.code && prismaKnownRequestErrorCodeToStatus[err.code]) {
    let status = prismaKnownRequestErrorCodeToStatus[err.code];
    let message;

    if (err.code === "P2002") {
        message = "Resource already exists";
    } else if (err.code === "P2025") {
        message = "Resource not found";
    } else {
        message = "Database Error";
        status = 500;
    }
     
    return res.status(status).json({ error: message });
  }

  // Our custom HttpError
  if (err instanceof HttpError) {
    const body = { error: err.message };
    if (err.details) body.details = err.details;
    return res.status(err.statusCode).json(body);
  }

  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
}; 