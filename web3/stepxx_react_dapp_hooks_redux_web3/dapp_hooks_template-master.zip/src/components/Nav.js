import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../store/actions"
import React from "react";
import {
  Button,
  NavBar,
  NavLink,
  NavMenu,
  NavToggle,
} from "../styles/rest"

export default function Nav() {
  const account = useSelector(state => state.account);
  const balance = useSelector(state => state.balance);
  const network = useSelector(state => state.network);
  const dispatch = useDispatch();

  return (
    <NavBar>
      <NavMenu>
        <NavLink>React dApp template with Hooks&Redux&Web3</NavLink>
        <NavToggle onClick={() => dispatch(toggleTheme())}>Toggle theme</NavToggle>
      </NavMenu>
      {account
        ? <div>
            address: <u>{account.substring(0,6) + '...' + account.substring(38,42)}</u>&nbsp;
            network: <u>{network}</u>&nbsp;
            balance: <u>{balance} ETH</u>&nbsp;
          </div>
        : <Button onClick={() => window.ethereum.enable()}>Login</Button>
      }
    </NavBar>
  );
}