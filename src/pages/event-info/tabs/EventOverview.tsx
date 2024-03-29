import moment from 'moment';
import React, { useContext, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateEvent } from '../../../api';
import { Button, Text } from '../../../components';
import { UserContext } from '../../../contexts/auth-context';
import { styled } from '../../../styles';
import { DATETIME_FORMAT } from '../../../utils/constants';
import { FriendlyEventData, FriendlyUser, Location } from '../../../utils/types';

interface Props {
  event: FriendlyEventData;
  isCreatedByUser: boolean;
  refetchEventInfo: () => Promise<void>;
}

interface FinalizedPlan {
  dateTimeId: string | null;
  locationId: string | null;
}

export const EventOverview: React.FC<Props> = ({event, isCreatedByUser, refetchEventInfo}: Props) => {

  const [isFinalizing, setIsFinalizing] = useState(false);

  const [finalizedPlan, setFinalizedPlan] = useState<FinalizedPlan>({
    dateTimeId: null,
    locationId: null,
  });
  
  const { user } = useContext(UserContext);

  const onFinalizePlan = async () => {
    const { dateTimeId, locationId } = finalizedPlan;
    if (!dateTimeId || !locationId) return;
    
    setIsFinalizing(true);
    const updated = await updateEvent(
      event.id, 
      {
        finalizedInfo: {
          dateTimeSuggestionId: dateTimeId,
          locationSuggestionId: locationId,
        },
        status: 'finalized',
      },
    );
    
    setIsFinalizing(false);

    if (updated) {
      toast.success('Great job finalizing your plan! We will send the final details to all the participants!');
      await refetchEventInfo();
    }
  };
  
  const eventParticipants = useMemo(() => {
    const participants: {[key: string]: FriendlyUser} = {};
    
    event.responses.forEach(r => {
      participants[r.userId] = r.user!;
    });

    const count = Object.keys(participants).length;

    let usersArray = Object.values(participants);
    // sort by You first
    if (user != null) {
      usersArray = usersArray.sort((a,b) => (b.id.localeCompare(user.id)));
    }
    // then put "and "prefix before last person if there are 2 +
    // and replace your name with You
    const namesArr = usersArray.map(p => user != null && p.id === user.id ? 'You' : p.name);
    const commaSeparatedNameStrings = namesArr.map((p, i) => i === namesArr.length - 1 && namesArr.length > 1 ? `and ${p}` : p ).join(', ');

    return { count, participants: commaSeparatedNameStrings };
  }, [event.responses]);

  const dateTimes = useMemo(() => {
    const suggestions = event.suggestions.filter(s => s.type === 'datetime');
    const count = suggestions.length;
    const suggestionsSortByMostPopular = suggestions.sort((a,b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length));
    
    return {
      count,
      suggestions,
      finalChoice: suggestions.find(s => s.id === event.finalizedInfo?.dateTimeSuggestionId),
      mostPopular: suggestionsSortByMostPopular[0],
    };
  }, [event.suggestions]);

  const locations = useMemo(() => {
    const suggestions = event.suggestions.filter(s => s.type === 'location');
    const count = suggestions.length;
    const suggestionsSortByMostPopular = suggestions.sort((a,b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length));
    const finalChoice = suggestions.find(s => s.id === event.finalizedInfo?.locationSuggestionId);
    const finalChoiceLink = finalChoice && (finalChoice.value as Location).url;
    
    return {
      count,
      suggestions,
      finalChoice,
      finalChoiceLink,
      mostPopular: suggestionsSortByMostPopular[0],
    };
  }, [event.suggestions]);

  const addToCalendarLink = useMemo(() => {
    if (!dateTimes.finalChoice || !locations.finalChoice) return null;

    const formatDate = (date: Date) => {
      const month = `0${date.getUTCMonth()}`.slice(-2);
      const day = `0${date.getUTCDate()}`.slice(-2);
      return `${date.getUTCFullYear()}${month}${day}T${date.getUTCHours()}${date.getUTCMinutes()}00`;
    };

    const startTime = formatDate(new Date(dateTimes.finalChoice.value as string));
    const endTime = formatDate(moment(dateTimes.finalChoice.value as string).add(1, 'h').toDate());

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}Z/${endTime}Z&location=${(locations.finalChoice?.value as Location).name}&output=xml&sf=true&text=${event.name}`;
    return url;
  }, []);

  return (
    <EventOverviewWrapper>
      { isCreatedByUser && event.status !== 'finalized' &&
        <EventAdminActions>
          <Text typography='h3'>
            Ready to finalize the plan?
          </Text>
          <div>
            <Text typography='h4'>
            Choose final date & time:
            </Text>
            <div>
              {
                dateTimes.suggestions.map(dateTime => (
                  <div key={dateTime.id}>
                    <input
                      onChange={() => {
                        setFinalizedPlan({
                          ...finalizedPlan,
                          dateTimeId: dateTime.id,
                        });
                      }}
                      checked={finalizedPlan.dateTimeId === dateTime.id}
                      id={dateTime.id}
                      type='radio'
                      value={dateTime.id}
                    />
                    <label htmlFor={dateTime.id}>{moment(dateTime.value as string).format(DATETIME_FORMAT) }</label>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <Text typography='h4'>
            Choose final location:
            </Text>
            <div>
              {
                locations.suggestions.map(location => (
                  <div key={location.id}>
                    <input
                      onChange={() => {
                        setFinalizedPlan({
                          ...finalizedPlan,
                          locationId: location.id,
                        });
                      }}
                      checked={finalizedPlan.locationId === location.id}
                      id={location.id}
                      type='radio'
                      value={location.id}
                    />
                    <label htmlFor={location.id}>{(location.value as Location).name }</label>
                  </div>
                ))
              }
            </div>
          </div>
          <Button onClick={onFinalizePlan} sentiment='primary-inverted' disabled={!finalizedPlan.dateTimeId || !finalizedPlan.locationId || isFinalizing}>Finalize your choices</Button>
        </EventAdminActions>
      }
      {
        event.status !== 'finalized' && (
          <EventSummary>
            <Text typography='h3'>
        💬 Here is a summary of what is going on:
            </Text>
            <Text typography='h4'>
              👋 <b>{event.user.name}</b> created <b>{event.name}</b> {moment(event.createdAt).fromNow()}. It is currently in the <b>{event.status}</b> status.
            </Text>
            <Text typography='h4'>
        🧑‍🤝‍🧑 So far, {eventParticipants.count} {eventParticipants.count === 1 ? 'person has' : 'people have'} added their responses on this event: {eventParticipants.participants}
            </Text>
            <Text typography='h4'>
        🕒 There are {dateTimes.count} suggestions for when to meet. {dateTimes.mostPopular && (<b>{moment(dateTimes.mostPopular.value as string).format(DATETIME_FORMAT)} is the most popular with {dateTimes.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.</b>)}
            </Text>
            <Text typography='h4'>
        📍 There are {locations.count} suggestions for where to meet. {locations.mostPopular && <b>{(locations.mostPopular.value as Location).name} is the most popular with {locations.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.</b> }
            </Text>
          </EventSummary>
        )
      }
      {
        event.status === 'finalized' && (
          <EventSummary>
            <Text typography='h3'>
        ✅ Here is a summary of finalized plan:
            </Text>
            <Text typography='h4'>
              👋 <b>{event.user.name}</b> created <b>{event.name}</b> {moment(event.createdAt).fromNow()}. It is currently in the <b>{event.status}</b> status.
            </Text>
            <Text typography='h4'>
              🕒 {dateTimes.finalChoice && (<b>{moment(dateTimes.finalChoice.value as string).format(DATETIME_FORMAT)} is the finalized date & time with {dateTimes.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.</b>)}
            </Text>
            <Text typography='h4'>
              📍 {locations.finalChoice && <b>{(locations.finalChoice.value as Location).name} is the finalized location with {locations.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.</b> }
            </Text>
            {
              addToCalendarLink && (
                <div>📅 <a href={addToCalendarLink} target="_blank" rel="noreferrer" ><b>Add to Google Calendar</b></a></div>
              )
            }
          </EventSummary>
        )
      }
      
    </EventOverviewWrapper>
  );
};

const EventOverviewWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
});

const EventAdminActions = styled('div', {
  backgroundColor: '$yellow500',
  flexDirection: 'column',
  color: '$contentPrimary',
  padding: '$5',
  borderRadius: '10px',
  gap: '$5',
  display: 'flex',

});

const EventSummary = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  padding: '$5',
  backgroundColor: '$gray100',
  borderRadius: '10px',
});