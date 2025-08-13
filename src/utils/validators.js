import { BadRequestError } from "../exceptions/httpErrors.js";

export const isValidInteger = (num) => {
  return Number.isInteger(num);
};

export const isNegativeInteger = (num) => {
    return isValidInteger(num) && num < 0;
}

export const isPositiveInteger = (num) => {
    return isValidInteger(num) && num > 0;
}

export const validateId = (id, fieldName = "ID") => {
    if(!isPositiveInteger(id)) {
        throw new BadRequestError(`Invalid ${fieldName}: ${id}`);
    }
}

export const isEmpty = (value) => {
  return value === undefined || value === null || value === "";
}

export const requireFields = (obj, fields) => {
  const missing = fields.filter(
    (f) => obj[f] === undefined || obj[f] === null || obj[f] === ""
  );
  if (missing.length) {
    throw new BadRequestError(`Missing required fields: ${missing.join(", ")}`);
  }
};
