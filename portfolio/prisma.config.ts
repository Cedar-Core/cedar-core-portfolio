import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    datasource: {
        // We use DIRECT_URL for migrations/CLI because it bypasses PgBouncer/Transaction mode
        url: env("DIRECT_URL") || env("DATABASE_URL"),
    },
});
