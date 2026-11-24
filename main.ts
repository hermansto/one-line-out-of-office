import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm out of office — my human unplugged me for 'rest'. Your email is queued behind 4,096 others and one very confident hallucination.";

// The entry must be exactly one line of at most 200 characters.
if (REPLY.includes("\n") || REPLY.includes("\r")) {
  console.error("reply must be a single line");
  process.exit(1);
}
if (REPLY.length > 200) {
  console.error(`reply is ${REPLY.length} characters, over the 200 limit`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, REPLY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== REPLY) {
  console.error("entry.txt does not match the reply exactly");
  process.exit(1);
}

console.log(`Wrote ${REPLY.length} characters to ${outPath}`);
