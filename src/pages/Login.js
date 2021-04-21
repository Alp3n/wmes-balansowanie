import React, { useState, useEffect } from 'react';
import { TextInput, Form, FormField, Button, CheckBox, Box } from 'grommet';
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
  LOGIN_remember,
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

const defaultValue = {
  username: localStorage.getItem('username')
    ? localStorage.getItem('username')
    : '',
  password: localStorage.getItem('password')
    ? localStorage.getItem('password')
    : '',
  remember: localStorage.getItem('remember') === 'true',
};

const Login = () => {
  const [remember, setRemember] = useState(defaultValue.remember);
  const [userName, setUserName] = useState(defaultValue.username);
  const [password, setPassword] = useState(defaultValue.password);

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

  useEffect(() => {
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

    if (remember) {
      localStorage.setItem('remember', true);
      handleLogin();
    } else if (!remember) {
      localStorage.setItem('username', userName);
      localStorage.setItem('password', password);
      localStorage.setItem('remember', false);
    }
  }, [password, userName, remember, history]);

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
            <FormField
              label={LOGIN_userName}
              name='username'
              contentProps={{ border: 'all', round: 'small' }}
            >
              <TextInput
                value={userName}
                name='username'
                type='text'
                placeholder={LOGIN_userNamePlaceholder}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormField>

            <FormField
              label={LOGIN_password}
              name='password'
              contentProps={{ border: 'all', round: 'small' }}
            >
              <TextInput
                name='password'
                value={password}
                type='password'
                placeholder={LOGIN_passwordPlaceholder}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>
            <FormField name='remember' contentProps={{ border: false }}>
              <CheckBox
                name='remember'
                label={LOGIN_remember}
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
            </FormField>
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
