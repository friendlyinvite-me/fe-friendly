import { v4 as uuidv4 } from 'uuid';
import { useContext, useMemo, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { createEventResponse, deleteEvent, fetchEventInfo } from '../api';
import { UserContext } from '../contexts/auth-context';
import { FriendlyEventData, FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation, FriendlyEventSuggestion, NewEventResponseData, ProposalType, ResponseValue } from '../utils/types';

export const useEventInfo = (eventId: string) => {

  const [data, setData] = useState<FriendlyEventData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [eventResponse, setEventResponse] = useState<NewEventResponseData>({
    eventId: '',
    userId: '',
    actions: [],
    comment: '',
  });

  useAsyncEffect(async () => {
    if (!data) {
      const response = await fetchEventInfo(eventId);
      setData(response);

      setEventResponse({
        ...eventResponse,
        eventId: response.id,
      });

      setIsLoading(false);
    }
  }, [data]);

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
          event.suggestions = event.suggestions?.map(suggestion => {
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
          event.suggestions = event.suggestions?.map(suggestion => {
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
          event.suggestions = event.suggestions?.map(suggestion => {
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

  const isCreatedByUser = event.createdBy?.userId === user?.id;


  const locationSuggestions: FriendlyEventSuggestion[] = event.suggestions?.filter(s => s.type === 'location') ?? [];

  const dateTimeSuggestions: FriendlyEventSuggestion[] = event.suggestions?.filter(s => s.type === 'datetime') ?? [];

  const myLocationSuggestions: FriendlyEventResponseActionLocation[] = eventResponse.actions.filter(a => a.type === 'location').map(a => a as FriendlyEventResponseActionLocation);
  const myDateTimeSuggestions: FriendlyEventResponseActionDateTime[] = eventResponse.actions.filter(a => a.type === 'datetime').map(a => a as FriendlyEventResponseActionDateTime);

  const onUpvote = (suggestionId: string, userId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote' || action.type === 'undovote') {
        return action.value !== suggestionId;
      }
      return true;
    });

    /**
     * add to this event response if it wasnt in the past
     */
    const suggestion = data?.suggestions.find(suggestion => suggestionId === suggestion.id);
    if (suggestion && !suggestion.upvotes.includes(userId)) {
      actions.push({
        id: uuidv4(),
        type: 'upvote',
        value: suggestionId,
      });
    }

    setEventResponse({
      ...eventResponse,
      actions,
      userId,
    });
  };
  const onDownvote = (suggestionId: string, userId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote' || action.type === 'undovote') {
        return action.value !== suggestionId;
      }
      return true;
    });

    /**
     * add to this event response if it wasnt in the past
     */
    const suggestion = data?.suggestions.find(suggestion => suggestionId === suggestion.id);
    if (suggestion && !suggestion.downvotes.includes(userId)) {
      actions.push({
        id: uuidv4(),
        type: 'downvote',
        value: suggestionId,
      });
    }

    actions.push({
      id: uuidv4(),
      type: 'downvote',
      value: suggestionId,
    });
    setEventResponse({
      ...eventResponse,
      actions,
      userId,
    });
  };

  const onUndoVote = (suggestionId: string, userId: string) => {
    /**
     * If undoing action from previous response
     * explicitly set an undo
     */
    if (!eventResponse.actions.some(action => {
      return (action.type === 'downvote' || action.type === 'upvote') && action.value === suggestionId;
    })) {
      const actions = eventResponse.actions;
      actions.push({
        id: uuidv4(),
        type: 'undovote',
        value: suggestionId,
      });
      setEventResponse({
        ...eventResponse,
        actions,
        userId,
      });
      return;
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
      userId,
    });
  };

  const onAddDateTimeSuggestions = (suggestions: FriendlyEventResponseActionDateTime[], userId: string) => {
    const actions = eventResponse.actions.filter(action => action.type !== 'datetime');
    suggestions.forEach(suggestion => {
      actions.push({
        id: suggestion.id ?? uuidv4(),
        type: 'datetime',
        value: suggestion.value,
      });
    });

    setEventResponse({
      ...eventResponse,
      actions,
      userId,
    });
  };

  const onAddLocationSuggestions = (suggestions: FriendlyEventResponseActionLocation[], userId: string) => {
    const actions = eventResponse.actions.filter(action => action.type !== 'location');
    suggestions.forEach(suggestion => {
      actions.push({
        id: suggestion.id ?? uuidv4(),
        type: 'location',
        value: suggestion.value,
      });
    });

    setEventResponse({
      ...eventResponse,
      actions,
      userId,
    });
  };

  return {
    isLoading,
    event,
    dateTimeSuggestions,
    locationSuggestions,
    myLocationSuggestions,
    myDateTimeSuggestions,
    onUndoVote,
    onUpvote,
    onDownvote,
    isCreatedByUser,
    eventResponse,
    onAddDateTimeSuggestions,
    onAddLocationSuggestions,
    onDeleteEvent: deleteEvent,
    onCreateEventResponse: createEventResponse,
  };

};