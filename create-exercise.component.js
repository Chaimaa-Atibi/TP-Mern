import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      date: new Date(),
      news: '',
      email: '',
      photo: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
  .then(response => {
    if (response.data.length > 0) {
      this.setState({ 
        users: response.data.map(user => user.username),
        username: response.data[0].username
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onChangeNews(e) {
    this.setState({
      news: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
  
    const exercise = {
      username: this.state.username,
      gender: this.state.gender,
      date: this.state.date,
      news: this.state.news,
      email: this.state.email,
      photo: this.state.photo,
    };
  
    console.log(exercise);
    axios.post('http://localhost:5000/exercises/add', exercise)
  .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New User Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Gender: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.gender}
                onChange={this.onChangeGender}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group"> 
            <label>News: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.news}
                onChange={this.onChangeNews}
                />
          </div>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Photo: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.photo}
                onChange={this.onChangePhoto}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Create User Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
