import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Logo from "../components/logo"
import SEO from "../components/seo"

const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 100%;

  > div {
    max-width: 400px;
    text-align: center;
    padding: 20px;
  }

  a {
    display: block;
    max-width: 200px;
    margin: 0 auto;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <LogoContainer>
      <div>
        <Logo />
        <br />
        Welcome to Gatsby Election App
        <br />
        Let's go to caste your vote
        <br />
        <Link to="/app/election">Election Page</Link>
      
      </div>
    </LogoContainer>
  </Layout>
)

export default IndexPage
