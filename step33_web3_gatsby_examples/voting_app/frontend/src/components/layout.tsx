import React from "react"
import { Normalize } from "styled-normalize"
import styled from "styled-components"

import GlobalStyles from "./global-styles"
import Footer from "./footer"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  position: relative;
`

const Layout = ({ children }: LayoutProps) => (
  <AppContainer>
    <Normalize />
    <GlobalStyles />

    <Main>{children}</Main>

    <Footer />
  </AppContainer>
)

interface LayoutProps {
  children: React.ReactNode
}

export default Layout
