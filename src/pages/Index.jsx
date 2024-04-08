import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";

const API_URL = "https://backengine-6i5w.fly.dev";

const Index = () => {
  const [name, setName] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/employees/${name}`);
      const data = await response.json();
      setEmployeeInfo(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch employee information.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading as="h1" mb={8}>
        Employee Information
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Employee Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter employee name" required />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Query
          </Button>
        </Stack>
      </form>

      {employeeInfo && (
        <Box mt={8}>
          <Heading as="h2" size="md" mb={4}>
            Employee Details
          </Heading>
          <Text>
            <strong>Name:</strong> {employeeInfo.name}
          </Text>
          <Text>
            <strong>Position:</strong> {employeeInfo.position}
          </Text>
          <Text>
            <strong>Department:</strong> {employeeInfo.department}
          </Text>
          <Text>
            <strong>Email:</strong> {employeeInfo.email}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
