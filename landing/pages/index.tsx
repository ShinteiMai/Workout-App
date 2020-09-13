import Layout from '../components/Layout';
import { Heading, Text, Box } from "@chakra-ui/core";

const IndexPage = () => (
  <Layout title="Stronk">
    <Box mx={4} my={24}>
      <Heading fontSize="6xl">Stronk</Heading>
      <Text fontSize="4xl" fontWeight={500}>Become a Chad</Text>
    </Box>
  </Layout>
)

export default IndexPage
