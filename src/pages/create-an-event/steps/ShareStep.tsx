import React, { useState } from 'react';
import { Button, Text, TextInput } from '../../../components';
import { styled } from '../../../styles';
import { FriendlyEventData } from '../../../utils/types';
import {CopyToClipboard} from 'react-copy-to-clipboard';
interface Props {
  eventInfo: FriendlyEventData;
}

export const ShareStep: React.FC<Props> = ({eventInfo}: Props) => {
  const url = `${window.location.origin}/events/${eventInfo.id}`;
  const [copied, setCopied] = useState(false);
  return (
    <Wrapper>
      <Text typography='h3' color='$contentPrimary'>Event Link</Text>
      <TextInput value={url} readOnly></TextInput>
      <CopyToClipboard text={url} onCopy={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}>
        <Button size='medium' disabled={copied} sentiment='primary' >
          {
            copied ? 'Copied' : 'Copy link to clipboard'
          }
        </Button>
      </CopyToClipboard>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'start',
  width: '100%',
});