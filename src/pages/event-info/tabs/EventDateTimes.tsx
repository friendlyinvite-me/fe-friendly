import moment from 'moment';
import React, { useContext } from 'react';
import { AddNewSuggestionCard } from '../../../components/AddNewSuggestionCard';
import { EventSuggestionCard } from '../../../components/EventSuggestionCard';
import { UserContext } from '../../../contexts/auth-context';
import { FriendlyEventResponseActionDateTime, FriendlyEventSuggestion, Location, ProposalType } from '../../../utils/types';

interface Props {
  dateTimeSuggestions: FriendlyEventSuggestion[];
  myDateTimeSuggestions: FriendlyEventResponseActionDateTime[];
  onUpvote: (suggestionId: string, userId: string) => void;
  onDownvote: (suggestionId: string, userId: string) => void;
  onUndoVote: (suggestionId: string, userId: string) => void;
  onDeleteSuggestion: (suggestionId: string, userId: string) => void;
  onAddNewProposal: (type: ProposalType) => void;
  readonly?: boolean;
}

export const EventDateTimes: React.FC<Props> = ({
  dateTimeSuggestions, 
  onDownvote, 
  onUndoVote, 
  onUpvote, 
  myDateTimeSuggestions, 
  onDeleteSuggestion,
  onAddNewProposal,
  readonly,
}: Props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      {
        dateTimeSuggestions
          .sort((a,b) => new Date(a.value as string).getTime() - new Date(b.value as string).getTime())
          .map((suggestion) => (
            <EventSuggestionCard
              type='datetime'
              readonly={readonly}
              key={suggestion.id}
              data={{
                ...suggestion,
                title: moment(suggestion.value as string).format('Do MMM y @ h:mm a'),
              }}
              onUpvote={() => onUpvote(suggestion.id, user?.id ?? '')}
              onDownvote={() => onDownvote(suggestion.id, user?.id ?? '')}
              onUndoVote={() => onUndoVote(suggestion.id, user?.id ?? '')}
            />
                    
          ))
      }
      {
        myDateTimeSuggestions.map(suggestion => (
          <EventSuggestionCard
            type='datetime'
            readonly={readonly}
            key={suggestion.id}
            onDelete={() => onDeleteSuggestion(suggestion.id, user?.id ?? '')}
            data={{
              ...suggestion,
              upvotes: [],
              downvotes: [],
              title: moment(suggestion.value as string).format('Do MMM y @ h:mm a'),
            }}
          />
                  
        ))
      }
      {
        !readonly && <AddNewSuggestionCard onClick={() => onAddNewProposal('datetime')} type='datetime' />
      }
    </>
  );
};