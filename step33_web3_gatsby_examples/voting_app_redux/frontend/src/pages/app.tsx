import React from "react"
import { Election } from "../modules/Election"
import { Router as MyRouter } from "@reach/router"

const Router = () => {
  return (
    <MyRouter>
      <Election path="/app/election" />
    </MyRouter>
  )
}

export default Router
