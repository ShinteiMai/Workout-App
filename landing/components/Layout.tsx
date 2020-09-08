import React, { ReactNode } from 'react'
import { default as NextLink } from 'next/link';
import { Link, Box } from "@chakra-ui/core";
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <Box>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box py={4} px={16}>
      <Box my={5}>
        <NextLink href="/">
          <Link mx={4}>Home</Link>
        </NextLink>
        <NextLink href="/about">
          <Link mx={4}>About</Link>
        </NextLink>
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  </Box>
)

export default Layout
