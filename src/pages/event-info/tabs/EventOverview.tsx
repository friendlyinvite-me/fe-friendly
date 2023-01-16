import moment from 'moment';
import React, { useContext, useMemo } from 'react';
import { Text } from '../../../components';
import { UserContext } from '../../../contexts/auth-context';
import { styled } from '../../../styles';
import { FriendlyEventData, FriendlyUser, Location } from '../../../utils/types';

interface Props {
  event: FriendlyEventData;
}

export const EventOverview: React.FC<Props> = ({event}: Props) => {
  
  const { user } = useContext(UserContext);
  
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
      mostPopular: suggestionsSortByMostPopular[0],
    };
  }, [event.suggestions]);

  const locations = useMemo(() => {
    const suggestions = event.suggestions.filter(s => s.type === 'location');
    const count = suggestions.length;
    const suggestionsSortByMostPopular = suggestions.sort((a,b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length));
    
    return {
      count,
      mostPopular: suggestionsSortByMostPopular[0],
    };
  }, [event.suggestions]);


  return (
    <EventOverviewWrapper>
      <Text typography='h3'>
        Here is a summary of what is going on:
      </Text>
      <Text typography='h4'>
        {event.user.name} created {event.name} {moment(event.createdAt).fromNow()}. It is currently in the {event.status} status.
      </Text>
      <Text typography='h4'>
        So far, {eventParticipants.count} {eventParticipants.count === 1 ? 'person has' : 'people have'} added their responses on this event: {eventParticipants.participants}
      </Text>
      <Text typography='h4'>
        There are {dateTimes.count} suggestions for when to meet. {dateTimes.mostPopular && (<span>{moment(dateTimes.mostPopular.value as string).format('Do MMM y @ h:mm a')} is the most popular with {dateTimes.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.</span>)}
      </Text>
      <Text typography='h4'>
        There are {locations.count} suggestions for where to meet. {locations.mostPopular && <span>{(locations.mostPopular.value as Location).name} is the most popular with {locations.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.</span> }
      </Text>

    </EventOverviewWrapper>
  );
};

const EventOverviewWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  padding: '$5',
  backgroundColor: '$gray100',
  borderRadius: '10px',
});