import React from "react";

const DeleteButton = ({ onDelete }) => {
  return (
    <>
      <button className="btn  btn-danger mr-3" type="button" onClick={onDelete}>
        Delete Selected
      </button>
    </>
  );
};

export default DeleteButton;
