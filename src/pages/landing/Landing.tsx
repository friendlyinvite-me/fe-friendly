import React, { useState } from 'react';
import { Button, Card, Text, TextInput } from '../../components';
import { Logo } from '../../components/Logo';
import { useWindowSize } from '../../hooks/use-window-resize';
import { styled } from '../../styles';

export const Landing: React.FC = () => {
  const [email, setEmail] = useState("");

  const {width} = useWindowSize();
  return (
    <Card>
      <LandingWrapper>
        <Logo iconOnly={false} color={['#E9E70D', 'black']} height={width < 600 ? 40: 70} />
        <Text typography='h1' color='$contentPrimary'>Collaboration tool for your upcoming events</Text>
        <Text typography='h4' color='$contentSecondary'>Take the stress out of event planning with your friends and family. Diss the infinite scrolling and back-and-forth communication between different availabilities and preferences.</Text>
        <Text typography='h4' color='$contentSecondary'>Friendly provides an intuitive and centralized experience for you and your friends to plan your upcoming events, from planning a Saturday brunch, a big game day, your next Europe trip and much more.</Text>
        <Text typography='h4' color='$contentSecondary'>We are working hard on building Friendly from the ground up. If you are interested in staying in the know, let us know in the email! We will share monthly updates and give you early access when Friendly is ready!</Text>

        <TextInput size='medium' placeholder='hello@friend.com' value={email} onChange={setEmail} />
        <Button size='large' sentiment='primary'>Keep me posted!</Button>

      </LandingWrapper>
    </Card>
  );
};

const LandingWrapper = styled('div', {
  paddingBlock: '$3',
  paddingInline: '$3',
  alignItems: 'start',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  '@md': {
    paddingBlock: '$5',
    paddingInline: '$5',
  },

  '@lg': {
    paddingBlock: '$10',
    paddingInline: '$10',
  },
});