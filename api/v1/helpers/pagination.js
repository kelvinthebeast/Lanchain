

module.exports = (objectPagination, query, countRecords) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  if (query.limit) {
    objectPagination.limitItems = parseInt(query.limit);
  }
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // normal methods to have skip in pagination

  objectPagination.totalRecords = Math.ceil(countRecords / objectPagination.limitItems);

  return objectPagination;
}