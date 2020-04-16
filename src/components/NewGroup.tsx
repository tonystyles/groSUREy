import * as React from 'react';
import { TextField } from '@material-ui/core';

const NewGroup: React.FC = (): JSX.Element => {

  return (
    <div>
      <form>
        <TextField id="group-name" label="group name" variant="outlined"></TextField>
        <TextField id="add-member" label="member" variant="outlined"></TextField>
      </form>
    </div>
  )
}

export default NewGroup;