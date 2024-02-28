import { Textarea, Group, Text, Button, Container } from '@mantine/core';
import AssignmentStatus from './AssignmentStatus';
import { useState } from 'react';


function SublessonAssignment({ assignment }) {
  const assignmentStatus = '';
  const [answer, setAnswer] = useState('');
  return (
    <div>
      <Group justify='space-between'>
        <Text>Assignment</Text>
        <AssignmentStatus>{}</AssignmentStatus>
      </Group>
      <Container>
        <label htmlFor="answer">Answer:</label>
        <Textarea id="answer" style={{ width:'700px' }} autosize minRows={4} maxRows={4}  
          value={answer} onChange={(e)=>{setAnswer(e.target.value);}}
          placeholder='Answer...'/>
      </Container>
      <Group justify='space-between' align='flex-start' hidden={'ha'}>
        <Button>Send Assignment</Button>
        <Text></Text>
      </Group>
    </div>
  );
}
export default SublessonAssignment;