import React from "react";
import { Image, Box } from "@chakra-ui/core";
const logoImageSrc = require("../assets/logo.png");

const Logo = () => {
  return (
    <Box>
      <Image src={logoImageSrc} />
    </Box>
  );
};

export default Logo;
