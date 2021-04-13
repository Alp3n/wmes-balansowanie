import React, { useState } from 'react';
import { TextInput, Form, Text, Button, /* CheckBox, */ Box } from 'grommet';
import Layout from '../components/Layout.js';

import strings from '../utils/strings.json';
import { useHistory } from 'react-router-dom';

import { URL_LOGIN, HEADERS } from '../utils/consts';

const {
  LOGIN_title,
  LOGIN_userName,
  LOGIN_password,
  LOGIN_userNamePlaceholder,
  LOGIN_passwordPlaceholder,
  // LOGIN_remember,
  LOGIN_login,
} = strings.loginPage;

// POST request to API for login
async function loginUser(credentials) {
  return fetch(URL_LOGIN, {
    method: 'POST',
    headers: HEADERS,
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = () => {
  // const [remember, setRemember] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  let history = useHistory();

  // Function handling login
  const handleLogin = async () => {
    await loginUser({
      login: userName,
      password,
    }).then((data) => {
      if (data.error) {
        return alert(data.error.message);
      } else if (data.loggedIn) {
        history.replace('/lines');
      }
    });
  };

  // TODO setup cookie read but its not working with CORS policy
  // useEffect(() => {
  //   let match = document.cookie.match('wmes.sid');
  //   if (match) {
  //     history.push('/lines');
  //   }
  //   console.log(match);
  // }, [history]);

  return (
    <Layout firstPage='true' pageName={LOGIN_title}>
      <Box justify='center' height='medium'>
        <Form onSubmit={handleLogin}>
          <Box
            pad='medium'
            gap='medium'
            background='white'
            border={{ side: 'horizontal', color: 'light-4' }}
          >
            <Box>
              <Text margin='xsmall'>{LOGIN_userName}</Text>
              <TextInput
                type='text'
                placeholder={LOGIN_userNamePlaceholder}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Box>
            <Box>
              <Text margin='xsmall'>{LOGIN_password}</Text>
              <TextInput
                type='password'
                placeholder={LOGIN_passwordPlaceholder}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                id='current-password'
              />
            </Box>
            {/* <CheckBox
              label={LOGIN_remember}
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            /> */}
            <Button
              primary
              label={LOGIN_login}
              fill='horizontal'
              size='large'
              margin={{ top: 'small', bottom: 'small' }}
              type='submit'
              style={{ border: 'none' }}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  );
};

export default Login;
