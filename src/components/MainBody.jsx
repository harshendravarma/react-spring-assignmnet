import React, { Component } from "react";
import AllTasks from "./AllTasks";

class MainBody extends Component {
  state = {
    tasks: [],
    completedTasks: [],
    isLoading: true
  };
  fetchCompletedTasks=()=>{
    fetch("http://localhost:8080/Taskscompleted")
    .then(response => response.json())
    .then(data =>
      this.setState({ completedTasks: data, isLoading: false })
    );
  }
  fetchInProgresTasks=()=>{
    fetch("http://localhost:8080/Tasksinprogress")
    .then(response => response.json())
    .then(data => this.setState({ tasks: data, isLoading: false }));
  }
  componentDidMount(){
    this.fetchInProgresTasks();
    this.fetchCompletedTasks();
  }
  handleDelete=(task)=> {
    task.name = "c";
    fetch("http://localhost:8080/Tasks/${task.id}", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(() => {
      const tasks = this.state.tasks.filter(t => t.id !== task.id);
      this.state.completedTasks.push(task);
      this.setState({
        tasks: tasks,
        completedTasks: this.state.completedTasks
      });
    });
  }
  handleDeleteCompletedTasks=(task)=> {
    fetch(`http://localhost:8080/Tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      const completedTasks = this.state.completedTasks.filter(
        t => t.id !== task.id
      );
      this.setState({
        tasks: this.state.tasks,
        completedTasks: completedTasks
      });
    });
  }
  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  onSubmit=(event)=> {
    event.preventDefault();
    if (this.refs.taskInput.value) {
      let tasks = [...this.state.tasks];
      let status = "p";
      let newtaskobject = {
        id: this.uuidv4(),
        name: status,
        description: this.refs.taskInput.value
      };
      tasks = tasks.concat(newtaskobject);
      fetch("http://localhost:8080/Tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newtaskobject)
      }).then(this.setState({ tasks }));
    }
  }

  render() {
    return (
      <div className="container">
        <h2>TODO LIST</h2>
        <div className="card">
          <div className="card-body row">
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  ref="taskInput"
                  placeholder="addTask"
                ></input>
              </div>
              <div className="col-sm-3">
                <button type="submit" className="btn btn-primary">
                  +add
                </button>
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <AllTasks
          tasks={this.state.tasks}
          completedTasks={this.state.completedTasks}
          setCompletedTasks={this.setCompletedTasks}
          setTasks={this.setTasks}
          onDelete={this.handleDelete}
          onDeleteCompleted={this.handleDeleteCompletedTasks}
        />
      </div>
    );
  }
}

export default MainBody;
