import { styled } from '../styles';
import { Text } from './Text';
import moment from 'moment';
import React, { useContext, useMemo } from 'react';
import { Button } from './Button';
import { FriendlyEventSuggestion, Location } from '../utils/types';
import { UserContext } from '../contexts/auth-context';

interface Props {
  data: FriendlyEventSuggestion;
  onUpvote: () => void;
  onDownvote: () => void;
  onUndoVote: () => void;
}

export const EventSuggestionCard: React.FC<Props> = (props: Props) => {
  const { data } = props;

  const { createdAt, value, id, upvotes, downvotes } = data;

  const {user} = useContext(UserContext); 

  const upvotedByUser = useMemo(() => {
    if (!user) return false;
    return upvotes.includes(user.id);
  }, [upvotes, user]);

  const downvotedByUser = useMemo(() => {
    if (!user) return false;
    return downvotes.includes(user.id);
  }, [downvotes, user]);

  return (
    <EventDateTimeCardWrapper id={id}>
      <RowWrapper>
        <Text typography='h3'>{
          data.type === 'datetime' ? moment(value as string).format('Do MMM y   h:mm a') : (value as Location).name
        }</Text>
        <Text typography='p' color='contentTertiary'>{moment(createdAt).fromNow()}</Text>
      </RowWrapper>
      <RowWrapper>
        <RowWrapper>
          <div>{ upvotes.length} upvotes</div>
          <div>{ downvotes.length} downvotes</div>
          {/* <div>{ counts.comments} comments</div> */}
        </RowWrapper>
        <>
          {
            upvotedByUser || downvotedByUser ? (
              <RowWrapper>
                <Button size='small' sentiment='primary'>{upvotedByUser ? 'Liked' : 'Disliked'}</Button>
                <Button onClick={props.onUndoVote} size='small' sentiment='secondary'>Undo</Button>
              </RowWrapper>
            ) : (
              <RowWrapper>
                <Button onClick={props.onUpvote} disabled={upvotedByUser} size='small' sentiment='primary'>Like</Button>
                <Button onClick={props.onDownvote} disabled={downvotedByUser} size='small' sentiment='secondary'>Dislike</Button>
              </RowWrapper>
            )
          }
        </>
      </RowWrapper>
    </EventDateTimeCardWrapper>
  );
};

const EventDateTimeCardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const RowWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$2',
});