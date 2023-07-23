import React from 'react';

import {Typography, Button, Card} from '@mui/material';
import "./App.css";
import {
  RecoilRoot, 
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

function Counter() {
    console.count("Counter");
    return (

      <RecoilRoot>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Card style={{padding:20, width: 500}}>
              <Typography textAlign="center" variant="h5">Counter Game</Typography>
              <br />
              <Buttons />
              <CountComponent />
          </Card>
        </div>
      </RecoilRoot>
    );
}

function Buttons() {
  console.count("Buttons");
  return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          <Increase />
          <Decrease />
      </div>
  )
}

function Increase() {
  console.count("Increase");
  const setCount = useSetRecoilState(countState);
  return (
    <div>
      <Button variant="contained" onClick={() => setCount(count => (count+1))}>Increase</Button>
    </div>
  )
}

function Decrease() {
  console.count("Decrease");
  const setCount = useSetRecoilState(countState);
  return ( 
    <div>
      <Button variant="contained" onClick={() => setCount(count => (count-1))}>Decrease</Button>
    </div>
  );
}

function CountComponent() {
  console.count("CountComponent");
  const count = useRecoilValue(countState);
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Typography variant="h6">Count: {count}</Typography>
    </div>
  )
}

export default Counter;

const countState = atom({
  key: "countState",
  default: 0
})
