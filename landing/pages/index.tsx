import Layout from "../components/Layout";
import { Heading, Text, Box, Image } from "@chakra-ui/core";
// const illustration = require("../assets/illustration-1.jpg");

const IndexPage = () => (
  <Layout title="Stronk">
    <Box display="flex" my={24} justifyContent="space-between">
      <Box>
        <Heading fontSize="6xl">Become a chad</Heading>
        <Text>
          Join a fitness revolution that will change your mindset on living a
          healthy life and ascend to become a true chad.
        </Text>
      </Box>
      <Box>
        <Heading fontSize="6xl">Illustration</Heading>
        {/* <Image src={illustration} /> */}
      </Box>
    </Box>
  </Layout>
);

export default IndexPage;
