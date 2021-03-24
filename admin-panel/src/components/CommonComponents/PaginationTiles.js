// import { makeStyles } from "@material-ui/core";
// import { Pagination } from "reactstrap";

// export const PaginationTiles = ({ tileNo, count = 10 }) => {
//   const useStyles = makeStyles((theme) => ({}));
//   const classes = useStyles();
//   return <Pagination count={10} shape="rounded" />;
// };

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // marginTop: theme.spacing(2),
    },
  },
  pagination: {
    color: "white",
    "& .MuiPaginationItem-root": {
      backgroundColor: "rgb(29 29 43 / 80%)",
      color: "white",
      minWidth: "20px",
      borderRadius: "10%",
      height: "auto",
      padding: "4px 5px",
    },
    "& .Mui-selected": {
      backgroundColor: "#2c66f5",
      color: "white",
    },
  },
}));

export default function PaginationTiles({ tileNo, totalTiles = 0 }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        classes={{ root: classes.pagination }}
        className="pagination-custom"
        count={10}
        shape="round"
        color="primary"
        onChange={(e, page) => {
          tileNo(page);
        }}
        count={totalTiles}
      />
    </div>
  );
}
