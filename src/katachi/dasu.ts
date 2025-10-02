import { env } from 'cloudflare:workers'
import ky from 'ky'

export async function getk() {
  // ${env.LOCALSTACK_ENDPOINT}/${env.BUCKET_NAME}/kizis.json
  // content collection データを return で返す、眠いから一旦寝る 13:09
}
/*
const countries = defineCollection({
  loader: async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.map((country) => ({
      id: country.cca3,
      ...country,
    }));
  },
  schema: /* ... */
});

import ky from "ky";

const endpoint = "https://<account-id>.r2.cloudflarestorage.com";
const bucket = "my-bucket";
const key = "example.json";

const url = `${endpoint}/${bucket}/${key}`;

const data = await ky.get(url, {
  headers: {
    "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
  },
}).arrayBuffer(); // Uint8Array に変換も可
*/