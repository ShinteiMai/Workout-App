import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/core";
import Head from "next/head";
import Navbar from "./Navbar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Box>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box paddingX={16}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={8}
        fontSize={24}
      >
        <Box>Temporary logo</Box>
        <Navbar />
      </Box>
      <Box>{children}</Box>
    </Box>
  </Box>
);

export default Layout;
