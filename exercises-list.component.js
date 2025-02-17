import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.gender}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>{props.exercise.news}</td>
      <td>{props.exercise.email}</td>
      <td>{props.exercise.photo}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )


export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []};
      }
      componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
         .then(response => {
           this.setState({ exercises: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }
      deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
          .then(res => console.log(res.data));
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      }
      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }
  render() {
    return (
      <div>
        <div>
  <h3>Logged Users</h3>
  <table className="table">
    <thead className="thead-light">
      <tr>
        <th>Username</th>
        <th>Gender</th>
        <th>Date</th>
        <th>News</th>
        <th>Email</th>
        <th>Photo</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { this.exerciseList() }
    </tbody>
  </table>
</div>
      </div>
    )
  }
}