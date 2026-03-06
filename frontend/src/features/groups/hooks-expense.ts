import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expenseRepository } from "@/infrastructure/api/expense.repository";
import type { ExpensePayload } from "@/infrastructure/api/expense.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";
import { useToast } from "@/shared/toastService";

export function useGroupExpenses(groupId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, groupId],
    queryFn: () => expenseRepository.getGroupExpenses(groupId),
    enabled: !!groupId,
  });
}

export function useUserExpenses(groupId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_EXPENSES, groupId],
    queryFn: () => expenseRepository.getUserExpenses(groupId),
    enabled: !!groupId,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      payload,
      groupId,
    }: {
      payload: ExpensePayload;
      groupId: string;
    }) => expenseRepository.createExpense(payload, groupId),
    onSuccess: (_, variables) => {
      // Invalidate all related queries to refresh balance and data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_EXPENSES, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      toast.success(
        "Expense Created",
        `"${variables.payload.title}" has been added successfully!`,
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to create expense. Please try again.";
      toast.error("Creation Failed", errorMessage);
    },
  });
}

export function useEditExpense() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      expenseId,
      newExpenseAmount,
    }: {
      expenseId: string;
      newExpenseAmount: number;
    }) => expenseRepository.editExpense(expenseId, newExpenseAmount),
    onSuccess: () => {
      // Invalidate all related queries to refresh balance and data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
      toast.success(
        "Expense Updated",
        "The expense has been updated successfully!",
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update expense. Please try again.";
      toast.error("Update Failed", errorMessage);
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: expenseRepository.deleteExpense,
    onSuccess: () => {
      // Invalidate all related queries to refresh balance and data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
      toast.success(
        "Expense Deleted",
        "The expense has been removed successfully!",
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to delete expense. Please try again.";
      toast.error("Deletion Failed", errorMessage);
    },
  });
}
