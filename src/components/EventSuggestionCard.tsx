import { styled } from '../styles';
import { Text } from './Text';
import moment from 'moment';
import React, { ReactNode, useContext, useMemo } from 'react';
import { Button } from './Button';
import { FriendlyEventSuggestion, FriendlyUser, Location } from '../utils/types';
import { UserContext } from '../contexts/auth-context';
import { FlexWrapper } from './FlexWrapper';

interface Props {
  data: {
    createdAt?: string;
    title: string;
    id: string;
    upvotes: string[];
    downvotes: string[];
    userId?: string;
    user?: FriendlyUser;
  };
  onUpvote?: () => void;
  onDownvote?: () => void;
  onUndoVote?: () => void;
}

export const EventSuggestionCard: React.FC<Props> = (props: Props) => {
  const { data } = props;

  const { createdAt, title, id, upvotes, downvotes, user: eventCreator } = data;

  const {user} = useContext(UserContext); 

  const upvotedByUser = useMemo(() => {
    if (!user) return false;
    return upvotes.includes(user.id);
  }, [upvotes, user]);

  const downvotedByUser = useMemo(() => {
    if (!user) return false;
    return downvotes.includes(user.id);
  }, [downvotes, user]);

  const isUserNewSuggestion = createdAt == null;
  const isUserPreviousSuggestion = data.userId === user?.id;

  return (
    <EventDateTimeCardWrapper id={id}>
      <RowWrapper>
        <Text typography='h3'>{title}</Text>
      </RowWrapper>
      
      {
        isUserNewSuggestion && <RowWrapper>Draft - you are suggesting</RowWrapper>
      }
      {
        !isUserNewSuggestion && (
          <RowWrapper>
            <RowWrapper>
              <div>{ upvotes.length} upvotes</div>
              <div>{ downvotes.length} downvotes</div>
              {/* <div>{ counts.comments} comments</div> */}
            </RowWrapper>
            { isUserNewSuggestion || isUserPreviousSuggestion ? <></> :
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
            }
          </RowWrapper>
        )
      }
      {eventCreator && (
        <RowWrapper>
          {
            isUserPreviousSuggestion ? (
              <Text typography='p' color='contentTertiary'>You created {moment(createdAt).fromNow()}</Text>
            ) : (
              <Text typography='p' color='contentTertiary'>Created by {eventCreator.name} {moment(createdAt).fromNow()}</Text>
            )
          }
        </RowWrapper>
      )}
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