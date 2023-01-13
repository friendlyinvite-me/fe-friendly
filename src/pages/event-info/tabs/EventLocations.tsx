import moment from 'moment';
import React, { useContext } from 'react';
import { AddNewSuggestionCard } from '../../../components/AddNewSuggestionCard';
import { EventSuggestionCard } from '../../../components/EventSuggestionCard';
import { UserContext } from '../../../contexts/auth-context';
import { FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation, FriendlyEventSuggestion, Location, ProposalType } from '../../../utils/types';

interface Props {
  locationSuggestions: FriendlyEventSuggestion[];
  myLocationSuggestions: FriendlyEventResponseActionLocation[];
  onUpvote: (suggestionId: string, userId: string) => void;
  onDownvote: (suggestionId: string, userId: string) => void;
  onUndoVote: (suggestionId: string, userId: string) => void;
  onDeleteSuggestion: (suggestionId: string, userId: string) => void;
  onAddNewProposal: (type: ProposalType) => void;
}

export const EventLocations: React.FC<Props> = ({
  locationSuggestions, 
  onDownvote, 
  onUndoVote, 
  onUpvote, 
  myLocationSuggestions, 
  onDeleteSuggestion,
  onAddNewProposal,
}: Props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      {
        locationSuggestions.map((suggestion) => (
          <EventSuggestionCard
            type='location'
            key={suggestion.id}
            data={{
              ...suggestion,
              title: (suggestion.value as Location).name,
              reference: (suggestion.value as Location).reference,
              thumbnail: (suggestion.value as Location).thumbnail,
            }}
            onUpvote={() => onUpvote(suggestion.id, user?.id ?? '')}
            onDownvote={() => onDownvote(suggestion.id, user?.id ?? '')}
            onUndoVote={() => onUndoVote(suggestion.id, user?.id ?? '')}
          />
                    
        ))
      }
      {
        myLocationSuggestions.map(suggestion => (
          <EventSuggestionCard
            type='location'
            key={suggestion.id}
            onDelete={() => onDeleteSuggestion(suggestion.id, user?.id ?? '')}
            data={{
              ...suggestion,
              upvotes: [],
              downvotes: [],
              title: suggestion.value.name,
              reference: suggestion.value.reference,
              thumbnail: suggestion.value.thumbnail,
            }}
          />
                  
        ))
      }
      <AddNewSuggestionCard onClick={() => onAddNewProposal('location')} type='location' />
    </>
  );
};