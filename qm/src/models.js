export const predicate = [
  {
    key: 1,
    name: "Domain",
    type: "string",
    column: "domain",
  },
  {
    key: 2,
    name: "User Email",
    type: "string",
    column: "user_email",
  },
  {
    key: 3,
    name: "Screen Width",
    type: "number",
    column: "screen_width",
  },
  {
    key: 4,
    name: "Screen Height",
    type: "number",
    column: "screen_height",
  },
  {
    key: 5,
    name: "# of Visit",
    type: "number",
    column: "visits",
  },
  {
    key: 6,
    name: "First Name",
    type: "string",
    column: "user_first_name",
  },
  {
    key: 7,
    name: "Last Name",
    type: "string",
    column: "user_last_name",
  },
  {
    key: 8,
    name: "Page response time (ms)",
    type: "number",
    column: "page_response",
  },
  {
    key: 9,
    name: "Page path",
    type: "string",
    column: "path",
  },
];

export const stringOptions = [
  { name: "equals", sql: "=" },
  { name: "contains", sql: "LIKE" },
  { name: "start with", sql: "LIKE" },
  { name: "in list", sql: "IN" },
];

export const numberOptions = [
  { name: "equals", sql: "=" },
  { name: "between", sql: "BETWEEN" },
  { name: "greater than", sql: ">" },
  { name: "less than", sql: "<" },
  { name: "in list", sql: "IN" },
];
