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
