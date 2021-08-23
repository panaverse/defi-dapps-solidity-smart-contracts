import { GetEventsDai } from './getEventsDai';

const contract : GetEventsDai = new GetEventsDai();

contract.getEvents().then((res)=>console.log(res))



