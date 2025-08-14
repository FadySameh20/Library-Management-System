import { PAGINATION } from "../constants/constants.js";
import { isPositiveInteger } from "./validators.js";

export const getPageInfo = (req) => {
  const { page: requestedPage, pageSize: requestedPageSize } = req.query;
  const page = isPositiveInteger(Number(requestedPage)) ? requestedPage : PAGINATION.DEFAULT_PAGE_NUMBER;
  const pageSize = isPositiveInteger(Number(requestedPageSize)) ? Math.min(requestedPageSize, PAGINATION.MAX_PAGE_SIZE) : PAGINATION.DEFAULT_PAGE_SIZE;
  return { page, pageSize };
}

export const getTotalPages = (total, pageSize) => Math.max(1, Math.ceil(total / pageSize));
