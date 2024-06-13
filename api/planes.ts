import * as contentful from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID ?? "";
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";

const client = contentful.createClient({
  space: space,
  accessToken: accessToken,
  removeUnresolved: true,
});

async function fetchEntries<T>(query: object, preview: boolean = false) {
  const response = await client.getEntries<T>({ include: 10, ...query });
  // Parsing JSON to kill circular dependencies.
  // TODO: This is however a performance killer and should be refactored
  return response;
}

export async function getAllPlanes(params = {}) {
  const { items } = await fetchEntries({
    content_type: "post",
    ...params,
  });
  return items;
}
