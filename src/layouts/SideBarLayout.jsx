import { Grid } from "@chakra-ui/react";
import SideBar from "../components/sidebar/SideBar"

export default function SideBarLayout ({ children }) {
  return (
    <Grid templateColumns='15em auto'>
      <SideBar />
      {children}
    </Grid>)

}
