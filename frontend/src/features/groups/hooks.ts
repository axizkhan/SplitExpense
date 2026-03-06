import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupRepository } from "@/infrastructure/api/group.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";
import { useToast } from "@/shared/toastService";

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
  const toast = useToast();

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
      // Also refetch to ensure immediate update
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      toast.success(
        "Member Added",
        `${variables.payload.newMemberEmail} has been added to the group!`,
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to add member. Please try again.";
      toast.error("Failed to Add Member", errorMessage);
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (groupId: string) => groupRepository.deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUPS] });
      toast.success(
        "Group Deleted",
        "The group has been deleted successfully!",
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to delete group. Please try again.";
      toast.error("Deletion Failed", errorMessage);
    },
  });
}
