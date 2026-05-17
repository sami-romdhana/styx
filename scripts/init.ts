import "dotenv/config";

import { writeFile } from "node:fs/promises";

async function main() {
  const query = {
    query: {
      count: 1000,

      // 1 - alphabetical
      // 2 - by ID
      // 3-9 - ???
      // 10 - popularity (?)
      sort: 10,

      filters: {
        released_only: true,
        type_filters: { include_games: true },
      },
    },
    context: { language: "english", country_code: "US", steam_realm: "1" },
    data_request: {
      include_basic_info: true,
      include_full_description: true,
      include_screenshots: true,
    },
  };

  const params = new URLSearchParams({
    key: process.env.STEAM_WEB_API_KEY!,
    query_name: "Styx/v0.0",
    input_json: JSON.stringify(query),
  });

  const url = "https://api.steampowered.com/IStoreQueryService/Query/v1/?" + params.toString();

  const response = await fetch(url, {
    headers: {
      Origin: "https://styx.romd.dev",
    },
  });
  const json = await response.json();

  const items = json.response.store_items;

  console.log("Found N items: " + items.length);

  await writeFile("./src/data.json", JSON.stringify(items), "utf-8");

  console.log("Done!");
}

main();
