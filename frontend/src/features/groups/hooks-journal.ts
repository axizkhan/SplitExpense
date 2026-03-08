import { useQuery } from "@tanstack/react-query";
import { journalRepository } from "@/infrastructure/api/journal.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";

export function useJournalEntries(journalId: string, pageNumber: number = 1) {
  return useQuery({
    queryKey: [QUERY_KEYS.JOURNAL, journalId, pageNumber],
    queryFn: () => journalRepository.getJournalEntries(journalId, pageNumber),
    enabled: !!journalId,
  });
}

export function useGroupJournalEntries(
  groupId: string,
  pageNumber: number = 1,
) {
  return useQuery({
    queryKey: [QUERY_KEYS.JOURNAL, groupId, pageNumber],
    queryFn: () =>
      journalRepository.getGroupJournalEntries(groupId, pageNumber),
    enabled: !!groupId,
  });
}

export function useUserToUserJournalEntries(
  groupId: string,
  memberId: string,
  pageNumber: number = 1,
) {
  return useQuery({
    queryKey: [QUERY_KEYS.JOURNAL, groupId, memberId, pageNumber],
    queryFn: () =>
      journalRepository.getUserToUserJournalEntries(
        groupId,
        memberId,
        pageNumber,
      ),
    enabled: !!groupId && !!memberId,
  });
}
