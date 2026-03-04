import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expenseRepository } from "@/infrastructure/api/expense.repository";
import type { ExpensePayload } from "@/infrastructure/api/expense.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";

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

  return useMutation({
    mutationFn: ({
      payload,
      groupId,
    }: {
      payload: ExpensePayload;
      groupId: string;
    }) => expenseRepository.createExpense(payload, groupId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, variables.groupId],
      });
    },
  });
}

export function useEditExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expenseId,
      payload,
    }: {
      expenseId: string;
      payload: Partial<ExpensePayload>;
    }) => expenseRepository.editExpense(expenseId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseRepository.deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
    },
  });
}
