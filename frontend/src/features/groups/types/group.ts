// Group-related types
export interface Group {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  createdBy: string;
  createdAt: string;
}

export interface GroupMember {
  memberId: string;
  memberName: string;
  amountOwed: number;
  amountToBeRecieved: number;
}

export interface GroupSummary {
  totalSpent: number;
  youOwe: number;
  youWillReceive: number;
}

export interface GroupDetails {
  group: Group;
  userData: GroupSummary;
  balances: Array<{
    memberId: string;
    memberName: string;
    amount: number;
    type: "owe" | "receive";
  }>;
}
