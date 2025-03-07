/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Ai } from '@cloudflare/ai'
import { PineconeClient } from "@pinecone-database/pinecone";
import { Hono } from 'hono'
const app = new Hono()

export interface Env {
  AI: any;
  DATABASE_URL: string;
}

app.get('/', async (c :any) => {
  const ai = new Ai(c.env.AI);
  const { text } = c.req.query()
  if (!text) {
    return c.text("Missing text", 400);
  }
  const pinecone = new PineconeClient();
  await pinecone.init({
      environment: "gcp-starter",
      apiKey: 'b7c3992b-e63c-4f12-b0ff-3bbc09928745' // ※ここの部分を書き直してください※
  });
  const index = pinecone.Index('cloudflare-ai'); // ※必要に応じてここの部分を書き直してください※

  const date = new Date() ;
  const dateString = (date.getTime() / 1000).toString();

  const embeddings = await ai.run('@cf/baai/bge-base-en-v1.5', { text: text })
  const vec = embeddings.data[0]
  const result = await index.upsert({
      upsertRequest: {
          vectors: [{
              id: dateString,
              values: vec,
          }]
      }
  })
  return c.text('OK');
})

app.onError((err :any, c :any) => {
  return c.text(err)
})

export default app