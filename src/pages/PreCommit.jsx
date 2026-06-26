import {
  Avatar, Badge, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem,
  Heading, HStack, Input, NumberInput, NumberInputField, Select, SimpleGrid,
  Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiArrowRight, FiInfo, FiLock } from "react-icons/fi";
import config from "../config";
import AuthorizationContext from "../context/AuthProvider";

// --- helpers ----------------------------------------------------------------
const usd = (n) =>
  Number(n).toLocaleString("en-US", { style: "currency", currency: "USD" });

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

const SAMPLE_RECENT = [
  { id: 1, team: "Team 03", member: "Marcus Bell", meeting: "Jun 11, 2026", amount: 3200, submitted: "2h ago", status: "Confirmed" },
  { id: 2, team: "Team 07", member: "Dana Whitfield", meeting: "Jun 11, 2026", amount: 1500, submitted: "5h ago", status: "Confirmed" },
  { id: 3, team: "Team 07", member: "Caleb Doss", meeting: "May 28, 2026", amount: 1200, submitted: "Jun 22", status: "Confirmed" },
  { id: 4, team: "Team 11", member: "Luis Romero", meeting: "Jun 04, 2026", amount: 5000, submitted: "Jun 20", status: "Confirmed" },
  { id: 5, team: "Team 07", member: "Reese Tran", meeting: "Jun 11, 2026", amount: 900, submitted: "Jun 19", status: "Pending" },
  { id: 6, team: "Team 02", member: "Priya Anand", meeting: "Jun 04, 2026", amount: 2750, submitted: "Jun 18", status: "Pending" },
];

function MetricCard({ label, value, note }) {
  return (
    <Box bg="sand.50" border="1px solid" borderColor="sand.200" borderRadius="2xl" px="5" py="4">
      <Text fontSize="xs" fontWeight="600" color="sand.500" mb="2">{label}</Text>
      <Heading fontSize="2xl" fontWeight="700">{value}</Heading>
      <Text fontSize="xs" color="sand.500" mt="1">{note}</Text>
    </Box>
  );
}

function StatusBadge({ status }) {
  const confirmed = status === "Confirmed";
  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      gap="1.5"
      px="2.5"
      py="1"
      borderRadius="full"
      textTransform="none"
      fontWeight="600"
      fontSize="xs"
      bg={confirmed ? "#E7F0E4" : "#F8EFD9"}
      color={confirmed ? "#3F5733" : "#8A6A2E"}
    >
      <Box boxSize="6px" borderRadius="full" bg={confirmed ? "#5F7A45" : "#C79A3E"} />
      {status}
    </Badge>
  );
}

export default function PreCommit() {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      commitmentAmount: "0",
    },
  });

  const { auth } = useContext(AuthorizationContext);
  const toast = useToast();
  const isAdmin = Boolean(auth?.decodedJWT?.admin);

  // Get api data for form entry
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  useEffect(() => {
    if (!auth?.decodedJWT?.admin) {
      if (teams.length >= 1) {
        const myTeamIdx = teams.findIndex((team) => team.id === auth?.decodedJWT?.id);
        setValue("team", teams[myTeamIdx].id);
      }
    }
  }, [auth?.decodedJWT?.admin, auth?.decodedJWT?.id, teams, setValue]);
  useEffect(() => {
    if (!auth?.rawJWT) return;
    if (auth.rawJWT.startsWith("demo.")) { setTeams(DEMO_TEAMS); return; }
    const getTeams = async () => {
      try {
        setLoadingTeams(true);
        const teamsRes = await axios.get(`${config.apiUrl}/api/teams`, {
          headers: { Authorization: auth.rawJWT },
        });
        setTeams(teamsRes.data);
      } catch (err) {
        toast({ title: "Failed Getting Teams", status: "error", description: err });
        console.error(err);
      } finally {
        setLoadingTeams(false);
      }
    };
    getTeams();
  }, [auth?.rawJWT, toast]);
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  useEffect(() => {
    if (!auth?.rawJWT) return;
    if (auth.rawJWT.startsWith("demo.")) { setMembers(DEMO_MEMBERS); return; }
    const getMembers = async () => {
      try {
        setLoadingMembers(true);
        const membersRes = await axios.get(`${config.apiUrl}/api/members`, {
          headers: { Authorization: auth.rawJWT },
        });
        setMembers(membersRes.data);
      } catch (err) {
        toast({ title: "Failed Getting Members", status: "error", description: err });
        console.error(err);
      } finally {
        setLoadingMembers(false);
      }
    };
    getMembers();
  }, [auth?.rawJWT, toast]);
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  useEffect(() => {
    if (!auth?.rawJWT) return;
    if (auth.rawJWT.startsWith("demo.")) { setMeetings(DEMO_MEETINGS); return; }
    const getMeetings = async () => {
      try {
        setLoadingMeetings(true);
        const meetingsRes = await axios.get(`${config.apiUrl}/api/meetings`, {
          headers: { Authorization: auth.rawJWT },
        });
        setMeetings(meetingsRes.data);
      } catch (err) {
        toast({ title: "Failed Getting Meetings", status: "error", description: err });
        console.error(err);
      } finally {
        setLoadingMeetings(false);
      }
    };
    getMeetings();
  }, [auth?.rawJWT, toast]);

  const format = (val) => `$ ` + val;
  const parse = (val) => val.replace(/^\$ /, "");

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setSubmitting(true);
      const res = await axios.post(
        `${config.apiUrl}/api/precommit`,
        {
          teamId: parseInt(data.team),
          memberId: parseInt(data.member),
          meetingId: parseInt(data.meeting),
          orderDate: data.date,
          amount: parseFloat(data.commitmentAmount),
        },
        {
          headers: { Authorization: auth.rawJWT },
        }
      );
      toast({
        title: `Successfully submitted precommit entry ${res.data.id}`,
        status: "success",
        position: "top-right",
      });
    } catch (err) {
      toast({ title: "Problem Submitting Entry", status: "error", description: err, position: "top-right" });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Role-aware presentation
  const subtitle = isAdmin
    ? "Log a member's auction commitment for an upcoming meeting. You have access to every team in this cycle."
    : "Log your auction commitment for an upcoming meeting. You can only submit on behalf of your own team.";

  const metrics = isAdmin
    ? [
        { label: "Committed this cycle", value: "$128,400", note: "across 9 active teams" },
        { label: "Entries submitted", value: "47", note: "12 awaiting confirmation" },
        { label: "Next meeting", value: "Jun 11", note: "6 days remaining" },
      ]
    : [
        { label: "Your team committed", value: "$14,250", note: "Team 07 \u00b7 6 members" },
        { label: "Your entries", value: "4", note: "1 pending review" },
        { label: "Next meeting", value: "Jun 11", note: "6 days remaining" },
      ];

  const recentTotal = SAMPLE_RECENT.reduce((s, e) => s + e.amount, 0);

  if (loadingTeams || loadingMembers || loadingMeetings || submitting) {
    return (
      <Flex justify="center" h="70vh" alignItems="center">
        <Spinner size="xl" color="brand.600" thickness="3px" />
      </Flex>
    );
  }

  return (
    <Box maxW="1180px">
      {/* breadcrumb */}
      <Flex align="center" justify="space-between" mb="5">
        <Text fontSize="13px" color="sand.500" fontWeight="500">
          Pre-Commitment{" "}
          <Box as="span" color="sand.300" mx="1.5">/</Box>
          <Box as="span" color="sand.900" fontWeight="600">New Entry</Box>
        </Text>
        <HStack spacing="2.5">
          <HStack spacing="2" px="3" py="1.5" border="1px solid" borderColor="sand.200" borderRadius="lg" bg="sand.50">
            <Box boxSize="7px" borderRadius="full" bg="#7E944F" />
            <Text fontSize="13px" fontWeight="600" color="sand.700">Spring Cycle 2026</Text>
          </HStack>
        </HStack>
      </Flex>

      {/* title */}
      <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" mb="1.5">
        Create Pre-Commitment Entry
      </Heading>
      <Text fontSize="md" color="sand.600" maxW="560px" mb="6">
        {subtitle}
      </Text>

      {/* metric strip */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" mb="6">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </SimpleGrid>

      {/* form card */}
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="white"
        border="1px solid"
        borderColor="sand.200"
        borderRadius="2xl"
        boxShadow="0 1px 2px rgba(40,34,24,.04), 0 18px 40px -28px rgba(40,34,24,.28)"
        overflow="hidden"
        mb="7"
      >
        <Flex align="center" justify="space-between" px="6" py="4" borderBottom="1px solid" borderColor="#F0EBE0">
          <Heading fontSize="md" fontWeight="700">Commitment details</Heading>
          {!isAdmin && (
            <HStack spacing="2" fontSize="xs" fontWeight="600" color="#8A6A2E" bg="#F8EFD9" border="1px solid" borderColor="#ECDCB5" px="2.5" py="1.5" borderRadius="md">
              <Box as={FiLock} boxSize="3.5" />
              <Text>Locked to your team</Text>
            </HStack>
          )}
        </Flex>

        <Box p="6">
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap="5">
            <GridItem>
              <FormControl>
                <FormLabel>Team Number</FormLabel>
                <Select placeholder="None" isDisabled={!isAdmin} {...register("team", { required: true })}>
                  {teams.map((team) => (
                    <option key={`team-opt-${team.id}`} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Member Name</FormLabel>
                <Select placeholder="None" {...register("member", { required: true })}>
                  {members.map((member) => (
                    <option key={`member-opt-${member.id}`} value={member.id}>
                      {`${member.first_name} ${member.last_name}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Meeting Date</FormLabel>
                <Select placeholder="None" {...register("meeting", { required: true })}>
                  {meetings.map((meeting) => (
                    <option key={`meeting-opt-${meeting.id}`} value={meeting.id}>
                      {`${meeting.date}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Pre-Commit Date</FormLabel>
                <Input type="date" {...register("date", { required: true })} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel>Commitment Amount</FormLabel>
                <Controller
                  control={control}
                  name="commitmentAmount"
                  render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
                    return (
                      <NumberInput
                        precision={2}
                        onChange={(s) => {
                          onChange(parse(s));
                        }}
                        isInvalid={error}
                        pattern={"\\$ [0-9]*(.[0-9]+)?"}
                        onBlur={onBlur}
                        value={format(value)}
                        name="commitmentAmount"
                      >
                        <NumberInputField id="commitmentAmount" ref={ref} fontSize="lg" />
                      </NumberInput>
                    );
                  }}
                />
              </FormControl>
            </GridItem>
          </Grid>

          {/* footer actions */}
          <Flex
            align={{ base: "stretch", md: "center" }}
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            gap="3"
            mt="6"
            pt="5"
            borderTop="1px solid"
            borderColor="#F0EBE0"
          >
            <HStack spacing="2" color="sand.500" fontSize="sm">
              <Box as={FiInfo} boxSize="3.5" />
              <Text>Commitments can be revised until the meeting date closes.</Text>
            </HStack>
            <HStack spacing="3" justify={{ base: "flex-end", md: "initial" }}>
              <Button variant="outline" type="button">Save draft</Button>
              <Button type="submit" rightIcon={<FiArrowRight />}>
                Submit commitment
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* recent entries */}
      <Box bg="white" border="1px solid" borderColor="sand.200" borderRadius="2xl" boxShadow="0 1px 2px rgba(40,34,24,.04)" overflow="hidden">
        <Flex align="center" justify="space-between" px="6" py="4" borderBottom="1px solid" borderColor="#F0EBE0">
          <Box>
            <Heading fontSize="md" fontWeight="700">Recent entries</Heading>
            <Text fontSize="13px" color="sand.500" mt="0.5">
              {isAdmin ? "All teams" : "Team 07 only"} · Spring Cycle 2026
            </Text>
          </Box>
        </Flex>

        <Box overflowX="auto">
          <Table variant="unstyled" size="md" sx={{ "td, th": { px: "6" } }}>
            <Thead bg="#FAF8F2">
              <Tr>
                <Th color="sand.500" fontSize="11px" letterSpacing="0.06em">Team</Th>
                <Th color="sand.500" fontSize="11px" letterSpacing="0.06em">Member</Th>
                <Th color="sand.500" fontSize="11px" letterSpacing="0.06em">Meeting Date</Th>
                <Th color="sand.500" fontSize="11px" letterSpacing="0.06em" isNumeric>Amount</Th>
                <Th color="sand.500" fontSize="11px" letterSpacing="0.06em" isNumeric>Submitted</Th>
                <Th color="sand.500" fontSize="11px" letterSpacing="0.06em" isNumeric>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {SAMPLE_RECENT.map((e) => (
                <Tr key={e.id} borderTop="1px solid" borderColor="#F4F0E7">
                  <Td fontWeight="600" color="brand.700">{e.team}</Td>
                  <Td>
                    <HStack spacing="2.5">
                      <Avatar size="xs" name={e.member} bg="brand.50" color="brand.700" />
                      <Text>{e.member}</Text>
                    </HStack>
                  </Td>
                  <Td color="sand.600">{e.meeting}</Td>
                  <Td isNumeric fontFamily="heading" fontWeight="700" color="#23211C">{usd(e.amount)}</Td>
                  <Td isNumeric color="sand.500" fontSize="sm">{e.submitted}</Td>
                  <Td isNumeric><StatusBadge status={e.status} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex align="center" justify="space-between" px="6" py="3.5" bg="#FAF8F2">
          <Text fontSize="sm" color="sand.500">{SAMPLE_RECENT.length} entries</Text>
          <Text fontSize="sm" color="sand.700">
            Total committed&nbsp;&nbsp;
            <Box as="span" fontFamily="heading" fontWeight="700" fontSize="md" color="#23211C">
              {usd(recentTotal)}
            </Box>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
