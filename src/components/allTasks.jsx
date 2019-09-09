import React from "react";
import CompltedTasks from "./completedtasks";
import InProgressTasks from "./inProgressTasks";
function AllTasks(props) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <InProgressTasks
          tasks={props.tasks}
          onDelete={props.onDelete}
          setTasks={props.setTasks}
        />
      </div>
      <div className="col-sm-6">
        <CompltedTasks
          completedTasks={props.completedTasks}
          setCompletedTasks={props.setCompletedTasks}
          onDeleteCompleted={props.onDeleteCompleted}
          onDelete={props.onDelete}
        />
      </div>
    </div>
  );
}

export default AllTasks;
