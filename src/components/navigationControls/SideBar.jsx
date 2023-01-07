import { useContext } from "react";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "./SwineAuctionLogo.jpg"
import AuthContext from "../../context/AuthProvider";

export default function SideBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <Flex flexDirection="column" height="100vh" borderRight="1px" borderColor="gray.300">
      <Image width="full" p="4" src={logo} />
      <Box h="16" />
      <Link ml="4" p="1" color="gray.600" onClick={() => navigate("/precommit")} >
        Pre-Commitment Entry
      </Link>
      <Link ml="4" p="1" color="gray.600" onClick={() => navigate("/reporting")} >
        Reporting
      </Link>
      <Link ml="4" p="1" color="gray.600" onClick={logout} >
        Log Out
      </Link>
    </Flex>
  )
}
