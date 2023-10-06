import React, { FC, useState, useContext, useEffect } from "react";
import "../css/TableData.css";
import TableCell from "@mui/material/TableCell";
/**
   *
   * Table Data for clusters
   */
interface ClusterNameCellProps {
    name: string;
  }

  const ClusterNameCell: FC<ClusterNameCellProps> = ({ name }): JSX.Element => {
    const [editing, setEditing] = useState(false);
    const [clusterName, setName] = useState(name);
    const handleDoubleClick = () => {
      setEditing(true);
    };

    const handleBlur = () => {
      setEditing(false);
      // Save the changes or perform any required actions here
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setEditing(false);
      if (clusterName == "") setName(name);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
    return (
      <TableCell align="center" component="th" scope="row">
        {editing ? (
          <form
            className="form-control"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              className="cluster-name-input cluster-name-input-alt"
              value={clusterName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        ) : (
          <span className="cluster-name" onDoubleClick={handleDoubleClick}>
            {" "}
            {clusterName}
          </span>
        )}
      </TableCell>
    );
  };

  export default ClusterNameCell;