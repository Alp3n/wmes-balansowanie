import React, { useState, useEffect } from 'react';
import { TextInput, Form, Text, Button, CheckBox, Box } from 'grommet';
import Layout from '../components/layout/Layout.js';

import strings from '../data/strings.json';
import { Redirect, Link } from 'react-router-dom';

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
    <Layout firstPage='true' pageName={appTittle}>
      <Box margin='small'>
        <Form onSubmit={handleLogin}>
          <Box pad='medium' gap='medium'>
            <Box>
              <Text margin='xsmall'>{email}</Text>
              <Box border round='small' onClick={() => {}}>
                <TextInput plain type='email' placeholder={emailPlaceholder} />
              </Box>
            </Box>
            <Box>
              <Text margin='xsmall'>{password}</Text>
              <Box border round='small' onClick={() => {}}>
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
            <Link to='/lines'>
              <Button
                primary
                label={login}
                fill='horizontal'
                size='large'
                margin={{ top: 'small' }}
                type='submit'
                style={{ border: 'none' }}
              />
            </Link>
          </Box>
        </Form>
      </Box>
    </Layout>
  );
};

export default Login;
