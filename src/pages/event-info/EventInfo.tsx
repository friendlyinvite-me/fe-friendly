import React, { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Card } from '../../components';
import { FriendlyEventData, FriendlyEventResponseAction, FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation } from '../../utils/types';

export const EventInfo: React.FC = () => {
  const data = useLoaderData() as FriendlyEventData;
  console.log(data);
  const [tab, setTab] = useState<'datetime' | 'location' | 'history'>('datetime');
  // const { currentUser } = useAuth();

  // const isCreatedByUser = data.createdBy.uid === currentUser?.uid;
  const isCreatedByUser = false;
  
  const locations = useMemo(() => {
    const locationItems: FriendlyEventResponseActionLocation[] = [];
    data.responses.forEach(response => {
      response.actions.forEach(action => {
        if (action.type === 'location') {
          locationItems.push(action);
        }
      });
    });
    return locationItems;
  }, [data]);

  const dateTimes = useMemo(() => {
    const dateTimeItems: FriendlyEventResponseActionDateTime[] = [];
    data.responses.forEach(response => {
      response.actions.forEach(action => {
        if (action.type === 'datetime') {
          dateTimeItems.push(action);
        }
      });
    });
    return dateTimeItems;
  }, [data]);
  return (
    <Card>
      <div>{data.name}</div>
      {
        isCreatedByUser ? <div>you created</div> : <div>Created by {data.createdBy.name}</div>
      }
      <div>
        <button onClick={() => setTab('datetime')}>date time</button>
        <button onClick={() => setTab('location')}>location</button>
        <button onClick={() => setTab('history')}>history</button>
      </div>
      {
        tab === 'datetime' && (
          <div>
            {
              dateTimes.map((dateTime, i) => (
                <div key={i}>
                  <div>{dateTime.value}</div>
                </div>
              ))
            }
          </div>
        )
      }
      {
        tab === 'location' && (
          <div>
            {
              locations.map((location, i) => (
                <div key={i}>
                  <div>{location.value.name}</div>
                </div>
              ))
            }
          </div>
        )
      }
      {
        tab === 'history' && (
          <div>
            {
              data.responses.map((eventResponse, i) => (
                <div key={i}>
                  <div>=====RESPONSE======</div>
                  <div>{eventResponse.user?.name}</div>
                  <div>{eventResponse.comments}</div>
                  <div>did the following actions</div>
                  <div>
                    {
                      eventResponse.actions.map((action, j) => {
                        return (
                          <div key={j}>
                            <div>type: {action.type}</div>
                            <div>value: {typeof action.value === 'object' ? action.value.name : action.value}</div>
                          </div>
                        );
                      })
                    }
                  </div>
                  <br />
                </div>
              ))
            }
          </div>
        )
      }
    </Card>
  );
};