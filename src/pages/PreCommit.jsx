import { Box, Text, Grid, Input, Flex, Button, NumberInput, NumberInputField} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";


export default function PreCommit () {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const format = (val) => `$` + val
  const parse = (val) => val.replace(/^\$/,'')
  


  return (
    <Box>
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
          <Input
            isInvalid={errors.teamNumber}
            id="teamNumber"
            placeholder="Team Number"
            {...register("teamNumber", { required: true })}
          />
        </Box>
        <Box>
          <Text pl="2" color="gray.800"> Member Name </Text>
          <Input
            isInvalid={errors.teamNumber}
            id="member"
            placeholder="Member Name"
            {...register("member", { required: true })}
          />
        </Box>
        <Box>
          <Text pl="2" color="gray.800"> Meeting Date </Text>
          <Input
            isInvalid={errors.meeting}
            id="meeting"
            placeholder="MM/DD/YYYY"
            {...register("meeting", { required: true })}
          />
        </Box>
        <Box>
          <Text pl="2" color="gray.800"> Date </Text>
          <Input
            isInvalid={errors.date}
            id="date"
            placeholder="MM/DD/YYYY"
            {...register("date", { required: true })}
          />
        </Box>
        <Box>
          <Text pl="2" color="gray.800"> Commitment Amount </Text>
          <NumberInput
            isInvalid={errors.commitmentAmount}
            id="commitmentAmount"
            defaultValue={0}
            {...register("registeredCommitment", { required: true, onChange:(e)=>{console.log(e);parse(e)}})}
          >
          <NumberInputField />
          </NumberInput>
        </Box>
        <Box>
          <Text pl="2" color="gray.800"> Commitment Type </Text>
          <Input
            isInvalid={errors.commitmentType}
            id="commitmentType"
            placeholder="MM/DD/YYYY"
            {...register("commitmentType", { required: true })}
          />
        </Box>
      </Grid>
      <Flex justifyContent="center" py="6">
        <Button onClick={handleSubmit}> Submit </Button>
      </Flex>
    </Box>
  )
}
