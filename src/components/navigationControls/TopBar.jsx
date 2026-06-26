import { useContext } from "react";
import { Flex, HStack, Image, Link, Spacer, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./SwineAuctionLogo.jpg";
import AuthContext from "../../context/AuthProvider";

// Mobile / narrow-viewport top bar (shown below the `md` breakpoint).
export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const path = location.pathname;

  const linkStyle = (active) => ({
    px: { base: "2", sm: "4" },
    fontSize: { base: "sm", sm: "md" },
    fontWeight: active ? "600" : "500",
    color: active ? "brand.700" : "sand.700",
    cursor: "pointer",
    _hover: { color: "brand.700" },
  });

  return (
    <Flex
      align="center"
      bg="sand.50"
      borderBottom="1px solid"
      borderColor="sand.200"
      px="3"
    >
      <HStack spacing="2.5" py="2">
        <Image src={logo} alt="Swine Auction Committee" h="38px" objectFit="contain" />
        <Text fontFamily="heading" fontWeight="800" fontSize="sm" display={{ base: "none", sm: "block" }}>
          Swine Auction
        </Text>
      </HStack>
      <Spacer />
      <Link {...linkStyle(path.includes("precommit"))} onClick={() => navigate("/precommit")}>
        Pre-Commitment
      </Link>
      <Link {...linkStyle(path.includes("reporting"))} onClick={() => navigate("/reporting")}>
        Reporting
      </Link>
      <Link {...linkStyle(false)} onClick={logout}>
        Log Out
      </Link>
    </Flex>
  );
}
