import React from "react";
import { useNavigate } from "react-router-dom";
import books from "../books/books";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Divider,
  Image,
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";

function Home() {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate("/main");
  };

  return (
    <Flex justifyContent="center" alignItems="center" flexWrap="wrap" p={4}>
      {books.map((book) => (
        <Card
          key={book.id}
          maxW="sm"
          w="250px" // Adjust the width of the card
          m={2}
          p={2} // Reduce padding for smaller cards
          borderRadius="lg"
          boxShadow="md"
        >
          <CardBody>
            <Image src={book.image} alt={book.title} borderRadius="lg" />
            <Stack mt="3" spacing="2">
              <Heading size="sm">{book.title}</Heading>{" "}
              {/* Use a smaller heading size */}
              <Text fontSize="xs" color="gray.600">
                {" "}
                {/* Use smaller font size */}
                By {book.author}
              </Text>
              <Text color="blue.600" fontSize="sm" fontWeight="bold">
                ${book.price.toFixed(2)}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup justifyContent="center">
              <Button
                onClick={handleBuyClick}
                variant="solid"
                colorScheme="blue"
                size="sm" // Use a smaller button size
              >
                Buy now
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Flex>
  );
}

export default Home;
