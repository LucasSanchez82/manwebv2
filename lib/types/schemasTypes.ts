import { z } from "zod";
import {
  contentSchemaClient,
  contentSchemaClientPartial,
} from "../schemas/contents/contentSchemaClient";

export type ContentSchemaClientPartial = z.infer<
  typeof contentSchemaClientPartial
>;
export type ContentSchemaClient = z.infer<typeof contentSchemaClient>;
