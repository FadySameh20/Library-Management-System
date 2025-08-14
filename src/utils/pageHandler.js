import { PAGINATION } from "../constants/constants.js";
import { isPositiveInteger } from "./validators.js";

export const getPageInfo = (req) => {
  const { page, pageSize } = req.query;
  const requestedPage = Number(page);
  const requestedPageSize = Number(pageSize);
  
  const pagination = {}
  pagination.page = isPositiveInteger(requestedPage) ? requestedPage : PAGINATION.DEFAULT_PAGE_NUMBER;
  pagination.pageSize = isPositiveInteger(requestedPageSize) ? Math.min(requestedPageSize, PAGINATION.MAX_PAGE_SIZE) : PAGINATION.DEFAULT_PAGE_SIZE;
  return pagination;
}

export const getTotalPages = (total, pageSize) => Math.max(1, Math.ceil(total / pageSize));
