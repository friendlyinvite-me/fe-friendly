import { v4 as uuidv4 } from 'uuid';
import { useContext, useMemo, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { createEventResponse, deleteEvent, fetchEventInfo } from '../api';
import { UserContext } from '../contexts/auth-context';
import { FriendlyEventData, FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation, FriendlyEventSuggestion, NewEventResponseData, ProposalType, ResponseValue } from '../utils/types';
import { useNavigate } from 'react-router-dom';


export const useEventInfo = (eventId: string) => {



  const navigate = useNavigate();

  const [data, setData] = useState<FriendlyEventData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [eventResponse, setEventResponse] = useState<NewEventResponseData>({
    eventId: '',
    userId: '',
    actions: [],
    comment: '',
  });
  console.log(eventResponse);

  const fetchEventInformation = async () => {
    const response = await fetchEventInfo(eventId);
    setData(response);
    return response;
  };

  const resetAndRefetch = async () => {
    await fetchEventInformation();
    setEventResponse({
      eventId: eventResponse.eventId,
      userId: eventResponse.userId,
      actions: [],
      comment: '',
    });
    setIsLoading(false);
  };

  useAsyncEffect(async () => {
    if (!data) {
      const response = await fetchEventInformation();
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
  const event: FriendlyEventData = useMemo(() => {
    const event = { ...data } as FriendlyEventData;
    eventResponse.actions.map(action => {

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

  const isCreatedByUser = event.user?.id === user?.id;


  const locationSuggestions: FriendlyEventSuggestion[] = event.suggestions?.filter(s => s.type === 'location') ?? [];

  const dateTimeSuggestions: FriendlyEventSuggestion[] = event.suggestions?.filter(s => s.type === 'datetime') ?? [];

  const myLocationSuggestions: FriendlyEventResponseActionLocation[] = eventResponse.actions.filter(a => a.type === 'location').map(a => a as FriendlyEventResponseActionLocation);
  const myDateTimeSuggestions: FriendlyEventResponseActionDateTime[] = eventResponse.actions.filter(a => a.type === 'datetime').map(a => a as FriendlyEventResponseActionDateTime);

  const onUpvote = (suggestionId: string, userId: string) => {
    if (!userId) {
      navigate(`/login?redirectTo=${window.location.href}`);
      return;
    }
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
    if (!userId) {
      navigate(`/login?redirectTo=${window.location.href}`);
      return;
    }
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
    if (!userId) {
      navigate(`/login?redirectTo=${window.location.href}`);
      return;
    }
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
    if (!userId) {
      navigate(`/login?redirectTo=${window.location.href}`);
      return;
    }
    // clean up all the date time
    const actions = eventResponse.actions.filter(action => action.type !== 'datetime');
    // add the date time suggestions again
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

  const onDeleteSuggestion = (suggestionId: string, userId: string) => {
    const actions = eventResponse.actions.filter(action => action.id !== suggestionId);
    setEventResponse({
      ...eventResponse,
      actions,
      userId,
    });
  };


  const onAddLocationSuggestions = (suggestions: FriendlyEventResponseActionLocation[], userId: string) => {
    if (!userId) {
      navigate(`/login?redirectTo=${window.location.href}`);
      return;
    }
    // clean up all the location suggestions
    const actions = eventResponse.actions.filter(action => action.type !== 'location');
    // add them again
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
    onDeleteSuggestion,
    resetAndRefetch,
  };

};