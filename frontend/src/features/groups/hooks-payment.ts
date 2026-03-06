import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentRepository } from "@/infrastructure/api/payment.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";
import { useToast } from "@/shared/toastService";

export function useCreatePayment() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: paymentRepository.createPayment,
    onSuccess: (_, variables) => {
      // Invalidate all related queries to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PAYMENTS],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      toast.success(
        "Payment Successful",
        `₹${variables.amount} payment has been recorded successfully!`,
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to process payment. Please try again.";
      toast.error("Payment Failed", errorMessage);
    },
  });
}
