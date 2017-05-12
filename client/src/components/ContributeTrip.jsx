import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';


class ContributeTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	tripName: "",
      dates: [],
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: '',
      comment: '',
      comments: [],
      commentOwner: '',
      vote: 0,
      dateVotedOn: '' 

    };

    this.getTripName = this.getTripName.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.getComment = this.getComment.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onCommentSubmission = this.onCommentSubmission.bind(this);
    this.dateVoteClick = this.dateVoteClick.bind(this);
  }

  componentDidMount() {
  	this.getTripName();
    this.getDates();
    this.getActivities();
    this.getComment();
    this.getDateVotes();
  }

  getTripName() {
  	axios.get('/tripName')
	   .then((result) => {
	      this.setState({tripName: result.data[0]})
	    })
	    .catch((error) => {
	      console.error(error);
	    })
  }

  getDates() {
    axios.get('/dates')
   .then((result) => {
     console.log('datesdata', result.data);
      this.setState({dates: result.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getActivities() {
    axios.get('/activities')
   .then((result) => {
      this.setState({activities: result.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getComment() {
    axios.get('/comments')
    .then((result) => {
      this.setState({comments: result.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  onActivityClick(e) {
    e.preventDefault();
    var activityObject = {
       activity: this.state.activityName,
       activityDescription: this.state.activityDescription,
       activityCost: this.state.activityCost
    }
    axios.post('/newactivity', activityObject)
      .then((result) => {
        console.log(result)
        this.props.history.push('/contributeTrip')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onCommentSubmission(e) {
    e.preventDefault();
      axios.post('/comments', {comment: this.state.comment, commentOwner: this.props.loggedInUser})
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
<<<<<<< HEAD
    }
    //get date votes to be rendered next time user logs in
    getDateVotes () {
        
    }
=======
  }
>>>>>>> 42d717a030220ded84bab66adee48951553d4725

  //get date votes to be rendered next time user logs in
  getDateVotes () {

  }

<<<<<<< HEAD
      axios.post('/comments', {comment: this.state.comment + ' -' + this.state.commentOwner})
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //when user clicks on a date, post to database
    dateVoteClick(e,dateId) {
      e.preventDefault();
      console.log('dateid inside',dateId);
      this.setState({
        vote: this.state.vote++,
        dateVotedOn: dateId
      })

      axios.post('/addVote', {vote: this.state.vote, dateVotedOn: this.state.dateVotedOn})
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      }
=======
  //when user clicks on a date, post to database
  dateVoteClick(e) {
    e.preventDefault();
    this.setState({vote: this.state.vote++})
    alert(this.state.vote);
    axios.post('/addVote', {vote: this.state.vote})
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
>>>>>>> 42d717a030220ded84bab66adee48951553d4725

  render() {
    return (

      <div>
        <Header />

        <div id="contributeTripParent">
          <h4 id="subheader"> stay trippy! </h4>

          <div id="firstHalf">
            <div><h1>Destination</h1><label>{this.state.tripName.destination}</label></div><br/>
            <h1>Est. Cost</h1> <label>${this.state.tripName.est_cost}</label><br/>
            <h1>Date Options</h1><br/>
<<<<<<< HEAD
            {this.state.dates.map(date => (<div><div>{date.dateOption + ' '}<button id="voteButton" onClick={(e)=>(this.dateVoteClick(e, date.id))}>vote</button></div> <br/> </div> ))}

            <br/><h1> Comments </h1><br/>
            {this.state.comments.map(comment => (<div><div>{comment.comment}</div><br/></div>))}
=======
            {this.state.dates.map(date => (<div><div>{date.dateOption + ' '}<button id="voteButton" onClick={this.dateVoteClick}>vote</button></div> <br/> </div> ))}

            <h1> Comments: </h1><br/>
            <label>Add a comment</label>
            {this.state.comments.map(comment => (<div><div>{comment.comment} - {comment.username}</div><br/></div>))}
>>>>>>> 42d717a030220ded84bab66adee48951553d4725

            <textarea rows="4" cols="40" onChange={(e) => this.setState({comment: e.target.value})} placeholder="add a comment!"></textarea>
            <button id="secondary" onClick={this.onCommentSubmission}>Submit</button>
          </div>

          <div id="secondHalf">

            <h1>Activity Options</h1>
            {this.state.activities.map(activity => (
              <div><br/>
                <div>   <strong>Name:</strong> {activity.activityName}<br/>
                        <strong>Description:</strong> {activity.activityDescription}<br/>
                        <strong>Cost:</strong> ${activity.est_cost} <button id="voteButton" onClick={e => e.preventDefault()}>vote</button><br/>
                    </div>
                </div>
              )
             )
            }<br/><br/>
            <h1>Add an Activity</h1>

            <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>

            <button id="activitybtn" onClick={this.onActivityClick}>+</button>


          </div>
        </div>
      </div>
    )
  }
}

export default ContributeTrip;
