import { buildCardReviewCatalog } from "../src/lib/library/card-review-export";

process.stdout.write(JSON.stringify(buildCardReviewCatalog(), null, 2));
