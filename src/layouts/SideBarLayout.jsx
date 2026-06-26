import { Grid, Box, Show } from "@chakra-ui/react";
import SideBar from "../components/navigationControls/SideBar";
import TopBar from "../components/navigationControls/TopBar";

export default function SideBarLayout({ children }) {
  return (
    <Grid
      minH="100vh"
      bg="paper"
      templateColumns={{ base: "auto", md: "16em auto" }}
      templateRows={{ base: "4.3em auto", sm: "6em auto", md: "auto" }}
    >
      <Show above="md">
        <SideBar />
      </Show>
      <Show below="md">
        <TopBar />
      </Show>
      <Box px={{ base: "5", md: "8", lg: "10" }} py={{ base: "6", md: "8" }}>
        {children}
      </Box>
    </Grid>
  );
}
