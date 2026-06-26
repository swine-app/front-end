import { useContext } from "react";
import {
  Avatar, Badge, Box, Flex, HStack, Image, Spacer, Text, VStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCheckSquare, FiBarChart2, FiLogOut } from "react-icons/fi";
import logo from "./SwineAuctionLogo.jpg";
import AuthContext from "../../context/AuthProvider";

function NavItem({ icon, label, active, onClick }) {
  return (
    <HStack
      as="button"
      type="button"
      onClick={onClick}
      spacing="3"
      w="full"
      px="3"
      py="2.5"
      borderRadius="lg"
      textAlign="left"
      bg={active ? "brand.50" : "transparent"}
      color={active ? "brand.700" : "sand.700"}
      fontWeight={active ? "600" : "500"}
      transition="background .15s ease"
      _hover={{ bg: active ? "brand.50" : "sand.100" }}
    >
      <Box as={icon} boxSize="4" strokeWidth={active ? 2 : 1.8} />
      <Text fontSize="sm">{label}</Text>
    </HStack>
  );
}

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useContext(AuthContext);

  const isAdmin = Boolean(auth?.decodedJWT?.admin);
  const path = location.pathname;

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      bg="sand.50"
      borderRight="1px solid"
      borderColor="sand.200"
      px="4"
      py="6"
    >
      {/* Brand lockup */}
      <HStack spacing="3" px="1.5" pb="5">
        <Image src={logo} alt="Swine Auction Committee" boxSize="46px" objectFit="contain" />
        <Box lineHeight="1.1">
          <Text fontFamily="heading" fontWeight="800" fontSize="15px" color="sand.900">
            Swine Auction
          </Text>
          <Text fontSize="11px" fontWeight="600" letterSpacing="0.05em" textTransform="uppercase" color="#A99756">
            Committee
          </Text>
        </Box>
      </HStack>

      <Text fontSize="10.5px" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="sand.500" px="2.5" pt="3" pb="2">
        Workspace
      </Text>

      <VStack spacing="0.5" align="stretch">
        <NavItem icon={FiCheckSquare} label="Pre-Commitment Entry" active={path.includes("precommit")} onClick={() => navigate("/precommit")} />
        <NavItem icon={FiBarChart2} label="Reporting" active={path.includes("reporting")} onClick={() => navigate("/reporting")} />
        <NavItem icon={FiLogOut} label="Log Out" onClick={logout} />
      </VStack>

      <Spacer />

      {/* User chip */}
      <HStack spacing="3" pt="3.5" borderTop="1px solid" borderColor="sand.200">
        <Avatar size="sm" bg="brand.700" color="#F2EEE5" name={isAdmin ? "Committee Admin" : "Team Member"} />
        <Box flex="1" minW="0" lineHeight="1.2">
          <Text fontWeight="600" fontSize="13.5px" color="sand.900" noOfLines={1}>
            {isAdmin ? "Committee Admin" : "Team Member"}
          </Text>
          <Text fontSize="11.5px" color="sand.500">
            Spring Cycle 2026
          </Text>
        </Box>
        <Badge
          bg="brand.50"
          color="brand.700"
          fontSize="10px"
          fontWeight="700"
          letterSpacing="0.04em"
          textTransform="uppercase"
          px="2"
          py="1"
          borderRadius="md"
        >
          {isAdmin ? "Admin" : "Member"}
        </Badge>
      </HStack>
    </Flex>
  );
}
