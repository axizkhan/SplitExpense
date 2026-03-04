export const queryKeys = {
  groups: ["groups"],
  group: (groupId: string) => ["group", groupId],
  expenses: (groupId: string) => ["expenses", groupId],
  journel: (groupId: string) => ["journel", groupId],
};
