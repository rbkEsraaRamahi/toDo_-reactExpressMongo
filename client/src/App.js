import React from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      task: '',
      id:''
    }

    this.getAll = this.getAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    // this.edit = this.edit.bind(this);
    // this.delete = this.delete.bind(this);
  }

  componentWillMount(){
    console.log("willMount")
  }

  componentDidMount(){
    console.log("didMount")
    this.getAll();
  }

  getAll=()=>{
    fetch('http://localhost:5000')
      .then(data => data.json())
      .then((data) => { this.setState({ tasks: data }) 
      console.log("your data", data)});
  }


  handleChange(task){
    //console.log(task.target.value)
    this.setState({task:task.target.value})
  }

add=(e)=>{
   e.preventDefault();
 
  fetch('http://localhost:5000', {
    method: 'POST',
    body: JSON.stringify({task:this.state.task}),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .then(res=> this.getAll())
  .catch(error => console.error('Error:', error));
  

}

edit=(item)=>{
  //var task = item.task
  var id = item._id
  
  var pop = prompt("Please edit this task");
  
  return fetch('http://localhost:5000', {
  method: 'PUT',
  body: JSON.stringify({_id: id, task:pop}),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.then(res=> this.getAll())
.catch(error => console.error('Error:', error));
}

delete=(item)=>{
  console.log(item._id)
   fetch('http://localhost:5000', {
  method: 'DELETE',
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({_id: item._id})
  
}).then(res => res.json())
return this.getAll()
// .then(res=> this.getAll())
.catch(error => console.error('Error:', error));
}

  render(){
    return (
      
      <div className="App">
        <header className="App-header">
        <form onSubmit={this.add}>
    <label>
      new task:
      <input type="text" name="task" value={this.state.input} onChange={this.handleChange}/>
    </label>
    <input type="submit" value="Submit" />
  </form>

  <ul>
        {this.state.tasks.map(hit =>
          <li key={hit._id}>
            {hit.task}
          <button onClick={this.edit.bind(this, hit)}>edit</button>
          <button onClick={this.delete.bind(this, hit)}>delete</button>
          </li>
          
        )}
      </ul>


        </header>
      </div>
    );
  }
}
export default App;
