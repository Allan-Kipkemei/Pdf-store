import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios"; // Don't forget to import axios

export const Main = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [amountError, setAmountError] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setAmountError("");
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneError("");
  };
  const handleChangeName=(event)=>{
    setName(event.target.value);


  }
  const handlePayClick = () => {
    if (phoneNumber.length !== 12 || amount === "") {
      setPhoneError("Phone must be exactly 12 characters");
      setAmountError("Amount must not be empty");
      return;
    } else {
      setPhoneError("");
      setAmountError("");
    }

    // Make a POST request to save user data
    axios.post('http://localhost:8000/UserData', {
      name,
      phoneNumber,
      amount,
    })
      .then((response) => {
        console.log(response.data);

        // After saving the user data, initiate the GET request to /stkpush
        initiateStkPush();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Function to initiate the GET request
  const initiateStkPush = () => {
    axios.get(`http://localhost:8000/stkpush?phone=${phoneNumber}&amount=${amount}`)
      .then((response) => {
        console.log(response.data);
        // Handle the response from /stkpush as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle the error from /stkpush as needed
      });
  };

  return (
    <Container maxW="xs" py="4">
      <Stack spacing="2">
        <Heading size="sm" textAlign="center">
          Enter phone number and amount for STK push
        </Heading>
        <Box bg="bg.surface" boxShadow="md" borderRadius="md" p="2">
          <Stack spacing="2">
            <FormControl>
              <FormLabel htmlFor="name">Enter your name </FormLabel>
              <Input
                id="name"
                type="tel"
                value={name}
                onChange={handleChangeName}
              />
            </FormControl>
            <FormControl isInvalid={phoneError !== ""}>
              <FormLabel htmlFor="phone">Mpesa Phone Number</FormLabel>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              {phoneError && <Text color="red">{phoneError}</Text>}
            </FormControl>
            <FormControl isInvalid={phoneError !== ""}>
              <FormLabel htmlFor="phone">WhatsApp Phone Number</FormLabel>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              {phoneError && <Text color="red">{phoneError}</Text>}
            </FormControl>
            <FormControl isInvalid={amountError !== ""}>
              <FormLabel htmlFor="whatsappPhone">Amount</FormLabel>
              <Input
                id="whatsappPhone"
                type="tel"
                value={amount}
                onChange={handleAmountChange}
              />
              {amountError && <Text color="red">{amountError}</Text>}
            </FormControl>
            <Button onClick={handlePayClick} size="xs" alignSelf="center">
              Pay {amount ? `$${amount}` : ""}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
