import { Box, Button, Flex, Grid, Input, Select, Spinner, Text, useToast } from "@chakra-ui/react";
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import config from "../config";
import AuthContext from "../context/AuthProvider";

export default function Reporting() {
  const { auth } = useContext(AuthContext);
  const toast = useToast()

  // Get api data for form entry
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");
  const [loadingTeams, setLoadingTeams] = useState(false);
  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoadingTeams(true);
        const teamsRes = await axios.get(
          `${config.apiUrl}/api/teams`,
          { headers: { "Authorization": auth?.rawJWT } }
        );
        setTeams(teamsRes.data);
      }
      catch (err) {
        toast({ title: "Failed Getting Teams", status: "error", description: err.message, position: "top-right" })
        console.error(err);
      }
      finally {
        setLoadingTeams(false);
      }
    }
    if (auth?.rawJWT) {
      getTeams();
    }
  }, [auth?.rawJWT, toast])
  const getReportTeam = useCallback(async () => {
    let res;
    try {
      res = await axios.post(
        `${config.apiUrl}/api/reports/teams`,
        { teamId: team },
        { headers: { "Authorization": auth?.rawJWT } }
      )
    }
    catch (err) {
      console.log("error")
      if (err.response.status === 404) {
        toast({ title: "Failed to fetch report", status: "error", description: "No precommits by Team", position: "top-right" })
      }
      else {
        toast({ title: "Failed to fetch report", status: "error", description: err.message, position: "top-right" })
      }
      console.error(err)
      return
    }
    const href = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'reportByTeam.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [team, auth?.rawJWT, toast])
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState("");
  const [loadingMembers, setLoadingMembers] = useState(false);
  useEffect(() => {
    const getMembers = async () => {
      try {
        setLoadingMembers(true);
        const membersRes = await axios.get(
          `${config.apiUrl}/api/members`,
          { headers: { "Authorization": auth?.rawJWT } }
        );
        setMembers(membersRes.data);
      }
      catch (err) {
        toast({ title: "Failed Getting Members", status: "error", description: err.message, position: "top-right" })
        console.error(err);
      }
      finally {
        setLoadingMembers(false);
      }
    }
    if (auth?.rawJWT) {
      getMembers();
    }
  }, [auth?.rawJWT, toast])
  const getReportMember = useCallback(async () => {
    let res;
    try {
      res = await axios.post(
        `${config.apiUrl}/api/reports/members`,
        { memberId: member },
        { headers: { "Authorization": auth?.rawJWT } }
      )
    }
    catch (err) {
      if (err.response.status === 404) {
        toast({ title: "Failed to fetch report", status: "error", description: "No precommits by Member", position: "top-right" })
      }
      else {
        toast({ title: "Failed to fetch report", status: "error", description: err.message, position: "top-right" })
      }
      console.error(err)
      return
    }
    const href = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'reportByMember.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [member, auth?.rawJWT, toast])
  const [meetings, setMeetings] = useState([]);
  const [meeting, setMeeting] = useState("");
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  useEffect(() => {
    const getMeetings = async () => {
      try {
        setLoadingMeetings(true);
        const meetingsRes = await axios.get(
          `${config.apiUrl}/api/meetings`,
          { headers: { "Authorization": auth?.rawJWT } }
        );
        setMeetings(meetingsRes.data);
      }
      catch (err) {
        toast({ title: "Failed Getting Meetings", status: "error", description: err.message, position: "top-right" })
        console.error(err);
      }
      finally {
        setLoadingMeetings(false);
      }
    }
    if (auth?.rawJWT) {
      getMeetings();
    }
  }, [auth?.rawJWT, toast])
  const getReportMeeting = useCallback(async () => {
    let res;
    try {
      res = await axios.post(
        `${config.apiUrl}/api/reports/meetings`,
        { meetingId: meeting },
        { headers: { "Authorization": auth?.rawJWT } }
      )
    }
    catch (err) {
      if (err.response.status === 404) {
        toast({ title: "Failed to fetch report", status: "error", description: "No precommits by Meeting", position: "top-right" })
      }
      else {
        toast({ title: "Failed to fetch report", status: "error", description: err.message, position: "top-right" })
      }
      console.error(err)
      return
    }
    const href = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'reportByMeeting.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [meeting, auth?.rawJWT, toast])

  return (loadingTeams || loadingMembers || loadingMeetings ?
    <Flex justify="center" h="100vh" alignItems="center"><Spinner size="xl" /></Flex> :
    <Box>
      <Text py="4" fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" >
        Precommit Report
      </Text>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap="2">
        <Box>
          <Select py="2" placeholder='None' onChange={(e) => setTeam(e.target.value)} value={team}>
            {teams.map((team) =>
              <option key={`team-opt-${team.id}`} value={team.id}>{team.name} </option>
            )}
          </Select>
          <Button onClick={getReportTeam}> Summary by Team </Button>
        </Box>
        <Box>
          <Select py="2" placeholder='None' onChange={(e) => setMember(e.target.value)} value={member}>
            {members.map((member) =>
              <option key={`member-opt-${member.id}`} value={member.id}>
                {`${member.first_name} ${member.last_name}`}
              </option>
            )}
          </Select>
          <Button onClick={getReportMember}> Summary by Member </Button>
        </Box>
        <Box>
          <Select py="2" placeholder='None' onChange={(e) => setMeeting(e.target.value)} value={meeting}>
            {meetings.map((meeting) =>
              <option key={`meeting-opt-${meeting.id}`} value={meeting.id}>
                {`${meeting.date}`}
              </option>
            )}
          </Select>
          <Button onClick={getReportMeeting}> Summary by Meeting </Button>
        </Box>
      </Grid>
    </Box>
  )
}
