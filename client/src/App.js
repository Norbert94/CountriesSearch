import React, { Component } from 'react';
import ResultTable from './component/ResultTable';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    type: 'fullText'
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`/api/world?name=${encodeURIComponent(this.state.post)}&type=${encodeURIComponent(this.state.type)}`);
    const body = await response.text();
    
    this.setState({ responseToPost: JSON.parse(body) });
  };

render() {
  const options = [
    {label:"Full Name", value: "fullText"},
    {label: 'Country Name', value: 'name'},
    {label: 'Code', value: 'alpha'}
  ];
  const defaultOption = options[0];
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Search for countries:</strong>
          </p>
          <div className='dropdownCollection'>
            <Dropdown options={options}
                      onChange={e => {this.setState({type: e.value})}} 
                      value={this.state.type}
                      placeholder="Select an option" />
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
        <ResultTable data={this.state}/>
      </div>
    );
  }
}

export default App;