import * as React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const NewGroup: React.FC = (): JSX.Element => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form>
        <TextField id="group-name" label="group name" variant="outlined"></TextField>
        <br />
        <TextField id="add-member" label="add members" variant="outlined"></TextField>
        <br />
        <Button size="large" className="submtiBtn" >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default NewGroup;