import { useContext } from "react";
import { Box, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "./SwineAuctionLogo.jpg"
import AuthContext from "../../context/AuthProvider";

export default function SideBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <Flex flexDirection="row" alignItems="center" justify="end" borderBottom="1px" borderColor="gray.300">
      <Image p="2" height="full" src={logo} />
      <Spacer />
      <Link  px={{base: "2", sm: "6"}} fontSize={{ base: "sm", sm: "md" }} color="gray.600" onClick={() => navigate("/precommit")} >
        Pre-Commitment
      </Link>
      <Link px={{base: "2", sm: "6"}} fontSize={{ base: "sm", sm: "md" }} onClick={() => navigate("/reporting")} >
        Reporting
      </Link>
      <Link px={{base: "2", sm: "6"}} fontSize={{ base: "sm", sm: "md" }} onClick={logout} >
        Log Out
      </Link>
    </Flex>
  )
}
