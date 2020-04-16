import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';

const NewItem: React.FC = (): JSX.Element => {

  return (
    <div>
      <form>
        <h2>New Item</h2>
        <TextField id="itemInput" label="item" variant="outlined"></TextField>
        <TextField id="itemBrand" label="brand" variant="outlined"></TextField>
        <TextField id="itemMaxPrice" label="maximum price" variant="outlined"></TextField>
        <TextField id="itemNotes" label="notes" variant="outlined"></TextField>
      </form>

    </div>
  )
}

export default NewItem;