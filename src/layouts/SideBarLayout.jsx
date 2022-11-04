import { Grid, Box, Show, Hide } from "@chakra-ui/react";
import SideBar from "../components/navigationControls/SideBar";
import TopBar from "../components/navigationControls/TopBar";

export default function SideBarLayout ({ children }) {
  return (
    <Grid 
      templateColumns={{base: 'auto', md: "15em auto"}} 
      templateRows={{ base: "4.3em auto", sm: "6em auto", md: "auto" }}
    >
      <Show above="md">
        <SideBar />
      </Show>
      <Show below="md">
        <TopBar />
      </Show>
      <Box p={{ base: "6", md: "8", lg: "16" }}>
        {children}
      </Box>
    </Grid>)

}
