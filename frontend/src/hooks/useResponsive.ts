import { useMediaQuery } from "@chakra-ui/react";

export const useResponsive = () => {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const [isTablet] = useMediaQuery(["(max-width: 1024px)"]);
  const [isDesktop] = useMediaQuery(["(min-width: 1025px)"]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen: isMobile || isTablet,
  };
};
