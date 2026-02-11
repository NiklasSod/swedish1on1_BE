import { User } from "../../models/User";

export const deleteUnverifiedAccounts = async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await User.deleteMany({
      $or: [
        { verified: false },
        { verified: { $exists: false } }
      ],
      createdAt: { $lt: sevenDaysAgo }
    });

    console.log(`Deleted ${result.deletedCount} unverified accounts.`);
  } catch (error) {
    console.error("Error deleting unverified accounts:", error);
  }
};