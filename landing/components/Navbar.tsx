import React from "react";
import { default as NextLink } from "next/link";
import { Link, Box } from "@chakra-ui/core";

const Navbar = () => {
  return (
    <Box
      display="flex"
      width="40%"
      justifyContent="space-between"
      fontSize={20}
    >
      <NextLink href="/">
        <Link>Home</Link>
      </NextLink>
      <NextLink href="/services">
        <Link>Services</Link>
      </NextLink>
      <NextLink href="/contact-us">
        <Link>Contact Us</Link>
      </NextLink>
    </Box>
  );
};

export default Navbar;
