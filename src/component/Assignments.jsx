import { useState,useEffect } from 'react';
import classes from '../style/Assignments.module.css';
import Background from './Background';
import { Tabs,  Textarea } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AssignmentItem ({ item }){
  const [answer,setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // event.preventDefault();
    try {
      const userId = 'auth0|65ccaf3c365d79c2fb97a81b';

      const submissionData = { userId,assignmentId:item.assignmentId,answer,userAssignmentId:item.id };
      console.log(submissionData);
      const response = await axios.put(import.meta.env.VITE_API_SERVER + '/user/assignment-submitted',submissionData);
      response.data.success;
      
    } catch (error){
      console.error(error);
      alert('Error submitting assignment');
    } 
  };

  function CheckStatus (){
    const date = new Date();
    if(new Date(date).getTime() >  new Date(item.completeByDate).getTime()){
      return item.isSubmitted ? (
        <p className={classes.statusSubmittedLate}>Submitted late</p>
      ) : (
        <p className={classes.statusOverdue}>Overdue</p>);
    }else{
      return item.isSubmitted ? (
        <p className={classes.statusSubmitted}>Submitted</p>
      ) : (
        <p className={classes.statusPending}>Pending</p>);}
  }
  
  return (
    
    <form onSubmit={handleSubmit}>
      <div className={classes.assignmentsContainer} >
        <div className={classes.titleContainer}>
          <div>
            <h3>Course: </h3>
            <p className='cf-body-2' style={{ color:'#646D89' }} >Introduction: ........</p>
          </div>
          <div className={classes.statusContainer}>
            <CheckStatus />
            <p>Assign within 2 days</p>
          </div>
                  
        </div>
        <div className={classes.inputContainer}>
          <div>
            <p>{item.assignment.title}</p>
            <Textarea style={{ width:'700px' }} autosize minRows={4} maxRows={4} placeholder='Answer...' 
              value={answer} onChange={(e)=>{setAnswer(e.target.value);}}/>
          </div>
          <div>
            <button type='submit' className={classes.buttonSubmit} >Submit</button>
            <p className={classes.openInCourse} onClick={()=>{navigate('/');}}>Open in Course</p>
          </div>
        </div>
      </div>
    </form>
    
  );
}

function Assignments (){

  const [data,setData] = useState([]);

  const fetchData = async ()=> {
    try{
      const response = await axios.get(import.meta.env.VITE_API_SERVER + '/user/user-assignments');
      console.log(response.data);
      setData(response.data);

    } catch (error){
      console.error('Error fetching data:', error);
    }
  };
 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.assignments}>
      <Background />
      <div className={classes.myAssignments}>
        <h2>My Assignments</h2>
        <div>
          
          <Tabs color="rgba(0, 0, 0, 1)" defaultValue="all">
            <Tabs.List justify='center'>
              <Tabs.Tab value="all" >
                    All
              </Tabs.Tab>
              <Tabs.Tab value="pending" >
                    Pending
              </Tabs.Tab>
              <Tabs.Tab value="submitted" >
                    Submitted
              </Tabs.Tab>
              <Tabs.Tab value='overdue'>
                    Overdue
              </Tabs.Tab>
              <Tabs.Tab value='submitted-late'>
                    Submitted late
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="all">
              {data.map((item,idx)=>{
                return(
                  <AssignmentItem key={idx} item={item} />
                );
              })}
            </Tabs.Panel>

            <Tabs.Panel value="pending">
              {data.filter(item => !item.isSubmitted && new Date(item.completeByDate).getTime() > new Date().getTime())
                .map((item,idx)=>{
                  return (<AssignmentItem key={idx} item={item} />);
                })}
            </Tabs.Panel>

            <Tabs.Panel value="submitted">
              {data.filter(item => item.isSubmitted && new Date(item.completeByDate).getTime() > new Date().getTime())
                .map((item,idx)=>{
                  return (<AssignmentItem key={idx} item={item} />);
                })}
            </Tabs.Panel>
            <Tabs.Panel value='overdue'>
              {data.filter(item => !item.isSubmitted && new Date().getTime()  > new Date(item.completeByDate).getTime() )
                .map((item,idx)=>{
                  return (<AssignmentItem key={idx} item={item} />);
                })}
            </Tabs.Panel>
            <Tabs.Panel value='submitted-late'>
              {data.filter(item => item.isSubmitted && new Date().getTime()  > new Date(item.completeByDate).getTime() )
                .map((item,idx)=>{
                  return (<AssignmentItem key={idx} item={item} />);
                })}
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
    
  );
}

export default Assignments;