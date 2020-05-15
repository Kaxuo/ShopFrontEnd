import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

function BasicTextField({data:{urgency,title},change,handleChange, handleSubmit}) {

  // You had issues with the effect because the database from django was slow 

  const useStyles = makeStyles((theme) => ({
    root: {
      borderBottom: "1px solid black",
      backgroundColor:"white"
    },

  }));
  const classes = useStyles();



  return (
    <form   onChange={handleChange} onSubmit={handleSubmit} id="form">
      <Box className={classes.root} justify="center" display="flex" flexDirection="row" p={1} >
        <Box  >
        {/*  DONT FORGET TO ADD THE || TO MAKE IT SAFE  */}
          <TextField  id="title" label="Outlined" name="title" variant="outlined" value={title || ''} required/>
        </Box>
        <Box p={1}>
          <FormControlLabel
            control={
              // you had issues here , the checkbox always returned false, had to modify the django backend
              <Checkbox
              // DONT FORGET TO ADD THE || TO MAKE IT SAFE 
                checked={urgency || false}
                name="urgency"
                color="primary"
                type="checkbox"
              />
            }
            label="Urgent"
          />
        </Box>
        <Box style={{ marginLeft: "auto" }} p={1} p={1}>
          <FormControlLabel
            control={
              // you had issues here , the checkbox always returned false, had to modify the django backend
              <Checkbox
              // DONT FORGET TO ADD THE || TO MAKE IT SAFE 
                value={false || true}
                name='sort'
                color="secondary"
                type="checkbox"
                onChange={change}
              />
            }
            label="Show Urgent"
          />
        </Box>
        <Box style={{ marginLeft: "auto" }} p={1}>
        </Box>
        <Box style={{ marginLeft: "auto" }} p={1}>
          <Button id="submit" type="submit" className="btn btn-warning" name="submit" style={{ paddingLeft: "33px", paddingRight: "32px" }} variant="contained" color="primary">
            Add
        </Button>
        </Box>
      </Box>
    </form>
  );
}

export default BasicTextField