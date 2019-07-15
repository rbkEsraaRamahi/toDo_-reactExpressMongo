import React from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000')
      .then(data => data.json())
      .then((data) => { this.setState({ tasks: data }) 
      console.log("your data", data)});
      
  }




  render(){
    return (
      
      <div className="App">
        <header className="App-header">
        <form>
    <label>
      new task:
      <input type="text" name="task" />
    </label>
    <input type="submit" value="Submit" />
  </form>

  <ul>
        {this.state.tasks.map(hit =>
          <li key={hit._id}>
            {hit.task}
          </li>
        )}
      </ul>


        </header>
      </div>
    );
  }
}
export default App;
