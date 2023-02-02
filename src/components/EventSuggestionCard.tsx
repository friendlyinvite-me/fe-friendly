import { styled } from '../styles';
import { Text } from './Text';
import moment from 'moment';
import React, { ReactNode, useContext, useMemo } from 'react';
import { Button } from './Button';
import { FriendlyEventSuggestion, FriendlyUser, Location, ProposalType } from '../utils/types';
import { UserContext } from '../contexts/auth-context';
import { FlexWrapper } from './FlexWrapper';
import { type } from 'os';
import { useLocationInfo } from '../hooks/use-location-info';
import { LocationInformation } from './LocationInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';

interface Props {
  data: {
    createdAt?: string;
    title: string;
    id: string;
    upvotes: string[];
    downvotes: string[];
    userId?: string;
    user?: FriendlyUser;
    reference?: string;
    thumbnail?: string;
  };
  type: ProposalType;
  onUpvote?: () => void;
  onDownvote?: () => void;
  onUndoVote?: () => void;
  onDelete?: () => void;
  readonly?: boolean;
}

export const EventSuggestionCard: React.FC<Props> = (props: Props) => {
  const { data, readonly } = props;

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

  const {
    locationInfo,
    isExpanded,
    setExpanded,
  } = useLocationInfo({name: title, reference: data.reference as string});


  return (
    <EventSuggestionCardWrapper id={id}>
      {
        data.thumbnail != null && (
          <SuggestionThumbnail alt={data.title} src={data.thumbnail}/>
        )
      }

      <RowWrapper>
        <Text typography='h3'>{title}</Text>
      </RowWrapper>
      
      
      {
        !isUserNewSuggestion && (
          <RowWrapper>
            <RowWrapper>
              <div>{ upvotes.length} upvotes</div>
              <div>{ downvotes.length} downvotes</div>
              {/* <div>{ counts.comments} comments</div> */}
            </RowWrapper>
            
          </RowWrapper>
        )
      }
      {
        isUserNewSuggestion && <RowWrapper>
          <Text typography='p' color='contentTertiary'>Draft - you are suggesting. {props.onDelete && !readonly && <a onClick={props.onDelete}>Delete</a>}</Text>
        </RowWrapper>
      }
      {eventCreator && !isUserNewSuggestion && (
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
      { isUserNewSuggestion || isUserPreviousSuggestion || readonly ? <></> :
        <CardVotesWrapper>
          <Button onClick={upvotedByUser ? props.onUndoVote : props.onUpvote} size='medium' sentiment={upvotedByUser ? 'primary' : 'secondary'}>
            { upvotedByUser ? 'Liked' : 'Like'}
            <FontAwesomeIcon icon={faThumbsUp} />
          </Button>
          <Button onClick={downvotedByUser ? props.onUndoVote : props.onDownvote} size='medium' sentiment={downvotedByUser ? 'primary' : 'secondary'}>
            { downvotedByUser ? 'Disliked' : 'Dislike'}
            <FontAwesomeIcon icon={faThumbsDown} />
          </Button>
        </CardVotesWrapper>
      }
      {
        props.type === 'location' && (
          <>
            { locationInfo && isExpanded &&
              <LocationInformation locationInfo={locationInfo}  />
            }
            <Button sentiment='secondary' size='small' onClick={() => setExpanded(!isExpanded)}>
              {isExpanded ? 'Hide info' : "Show more info"}
              <FontAwesomeIcon icon={isExpanded ? faArrowAltCircleUp : faArrowAltCircleDown} />
            </Button>

          </>
        )
      }
      
    </EventSuggestionCardWrapper>
  );
};

const EventSuggestionCardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  border: '1px solid $borderPrimary',
  borderRadius: '10px',
  padding: '$3',
});

const RowWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$2',
});

const CardVotesWrapper = styled(RowWrapper, {
  justifyContent: 'stretch',

  '& > *' : {
    flex: 1,
  },
});

const SuggestionThumbnail = styled('img', {
  width: '100%',
  maxHeight: '200px',
  borderRadius: '10px',
  objectFit: 'cover',
  objectPosition: 'center',
  marginBottom: '$2',
});