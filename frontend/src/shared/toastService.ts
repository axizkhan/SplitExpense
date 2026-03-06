import { toaster } from "@/components/ui/toaster";

export const useToast = () => {
  return {
    success: (title: string, description?: string) => {
      toaster.create({
        title,
        description,
        type: "success",
        duration: 3000,
      });
    },
    error: (title: string, description?: string) => {
      toaster.create({
        title,
        description,
        type: "error",
        duration: 3000,
      });
    },
    info: (title: string, description?: string) => {
      toaster.create({
        title,
        description,
        type: "info",
        duration: 3000,
      });
    },
    warning: (title: string, description?: string) => {
      toaster.create({
        title,
        description,
        type: "warning",
        duration: 3000,
      });
    },
  };
};
