import { useContext, useMemo, useState } from 'react';
import { createEventResponse, deleteEvent } from '../api';
import { UserContext } from '../contexts/auth-context';
import { FriendlyEventData, NewEventResponseData } from '../utils/types';

export const useEventInfo = (data: FriendlyEventData) => {
  const [eventResponse, setEventResponse] = useState<NewEventResponseData>({
    eventId: data.id,
    userId: '',
    actions: [],
    comment: '',
  });

  const { user } = useContext(UserContext);

  /**
   * When eventResponse change
   * Update the event
   */
  const event = useMemo(() => {
    const event = { ...data };
    eventResponse.actions.map(action => {
      console.log('action', action);

      switch (action.type) {
        case 'upvote': {
          event.suggestions = event.suggestions.map(suggestion => {
            if (suggestion.id === action.value) {
              return {
                ...suggestion,
                upvotes: [...suggestion.upvotes.filter(u => u !== user!.id), user!.id],
                downvotes: suggestion.downvotes.filter(u => u !== user!.id),
              };
            }
            return suggestion;
          });
          break;
        }

        case 'downvote': {
          event.suggestions = event.suggestions.map(suggestion => {
            if (suggestion.id === action.value) {
              return {
                ...suggestion,
                downvotes: [...suggestion.downvotes.filter(u => u !== user!.id), user!.id],
                upvotes: suggestion.upvotes.filter(u => u !== user!.id),
              };
            }
            return suggestion;
          });
          break;
        }

        case 'undovote': {
          event.suggestions = event.suggestions.map(suggestion => {
            if (suggestion.id === action.value) {
              return {
                ...suggestion,
                upvotes: suggestion.upvotes.filter(u => u !== user!.id),
                downvotes: suggestion.downvotes.filter(u => u !== user!.id),
              };
            }
            return suggestion;
          });
          break;
        }

        default:
          break;
      }
    });

    return event;
  }, [data, eventResponse]);

  const isCreatedByUser = event.createdBy.userId === user?.id;


  const locationSuggestions = event.suggestions.filter(s => s.type === 'location');

  const dateTimeSuggestions = event.suggestions.filter(s => s.type === 'datetime');

  const onUpvote = (suggestionId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote' || action.type === 'undovote') {
        return action.value !== suggestionId;
      }
      return true;
    });
    actions.push({
      type: 'upvote',
      value: suggestionId,
    });
    setEventResponse({
      ...eventResponse,
      actions,
    });
  };
  const onDownvote = (suggestionId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote' || action.type === 'undovote') {
        return action.value !== suggestionId;
      }
      return true;
    });
    actions.push({
      type: 'downvote',
      value: suggestionId,
    });
    setEventResponse({
      ...eventResponse,
      actions,
    });
  };

  const onUndoVote = (suggestionId: string) => {
    /**
     * If undoing action from previous response
     * explicitly set an undo
     */
    if (!eventResponse.actions.some(action => {
      return (action.type === 'downvote' || action.type === 'upvote') && action.value === suggestionId;
    })) {
      const actions = eventResponse.actions;
      actions.push({
        type: 'undovote',
        value: suggestionId,
      });
    }

    /**
     * if undoing action that is in this response
     * just remove it from actions
     */
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote') {
        return action.value !== suggestionId;
      }
      return true;
    });

    setEventResponse({
      ...eventResponse,
      actions,
    });
  };

  return {
    event,
    dateTimeSuggestions,
    locationSuggestions,
    onUndoVote,
    onUpvote,
    onDownvote,
    isCreatedByUser,
    eventResponse,
    onDeleteEvent: deleteEvent,
    onCreateEventResponse: createEventResponse,
  };

};