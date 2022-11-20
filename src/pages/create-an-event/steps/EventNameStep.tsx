import { TextInput } from '../../../components/TextInput'
import { NewEventData } from '../../../utils/types';

interface Props {
  onChangeName: (val: string) => void;
  eventData: NewEventData;
}

export const EventNameStep = (props: Props) => {
  return (
    <TextInput placeholder='Name of the event' onChange={props.onChangeName} value={props.eventData.name}/>
  )
}