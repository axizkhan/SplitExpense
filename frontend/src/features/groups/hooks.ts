import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupRepository } from "@/infrastructure/api/group.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";

export function useGroups() {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUPS],
    queryFn: () => groupRepository.getGroups(),
  });
}

export function useGroupDetails(groupId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_DETAILS, groupId],
    queryFn: () => groupRepository.getGroup(groupId),
    enabled: !!groupId,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupRepository.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUPS] });
    },
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      payload,
    }: {
      groupId: string;
      payload: { newMemberEmail: string };
    }) => groupRepository.addMember(groupId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
    },
  });
}
