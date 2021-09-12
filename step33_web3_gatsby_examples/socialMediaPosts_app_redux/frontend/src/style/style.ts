import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ibox: {
      backgroundColor:'lightblue', 
      borderTopLeftRadius:15, 
      borderTopRightRadius:15, 
      padding:10
    },
    obox: {
      border:'2px solid grey', 
      borderRadius:15, 
      paddingTop:2, 
      paddingLeft:2, 
      marginBottom:30
    },
    btnStyle1: {
      width: '20%',
      backgroundColor: 'lightblue',      
      padding: '12px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    userInput: {
      width: '50%',
      padding: '10px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    btnStyle2: {
      width: '30%',
      backgroundColor: 'grey',
      color: 'white',
      padding: '12px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
  })
);
