import React from 'react';
import './AppLogin.css';
import { Card, FormControl, InputLabel, Input, Button } from '@material-ui/core';

function AppLogin() {
  return (
    <Card style={{padding: 20, marginTop: 20, width: '50%', display: 'inline-block'}}>
      <form style={{display : 'flex', flexDirection: 'column'}}>
        <FormControl>
          <InputLabel>Email address</InputLabel>
          <Input id="email" />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input id="password" type="password"/>
        </FormControl>
        <Button style={{marginTop: 20}} color="primary">Login</Button>
      </form>
    </Card>
  )
}

export default AppLogin;