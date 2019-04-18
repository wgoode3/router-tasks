import React, { Component } from 'react';
import './App.css';
import "react-router";
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <h1>Welcome to Home Component</h1>
    )
  }
}

class Alpha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    }
  }
  doSomething = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state.task);
    this.props.history.push("/beta");
  }
  taskChange = (e) => {
    this.setState({task: e.target.value});
  }
  render() {
    return (
      <div>
        <h1>Welcome to Alpha Component</h1>
        <form onSubmit={this.doSomething}>
          <input type="text" onChange={this.taskChange} />
          <button type="submit">Do Something</button>
        </form>
      </div>

    )
  }
}

class Beta extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Beta Component</h1>
        {
          this.props.tasks.map( (task, index) => 
            <li key={index}>{task}</li>
          )
        }
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        "Learn React",
        "Learn Express",
        "Learn Redux"
      ]
    }
  }

  create = (task) => {
    this.setState({tasks: [...this.state.tasks, task]});
  }

  render() {
    return (
      <div>
        <h1>Router Demo</h1>
        <BrowserRouter>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/alpha">alpha</Link></li>
            <li><Link to="/beta">beta</Link></li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/alpha"
            render={(props) => <Alpha {...props} onCreate={this.create} />}
          />
          <Route 
            path='/beta' 
            render={(props) => <Beta {...props} tasks={this.state.tasks} />} 
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
