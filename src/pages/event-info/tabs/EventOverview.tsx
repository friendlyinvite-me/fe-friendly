import moment from 'moment';
import React, { useMemo } from 'react';
import { Text } from '../../../components';
import { FriendlyEventData, FriendlyUser, Location } from '../../../utils/types';

interface Props {
  event: FriendlyEventData;
}

export const EventOverview: React.FC<Props> = ({event}: Props) => {
  
  const eventParticipants = useMemo(() => {
    const participants: {[key: string]: FriendlyUser} = {};

    event.responses.forEach(r => {
      participants[r.userId] = r.user!;
    });

    const count = Object.keys(participants).length;

    const namesArr = Object.values(participants).map(p => p.name);
    const commaSeparatedNameStrings = namesArr.map((p, i) => i === namesArr.length - 1 ? `and ${p}` : p ).join(', ');

    return { count, participants: commaSeparatedNameStrings };
  }, [event.responses]);

  const dateTimes = useMemo(() => {
    const suggestions = event.suggestions.filter(s => s.type === 'datetime');
    const count = suggestions.length;
    const suggestionsSortByMostPopular = suggestions.sort((a,b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length));
    console.log(suggestionsSortByMostPopular);
    
    
    return {
      count,
      mostPopular: suggestionsSortByMostPopular[0],
    };
  }, [event.suggestions]);

  const locations = useMemo(() => {
    const suggestions = event.suggestions.filter(s => s.type === 'location');
    const count = suggestions.length;
    const suggestionsSortByMostPopular = suggestions.sort((a,b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length));
    console.log(suggestionsSortByMostPopular);
    
    
    return {
      count,
      mostPopular: suggestionsSortByMostPopular[0],
    };
  }, [event.suggestions]);


  return (
    <>
      <Text typography='h4'>
        {event.user.name} created {event.name} {moment(event.createdAt).fromNow()}. It is currently in the {event.status} status.
      </Text>
      <Text typography='h4'>
        So far, {eventParticipants.count} {eventParticipants.count === 1 ? 'person has' : 'people have'} added their responses on this event: {eventParticipants.participants}
      </Text>
      <Text typography='h4'>
        There are {dateTimes.count} suggestions for when to meet. {moment(dateTimes.mostPopular.value as string).format('Do MMM y @ h:mm a')} is the most popular with {dateTimes.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.
      </Text>
      <Text typography='h4'>
        There are {locations.count} suggestions for where to meet. {(locations.mostPopular.value as Location).name} is the most popular with {locations.mostPopular.upvotes.length} upvotes and {dateTimes.mostPopular.downvotes.length} downvotes.
      </Text>

    </>
  );
};