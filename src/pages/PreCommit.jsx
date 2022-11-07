import { Box, Text, Grid, Input, Flex, Button, NumberInput, NumberInputField, useToast, Select, Spinner} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import config from "../config"
import AuthorizationContext from "../context/AuthProvider";

export default function PreCommit () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({defaultValues: {
    commitmentAmount: "0",
  }});

  const { auth } = useContext(AuthorizationContext);
  const toast = useToast();
 
  // Get api data for form entry
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoadingTeams(true);
        const teamsRes = await axios.get(
          `${config.apiUrl}/api/teams`,
          { headers: { "Authorization": auth.rawJWT } }
        );
        setTeams(teamsRes.data);
      }
      catch (err) {
        toast({ title: "Failed Getting Teams", status: "error", description: err })
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
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  useEffect(() => {
    const getMembers = async () => {
      try {
        setLoadingMembers(true);
        const membersRes = await axios.get(
          `${config.apiUrl}/api/members`,
          { headers: { "Authorization": auth.rawJWT } }
        );
        setMembers(membersRes.data);
      }
      catch (err) {
        toast({ title: "Failed Getting Members", status: "error", description: err  })
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
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  useEffect(() => {
    const getMeetings = async () => {
      try {
        setLoadingMeetings(true);
        const meetingsRes = await axios.get(
          `${config.apiUrl}/api/meetings`,
          { headers: { "Authorization": auth.rawJWT } }
        );
        setMeetings(meetingsRes.data);
      }
      catch (err) {
        toast({ title: "Failed Getting Meetings", status: "error", description: err  })
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

  const format = (val) => `$ ` + val
  const parse = (val) => val.replace(/^\$ /,'')

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await axios.post(
        `${config.apiUrl}/api/precommit`,
        {
          teamId: parseInt(data.team),
          memberId: parseInt(data.member),
          meetingId: parseInt(data.meeting_id),
          orderDate: data.date,
          amount: parseFloat(data.amount),
          commitmentType: data.commitmentType
        },
        {
          headers: {"Authorization": auth.rawJWT},
        }
      )
      toast({ title: `Successfully submitted precommit entry ${res.data.id}`, status: "success", position: "top-right" })
    }
    catch (err) {
      toast({ title: "Problem Submitting Entry", status: "error", description: err, position: "top-right" });
      console.error(err);
    }
    finally {
      setSubmitting(false)
    }
  };
 
  return ( loadingTeams || loadingMembers || loadingMeetings || submitting ? 
    <Flex justify="center" h="100vh" alignItems="center"><Spinner size="xl"/></Flex> :
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text py="4" fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" >
          Create Precommitment Entry
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap="3"
        >
          <Box>
            <Text pl="2" color="gray.800"> Team Number </Text>
            <Select placeholder='None' {...register("team", { required: true })}>
              { teams.map((team) => 
                <option key={`team-opt-${team.id}`} value={team.id}>{team.name} </option>
              )}
            </Select>
          </Box>
          <Box>
            <Text pl="2" color="gray.800"> Member Name </Text>
            <Select placeholder='None' {...register("member", { required: true })}>
              { members.map((member) => 
                <option key={`member-opt-${member.id}`} value={member.id}>
                  {`${member.first_name} ${member.last_name}`}
                </option>
              )}
            </Select>
          </Box>
          <Box>
            <Text pl="2" color="gray.800"> Meeting Date </Text>
            <Select placeholder='None' {...register("meeting", { required: true })}>
              { meetings.map((meeting) => 
                <option key={`meeting-opt-${meeting.id}`} value={meeting.id}>
                  {`${meeting.date}`}
                </option>
              )}
            </Select>
          </Box>
          <Box>
            <Text pl="2" color="gray.800"> Precommit Date </Text>
            <Input type="date" {...register("date", { required: true })} />
          </Box>
          <Box>
            <Text pl="2" color="gray.800"> Commitment Amount </Text>
            <Controller
              control={control}
              name="commitmentAmount"
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: {error}
              }) => {
                return (
                  <NumberInput
                    precision={2}
                    onChange={(s) => {
                      console.log(s);
                      onChange(parse(s));
                    }}
                    isInvalid={error}
                    pattern={"\\$ [0-9]*(.[0-9]+)?"}
                    onBlur={onBlur}
                    value={format(value)}
                    
                    name="commitmentAmount"
                  >
                    <NumberInputField id="commitmentAmount" ref={ref}/>
                  </NumberInput>
              )}}
            />
          </Box>
          <Box>
            <Text pl="2" color="gray.800"> Commitment Type </Text>
            <Input
              isInvalid={errors.commitmentType}
              id="commitmentType"
              placeholder="Pack of Bacon"
              {...register("commitmentType", { required: true })}
            />
          </Box>
        </Grid>
        <Flex justifyContent="center" py="6">
          <Button type="submit"> Submit </Button>
        </Flex>
      </form>
    </Box>
  )
}
