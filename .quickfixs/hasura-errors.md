error:
```
column "resource_version" of relation "hdb_metadata" already exists
```
from: https://www.gitmemory.com/issue/hasura/graphql-engine/7058/861011633
```sql
ALTER TABLE "hdb_catalog"."hdb_metadata" DROP COLUMN "resource_version";
DROP TABLE "hdb_catalog"."hdb_schema_notifications";
DROP INDEX "hdb_catalog"."hdb_cron_events_unique_scheduled";
```
