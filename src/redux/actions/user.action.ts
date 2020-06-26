export function loadAll() {
  return {
    type: "LOAD_ALL_USERS",
    method: "get",
    url: "/users",
  };
}

export function load(id) {
  return {
    type: "LOAD_USER",
    method: "get",
    url: `/users/${id}`,
  };
}
