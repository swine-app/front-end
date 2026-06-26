import { Box, Button, Flex, Grid, Select, Spinner, Text, useToast } from "@chakra-ui/react";
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import config from "../config";
import AuthContext from "../context/AuthProvider";

const DEMO_TEAMS = [
  { id: 1, name: "Team 02" },
  { id: 2, name: "Team 03" },
  { id: 3, name: "Team 07" },
  { id: 4, name: "Team 11" },
];
const DEMO_MEMBERS = [
  { id: 1, first_name: "Marcus", last_name: "Bell" },
  { id: 2, first_name: "Dana", last_name: "Whitfield" },
  { id: 3, first_name: "Caleb", last_name: "Doss" },
  { id: 4, first_name: "Luis", last_name: "Romero" },
  { id: 5, first_name: "Reese", last_name: "Tran" },
  { id: 6, first_name: "Priya", last_name: "Anand" },
];
const DEMO_MEETINGS = [
  { id: 1, date: "May 28, 2026" },
  { id: 2, date: "Jun 04, 2026" },
  { id: 3, date: "Jun 11, 2026" },
];
const DEMO_ENTRIES = [
  { team: "Team 03", member: "Marcus Bell", meeting: "Jun 11, 2026", amount: 3200 },
  { team: "Team 07", member: "Dana Whitfield", meeting: "Jun 11, 2026", amount: 1500 },
  { team: "Team 07", member: "Caleb Doss", meeting: "May 28, 2026", amount: 1200 },
  { team: "Team 11", member: "Luis Romero", meeting: "Jun 04, 2026", amount: 5000 },
  { team: "Team 07", member: "Reese Tran", meeting: "Jun 11, 2026", amount: 900 },
  { team: "Team 02", member: "Priya Anand", meeting: "Jun 04, 2026", amount: 2750 },
];

function downloadCsv(rows, filename) {
  const header = "Team,Member,Meeting Date,Amount\n";
  const body = rows.map(r => `${r.team},${r.member},${r.meeting},${r.amount}`).join("\n");
  const href = URL.createObjectURL(new Blob([header + body], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export default function Reporting() {
  const { auth } = useContext(AuthContext);
  const toast = useToast();
  const isDemo = auth?.rawJWT?.startsWith("demo.");

  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");
  const [loadingTeams, setLoadingTeams] = useState(false);
  useEffect(() => {
    if (!auth?.rawJWT) return;
    if (isDemo) { setTeams(DEMO_TEAMS); return; }
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
    getTeams();
  }, [auth?.rawJWT, isDemo, toast])

  const getReportTeam = useCallback(async () => {
    if (isDemo) {
      const teamName = DEMO_TEAMS.find(t => String(t.id) === String(team))?.name;
      const rows = DEMO_ENTRIES.filter(e => e.team === teamName);
      downloadCsv(rows, "reportByTeam.csv");
      return;
    }
    let res;
    try {
      res = await axios.post(
        `${config.apiUrl}/api/reports/teams`,
        { teamId: team },
        { headers: { "Authorization": auth?.rawJWT } }
      )
    }
    catch (err) {
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
    link.setAttribute('download', 'reportByTeam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [team, isDemo, auth?.rawJWT, toast])

  const [members, setMembers] = useState([]);
  const [member, setMember] = useState("");
  const [loadingMembers, setLoadingMembers] = useState(false);
  useEffect(() => {
    if (!auth?.rawJWT) return;
    if (isDemo) { setMembers(DEMO_MEMBERS); return; }
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
    getMembers();
  }, [auth?.rawJWT, isDemo, toast])

  const getReportMember = useCallback(async () => {
    if (isDemo) {
      const memberName = DEMO_MEMBERS.find(m => String(m.id) === String(member));
      const fullName = memberName ? `${memberName.first_name} ${memberName.last_name}` : "";
      const rows = DEMO_ENTRIES.filter(e => e.member === fullName);
      downloadCsv(rows, "reportByMember.csv");
      return;
    }
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
    link.setAttribute('download', 'reportByMember.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [member, isDemo, auth?.rawJWT, toast])

  const [meetings, setMeetings] = useState([]);
  const [meeting, setMeeting] = useState("");
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  useEffect(() => {
    if (!auth?.rawJWT) return;
    if (isDemo) { setMeetings(DEMO_MEETINGS); return; }
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
    getMeetings();
  }, [auth?.rawJWT, isDemo, toast])

  const getReportMeeting = useCallback(async () => {
    if (isDemo) {
      const meetingDate = DEMO_MEETINGS.find(m => String(m.id) === String(meeting))?.date;
      const rows = DEMO_ENTRIES.filter(e => e.meeting === meetingDate);
      downloadCsv(rows, "reportByMeeting.csv");
      return;
    }
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
    link.setAttribute('download', 'reportByMeeting.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [meeting, isDemo, auth?.rawJWT, toast])

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
