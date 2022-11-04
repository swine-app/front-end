import { Grid, Box } from "@chakra-ui/react";
import SideBar from "../components/sidebar/SideBar"

export default function SideBarLayout ({ children }) {
  return (
    <Grid templateColumns='15em auto'>
      <SideBar />
      <Box p={{ base: "6", md: "8", lg: "16" }}>
        {children}
      </Box>
    </Grid>)

}
