// initializing Notion client (Notion is used as a CMS in the app)
import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
