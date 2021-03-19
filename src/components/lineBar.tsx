import { ReactElement } from "react";

import React from 'react';
import { makeStyles } from "@material-ui/core";
import Lollipops from "./Lollipos";

const createStyles = makeStyles({
  inrcontainer: {
    position: "relative",
    marginTop: '20px',
    minWidth: '800px',
    overflow: 'hidden',
  },
  tableback: {
    position: 'absolute',
    width:'800px',
    left: '-10px',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  bar: {
    width: '1px', 
    height: '400px', 
    background: 'gray', 
    marginLeft: '10px',
  },
  yearHeaders: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '780px',
  },
  abvcontainer: {
    position: 'relative',
    display: 'inline-flex',
  },
  grlabel:{
    width: '40px',
    marginTop: '8%',
    height: '150px',
    background: 'rgba(230, 230, 230, 0.5)',
  },
  tilter: {
    transform: 'rotate(-90deg)',
  },
  infoText:{
    padding: '1rem',
    marginTop: '2rem',
    width: '300px',
  },
  lollipops: {
    position: 'relative',
    left: '70px',
    zIndex: 10000000,
    top: '40px'
  }
});


export const years = (num: number, start: number): Array<number> => {
  let years = [];
  let i = 1;
  for(i; i <= num; i = i + 1){
    const currentYear = start + i;
    years.push(currentYear);
  }
  return years;
}


interface LineBarProps {
  from: number,
  init: {start: string, end: string},
}

const LineBar = ({init, from}: LineBarProps): ReactElement => {
  const classes = createStyles();

  return (
   <div className={classes.abvcontainer}>
     <div className={classes.grlabel}><h3 className={classes.tilter} style={{marginTop: '4rem'}}>label</h3></div>
     <div className={classes.infoText}>
       <p>shshshshsh</p>
       <p>shshshshsh</p>
       <p>shshshshsh</p>
       <p>shshshshsh</p>
       <p>shshshshsh</p>
       <p>shshshshsh</p>
     </div>
     <div className={classes.lollipops}>
      <Lollipops from={from} />
     </div>
      <div className={classes.inrcontainer}>
      <div>
      <div className={classes.yearHeaders}>
        {years(8, from).map((yr) => (<div key={yr}>{yr}</div>))}
      </div>
      </div>
      <div className={classes.tableback}>
        {[...Array(8)].map( () => (<div className={classes.bar}></div>))}
      </div>
    </div>
   </div>
  );
}

export default LineBar;