import { makeStyles } from "@material-ui/core";
import React from "react";
import { createRef, ReactElement, RefObject, useEffect } from "react";
import { years } from "./lineBar";

const createStyles = makeStyles({
  lPop: {
    position: "absolute",
    display: "inline-flex",
  },
  circle: {
    position: "absolute",
    width: "20px",
    height: "20px",
    border: "1px solid black",
    borderRadius: "999px",
  },
  filledCircle: {
    position: "relative",
    width: "8px",
    height: "8px",
    background: "gray",
    border: "1px solid black",
    borderRadius: "999px",
  },
  dumbell: {
    position: "relative",
    display: "inline-flex",
  },
  line: {
    position: 'relative',
    marginTop: "4px",
    width: 20,
    padding: 0,
    height: "1px",
    background: "gray",
  },
  svgElement: {
    position: 'relative',
    top: '-40px',
    left: '80px'
  }
});

interface RefObjects {
  fyYear: string | undefined;
  ref: React.RefObject<HTMLDivElement>;
}

interface BareCoords {
  top: number;
  left: number;
  position: string;
}

const assignPositions = (
  setYear: number
): Array<{ fyYear: string; position: string }> => {
  // const positions = ['440', '530', '620', '710', '802', '890', '982', '1072'];
  const positions = ["10", "95", "175", "265", "355", "445", "535", "625"];


  const yearArr = years(8, setYear);
  const postionYearMap = [];
  for (const [idx, pos] of positions.entries()) {
    postionYearMap.push({ fyYear: yearArr[idx].toString(), position: pos });
  }
  return postionYearMap;
};


const setDots = (
  refs: RefObjects[],
  positions: Array<{ fyYear: string; position: string }>
): BareCoords[] | null => {
  const linePostions: BareCoords[] = [];
  refs.forEach((ref) => {
    if (ref.ref.current) {
      positions.forEach( (pos) => {
        if(ref.fyYear && ref.ref.current &&  pos.fyYear === ref.fyYear)
        {
          ref.ref.current.style.left = `${pos.position}px`;
          linePostions.push({top: ref.ref.current.getBoundingClientRect().top, left: ref.ref.current.getBoundingClientRect().left, position: pos.position });
        }
      })
    }
  });
  return linePostions;
};

const createLines = (coords: BareCoords[], line: React.RefObject<HTMLDivElement>): void => {
  coords.forEach((cord, idx:number) => {
    if(coords[idx + 1] && coords[idx + 1].left !== undefined && line.current) {
      line.current.style.left = `${parseInt(cord.position) - 10}px`;
      if(coords[idx + 1].left > cord.left) {
        const width = coords[idx + 1].left - cord.left;
        line.current.style.width = `${width}px`;
      } else {
        const width = cord.left - coords[idx + 1].left;
        line.current.style.width = `${width}px`;
      }      
    }
  })
}

const Lollipops = ({ from }: { from: number }): ReactElement => {
  const classes = createStyles();
  const positions = assignPositions(from);

  const data = [
    {
      init: {
        startDate: "1-20-2022",
        completionDate: "4-30-2022",
      },
    },
    {
      design: {
        startDate: "4-20-2022",
        completionDate: "4-30-2023",
      },
    },
    {
      procFab: {
        startDate: "4-20-2023",
        completionDate: "4-30-2024",
      },
    },
  ];

  const initCircRef = createRef<HTMLDivElement>();
  const initLineRef = createRef<HTMLDivElement>();
  const designCircleRef = createRef<HTMLDivElement>();
  const designLineRef = createRef<HTMLDivElement>();
  const procCircleRef = createRef<HTMLDivElement>();
  const procLineRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const posArry = setDots(
      [
        {
          fyYear: data[1].design?.completionDate.split("-")[2],
          ref: initCircRef,
        },
        {
          fyYear: data[2].procFab?.completionDate.split("-")[2],
          ref: designCircleRef,
        },
      ],
      positions
    );
    if(posArry) createLines(posArry, designLineRef);
  }, []);

  return (
    <div className={classes.lPop}>
      <div className={classes.circle} style={{ left: "180px" }}></div>
      <div>
        <div className={classes.dumbell}>
          {/* <div className={classes.line} ref={initLineRef}></div> */}
          <div className={classes.filledCircle} ref={initCircRef}></div>
        </div>
      </div>
      <div>
        <div className={classes.dumbell}>
          <div
            className={classes.filledCircle}
            ref={designCircleRef}
            style={{ background: "green" }}
          ></div>
          <div className={classes.line} ref={designLineRef} ></div>
        </div>
      </div>
      {/* <div>
        <div className={classes.dumbell}>
          <div
            className={classes.line}
            ref={procLineRef}
            style={{ background: "#156b1d" }}
          ></div>
          <div className={classes.filledCircle} ref={procCircleRef}></div>
        </div>
      </div> */}
      {/* <div >
    <div className={classes.dumbell}>
          <div className={classes.filledCircle}  ></div>
          <div className={classes.line} ></div>
        </div>
    </div> */}
      {/* <div className={classes.line}>
        <div className={classes.filledCircle} style={{left: '150px', background: '#156b1d'}}></div>
        <div className={classes.procfab} style={{width: '60px', left: '90px'}} ></div>
    </div>
    <div className={classes.line}>
        <div className={classes.filledCircle} style={{left: '210px', background: '#54e8dc'}}></div>
        <div className={classes.construct} style={{width: '60px', left: '158px'}} ></div>
    </div>
    <div className={classes.line}>
        <div className={classes.filledCircle} style={{left: '280px', background: '#ed9968'}}></div>
        <div className={classes.ttp} style={{width: '60px', left: '220px'}} ></div>
    </div>
    <div className={classes.line}>
        <div className={classes.filledCircle} style={{left: '350px', background: '#751007'}}></div>
        <div className={classes.wr} style={{width: '60px', left: '290px'}} ></div>
    </div> */}
    </div>
  );
};

export default Lollipops;
