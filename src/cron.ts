// import cron from "node-cron";
import { deleteUnverifiedAccounts } from "./routes/auth/delete_accounts";

/*
prod mode
// Run once per day at 2 AM
cron.schedule("0 2 * * *", async () => {
  console.log("Running cleanup job...");
  await deleteUnverifiedAccounts();
});
*/

/*
dev mode
*/
const runCleanup = async () => {
  console.log("Running cleanup job on startup...");
  await deleteUnverifiedAccounts();
};

export default runCleanup;