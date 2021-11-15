import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/actions"
import React from "react";
import {
  Button,
  Container
} from "../styles/rest"

export default function Content() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
  	<Container>
      {count}
  		<br></br>
  		<Button onClick={() => dispatch(decrement())}>-</Button>
  		<Button onClick={() => dispatch(increment())}>+</Button>
  	</Container>
  );
}