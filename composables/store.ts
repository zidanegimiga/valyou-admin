//LEADS
export const selectedLeads = () => useState('selectedLeads',()=>{})
export const selectedDiscardLeads =() => useState('selectedLeads',()=>{})
export const getDiscardDetails =() => useState('selectedLeads',()=>{})
const selectedLeadsObj = selectedLeads()
interface ItemType {
  status: String;
  title: String;
}

export const useTimelineStatus = () => useState("timelineStatus", () => null);

export const useStepperTimeline = () =>
  useState<Array<any>>("stepper_timeline", () => []);

export const updateTImeline = (stepperIndex = 0) => {
  let adjusted_index: Number = stepperIndex + 1;
  const stepper_timeline = useStepperTimeline();
  if (stepper_timeline.value.length) {
    stepper_timeline.value = stepper_timeline.value.map(
      (item: ItemType, index: Number) => {
        item.status = "pending";
        if (index < adjusted_index) {
          item.status = "completed";
        }
        if (index === adjusted_index) {
          item.status = "progress";
        }
        return { ...item };
      }
    );
  }
};
//handle active step in currentLead
export const updateCompletedStep = (index , type="booking")=>{
    // if(type === 'event' && index === 3){
    //   selectedLeads.value.processes[index].process_status = "completed"
    //   selectedLeads.value.processes[index + 2].process_status = "progress"  
    //   return  
    // }
    selectedLeadsObj.value.processes[index].process_status = "completed"
    selectedLeadsObj.value.processes[index + 1].process_status = "progress"


}
//ERRORS
export const useErrorDialogState = () =>
  useState("errorState", () => {
    return {
      display: false,
      error: {
        statusCode: null,
        statusMessage: null,
      },
    };
  });


  // state for leads
  export const leads = useState('leads',()=>[])
  export const currentLeadsDetails = useState('currentlead',()=>{})
  //selected leads
  // discard processing 
  export const processing = () => useState('processing',()=>false)

  //users
  export const usersList = ()=> useState('users',()=>{})