import { extendTheme } from "@chakra-ui/react";

// ---------------------------------------------------------------------------
// Swine Auction Committee — earthy/agricultural theme
// Forest-green primary actions, warm sand neutrals, Archivo + Public Sans.
// ---------------------------------------------------------------------------
const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },

  fonts: {
    heading: `'Archivo', system-ui, -apple-system, sans-serif`,
    body: `'Public Sans', system-ui, -apple-system, sans-serif`,
  },

  colors: {
    // primary action color — deep forest green
    brand: {
      50: "#F1F4EC",
      100: "#DEE7CF",
      200: "#C3D2AC",
      300: "#A2B981",
      400: "#7E9A58",
      500: "#5C7144",
      600: "#47592F",
      700: "#3F5233",
      800: "#34442A",
      900: "#28341F",
    },
    // warm neutral scale
    sand: {
      50: "#FBFAF6",
      100: "#F5F1E9",
      200: "#EAE4D8",
      300: "#DDD6C8",
      400: "#CFC7B6",
      500: "#A79F90",
      600: "#857E72",
      700: "#6B6358",
      800: "#4A4439",
      900: "#2A2722",
    },
    paper: "#F2EEE5",
  },

  styles: {
    global: {
      "html, body, #root": { height: "100%" },
      body: {
        bg: "paper",
        color: "sand.900",
        WebkitFontSmoothing: "antialiased",
      },
      "::selection": { bg: "#DCE3CF" },
    },
  },

  components: {
    Button: {
      baseStyle: { fontWeight: "600", borderRadius: "xl" },
      defaultProps: { variant: "solid" },
      variants: {
        solid: {
          bg: "brand.700",
          color: "#F4F1E8",
          boxShadow: "0 6px 16px -6px rgba(63,82,51,.45)",
          _hover: { bg: "brand.800", _disabled: { bg: "brand.700" } },
          _active: { bg: "brand.900" },
        },
        outline: {
          border: "1px solid",
          borderColor: "sand.300",
          bg: "sand.50",
          color: "sand.700",
          boxShadow: "none",
          _hover: { bg: "sand.100" },
        },
        ghost: {
          color: "sand.700",
          _hover: { bg: "sand.100" },
        },
      },
    },

    Input: {
      defaultProps: { focusBorderColor: "brand.500" },
      variants: {
        outline: {
          field: {
            bg: "#FCFBF8",
            borderColor: "sand.300",
            borderRadius: "lg",
            _hover: { borderColor: "sand.400" },
          },
        },
      },
    },

    Select: {
      defaultProps: { focusBorderColor: "brand.500" },
      variants: {
        outline: {
          field: {
            bg: "#FCFBF8",
            borderColor: "sand.300",
            borderRadius: "lg",
            fontWeight: "500",
            _hover: { borderColor: "sand.400" },
          },
        },
      },
    },

    NumberInput: {
      defaultProps: { focusBorderColor: "brand.500" },
      variants: {
        outline: {
          field: {
            bg: "#FCFBF8",
            borderColor: "sand.300",
            borderRadius: "lg",
            fontWeight: "700",
            fontFamily: `'Archivo', sans-serif`,
          },
        },
      },
    },

    FormLabel: {
      baseStyle: {
        fontSize: "sm",
        fontWeight: "600",
        color: "sand.700",
        mb: "1.5",
        ml: "0.5",
      },
    },

    Heading: {
      baseStyle: { letterSpacing: "-0.01em", color: "#23211C" },
    },
  },
});

export default theme;
