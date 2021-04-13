import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import TextField from '../text field/TextField';
import Dropdown from '../dropdown/Dropdown';
import Form from '../form/Form';
import { FormGroup } from '../form/Style';
interface RegisterProps {
  history: {
    push: (arg0: string) => void;
  };
}

interface roleInterface {
  id: number;
  title: string;
  value: string;
}

const Register = ({ history }: RegisterProps) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [userRole, setUserRole] = useState<roleInterface[]>([]);
  const [open, setOpen] = useState<string>('');
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
    password: string;
    password2: string;
  }>({
    name: '',
    email: '',
    role: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    // isAuthenticated && history.push('/');

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  useEffect(() => {
    console.log(userRole);
    if (userRole.length === 1) {
      setUser({ ...user, role: userRole[0].value });
    }
  }, [userRole]);

  const { name, email, role, password, password2 } = user;

  const onChange = (e: { target: { name: string; value: string } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      role === '' ||
      password === '' ||
      password2 === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (password.length < 6 || password2.length < 6) {
      setAlert('Password must be at least 6 characters', 'danger');
    } else if (name === password || name === password2) {
      setAlert('Name and Password fields must not match', 'danger');
    } else {
      register({
        name,
        email,
        role,
        password,
      });
    }
  };

  const roleItems = [
    {
      id: 1,
      title: 'User',
      value: 'user',
    },
    {
      id: 2,
      title: 'Admin',
      value: 'admin',
    },
  ];

  const RegisterInputs = () => {
    return (
      <>
        <FormGroup>
          <TextField
            title='Name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
            standard
            medium
          />
        </FormGroup>
        <FormGroup>
          <TextField
            title='Email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
            standard
            medium
          />
        </FormGroup>
        <FormGroup>
          <Dropdown
            items={roleItems}
            title='Role'
            selection={userRole}
            setSelection={setUserRole}
            open={open}
            setOpen={setOpen}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            title='Password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength={6}
            standard
            medium
          />
        </FormGroup>
        <FormGroup>
          <TextField
            title='Confirm Password'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength={6}
            standard
            medium
          />
        </FormGroup>
      </>
    );
  };

  return (
    <Form
      title='Account Register'
      onSubmit={onSubmit}
      formInputs={RegisterInputs}
      confirm='Register'
    />
  );
};

export default Register;
