import { useSearchParams, useLoaderData } from 'react-router-dom';

export const EventInfo = () => {
  const data = useLoaderData();
  console.log(data);
  
  return (
    <div>EVent info</div>
  )
}