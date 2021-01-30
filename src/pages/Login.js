import React, { useState, useEffect } from 'react';
import { TextInput, Form, Text, Button, CheckBox, Box, Heading } from 'grommet';

import strings from '../data/strings.json';
import { Redirect } from 'react-router-dom';

// const strings = JSON.parse(stringsJson);
const {
  appTittle,
  email,
  password,
  emailPlaceholder,
  passwordPlaceholder,
  remember,
  login,
} = strings.loginPage;

// async function loginUser() {
//   setAuth(!isAuth);
//   if (isAuth) {
//     <Redirect to='/line' />;
//   }
//   console.log(isAuth);
// };

const Login = ({ isAuth, setAuth }) => {
  const handleLogin = async (e) => {
    setAuth(true);
    console.log(isAuth);
    <Redirect to='/line' />;
  };

  const [checked, setChecked] = useState(false);
  return (
    <Box>
      <Box elevation='medium' background='brand'>
        <Heading level='2' margin='medium' alignSelf='center'>
          {appTittle}
        </Heading>
      </Box>
      <Box margin='small'>
        <Form onSubmit={handleLogin}>
          <Box pad='medium' gap='medium'>
            <Box>
              <Text margin='xsmall'>{email}</Text>
              <Box border round='small'>
                <TextInput plain type='email' placeholder={emailPlaceholder} />
              </Box>
            </Box>
            <Box>
              <Text margin='xsmall'>{password}</Text>
              <Box border round='small'>
                <TextInput
                  plain
                  type='password'
                  placeholder={passwordPlaceholder}
                />
              </Box>
            </Box>
            <CheckBox
              label={remember}
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
            <Button
              primary
              label={login}
              fill='horizontal'
              size='large'
              margin={{ top: 'small' }}
              type='submit'
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default Login;
