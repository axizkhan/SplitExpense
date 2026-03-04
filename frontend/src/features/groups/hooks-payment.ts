import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentRepository } from "@/infrastructure/api/payment.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentRepository.createPayment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
    },
  });
}
