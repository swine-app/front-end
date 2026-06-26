// import { useRef, useState, useEffect, useContext } from "react";
// import AuthContext from "./context/AuthProvider";
// import axios from "axios";
import { Box, Button, Divider, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../components/navigationControls/SwineAuctionLogo.jpg";

const Login = () => {
  const { auth, login, demoLogin } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ loginSuccess, setLoginSuccess ] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && loginSuccess) {
      setLoginSuccess(false)
      navigate("/precommit")
    }
  }, [loginSuccess, auth, navigate])

  const onSubmit = async (data) => {
    try {
      await login(data.userName, data.password);
      toast({ 
        title: "Login Successful",
        description: `Logged in as ${data.userName}`,
        status: "success",
        position: "top-right",
        isClosable: true
      })
      setLoginSuccess(true);
    }
    catch (err) {
      console.error(err);
      toast({
        title: "Login Failed",
        description: `No account for ${data.userName}`,
        status: 'error',
        position: 'top-right',
        isClosable: true
      })
    }
  }

  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center" >
      <form onSubmit={handleSubmit(onSubmit)} >
          <Flex
            w={{md: "2xl", sm: "96", base: "72"}}
            border="1px"
            rounded="lg"
            shadow="2xl"
            p="4"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap="2"
          >
            <Image src={logo} alt="Swine Auction Committee" boxSize="80px" objectFit="contain" mb="1" />
            <Text fontSize="4xl" fontWeight="bold" pb="3">
              Swine Auction Committee
            </Text>

            <Box py="2">
              <Input isInvalid={errors.userName} id="userName" placeholder="User Name" w="56" {...register("userName", { required: true })}/>
            </Box>
            <Box py="2">
              <Input isInvalid={errors.password} id="password" placeholder="Password" w="56" type="password" {...register("password", { required: true })}/>
            </Box>
            <Box color="red">
              {Object.entries(errors).reduce(
                (accum, [key, value]) => 
                  value.type === "required" ? `${accum} ${key} is required` : accum,
                ""
                )}
            </Box>
            <Button mt="2" type="submit">
              Login
            </Button>
            <Divider my="2" />
            <Button variant="outline" w="full" onClick={() => { demoLogin(); navigate("/precommit"); }}>
              Try Demo
            </Button>
          </Flex>
      </form>
    </Flex>
  );
};

export default Login;
