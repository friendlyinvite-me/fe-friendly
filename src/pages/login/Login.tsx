import { Nav, } from '../../components';
import { useAuth, } from '../../hooks/use-auth';
import { Navigate, } from 'react-router-dom';
import React, { useContext, } from 'react';
import { UserContext, } from '../../contexts/auth-context';
import { Text, } from '../../components';
import { styled, } from '../../styles';
import { Card, } from '../../components';

export const Login: React.FC = () => {
  const { logInWithGoogle, } = useAuth();
  const {user,} = useContext(UserContext,);  

  if (user) {
    return <Navigate to='/dashboard' />;
  }
  
  return (
    <Card>
      <LoginWrapper>
        <Text typography='h4' color='$contentPrimary'>Welcome</Text>
        <Text typography='h1' color='$contentPrimary'>Please log in</Text>
        <LoginWithGoogleWrapper onClick={logInWithGoogle}>
          <Text typography='h4' color='$contentPrimary'>Log in with Google</Text>
        </LoginWithGoogleWrapper>
      </LoginWrapper>
    </Card>
  );
};

const LoginWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$4',
  flex: 1,
},);

const LoginWithGoogleWrapper = styled('button', {
  backgroundColor: '$gray100',
  color: '$contentPrimary',
  paddingInline: '$6',
  paddingBlock: '$4',
  textAlign: 'center',
  width: '250px',
  borderRadius: '4px',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',

  '&:hover': {
    color: 'DimGray',
  },
},);