import React from "react";
import Task from "./task";
function CompletedTasks(props) {
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDrop(e) {
    var task = JSON.parse(e.dataTransfer.getData("task"));
    props.onDelete(task);
  }
  function renderCompletedTasks() {
    if (props.completedTasks.length === 0) {
      return <p>no tasks to show !!!!!</p>;
    } else {
      return props.completedTasks.map(task => (
        <div
          className="droppable"
          onDragOver={e => {
            onDragOver(e);
          }}
          onDrop={e => {
            onDrop(e);
          }}
        >
          <Task
            task={task}
            key={task.id}
            onDelete={props.onDeleteCompleted}
          ></Task>
        </div>
      ));
    }
  }

  return (
    <div>
      completed tasks
      {renderCompletedTasks()}
    </div>
  );
}

export default CompletedTasks;
