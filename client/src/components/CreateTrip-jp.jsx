import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import HeaderJp from './Header-jp';
import InviteFriendsJp from './InviteFriends-jp';
import YelpSearchJp from './YelpSearch-jp';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import Calendar from './Calendar';

class CreateTripJp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      date: '',
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: '',
      tripName: '',
      destination: '',
      estCost: '',
      votes: 0,
      isInviteFriendModalOpen: false,
      showReqFields: false,
      datePlaceholder: '',
      activityPlaceholder: '',
      descriptionPlaceholder: '',
      costPlaceholder: ''
    };
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onDateSubmission = this.onDateSubmission.bind(this);
    this.onAddTripClick = this.onAddTripClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertYelpActivityToForm = this.insertYelpActivityToForm.bind(this);
    this.setCalendarPlaceholder = this.setCalendarPlaceholder.bind(this);

  }

  setCalendarPlaceholder(dateString){
  this.setState({ datePlaceholder: dateString })
  }
  //Function to be passed to yelp search so that clicking one of the items from the search will autofill the activity form with said activity and description/
  //link with the url
  insertYelpActivityToForm(activity, url) {
    this.setState({activityPlaceholder: activity, descriptionPlaceholder: url, activityName: activity, activityDescription: url});
  }
  // Toggle InviteFriends modal
  toggleModal(e) {
    e.preventDefault();
    if(!this.state.tripName) {
      this.setState({
        showReqFields: true
      })
    } else {
      this.setState({
        isInviteFriendModalOpen: !this.state.isInviteFriendModalOpen
      });
    }
  }
  // Add new activity to activities array on '+' click (doesn't post directly to DB)
  onActivityClick(e) {
    e.preventDefault();
    var listOfActivities = this.state.activities;
    var activityObject = {
       activityName: this.state.activityName,
       activityDescription: this.state.activityDescription,
       activityCost: this.state.activityCost
    };
    listOfActivities.push(activityObject);
    this.setState({activities: listOfActivities, activityPlaceholder: '', descriptionPlaceholder: '', costPlaceholder: ''})
  }
  // Add new date to dates array on '+' click (doesn't post directly to DB)
  onDateSubmission (e) {
    e.preventDefault();
    var listOfDates = this.state.dates;
    listOfDates.push(this.state.datePlaceholder);
    this.setState({dates: listOfDates, datePlaceholder: ''});
  }
  // Create new trip
  onAddTripClick (e, friend) {
    e.preventDefault();
    axios.post('/tripInfo', {loggedInUser: this.props.loggedInUser, dates: this.state.dates, activities: this.state.activities, destination: this.state.destination, tripName: this.state.tripName, estCost: this.state.estCost, friend: friend, votes: this.state.votes})
      .then((response) => {
        console.log('Successfully posted trip to DB')
        this.props.history.push('/profile')
      })
      .catch((error) => {
        console.log('Error posting trip to DB', error)
      })
  }
  handleChange(date) {
    this.setState({
      date: date,
      datePlaceholder: date
    });
  }
  render() {
    return (
      <div id="createTrip">
        <HeaderJp loggedInUser = {this.props.loggedInUser} />
        <div className="container">
          <div className="content narrow">
            <form>
            <h2 id="pageheader">旅行を作ろう</h2>
            <div className="column1">
              <label>旅の名前</label>
              <input name="tripName" type="text" onChange={e => this.setState({tripName: e.target.value})}/>
              <br/><br/><br/><br/>
              <label>目的地</label>
              <input name="tripName" type="text" onChange={e => this.setState({destination: e.target.value})} />
              <br/><br/><br/><br/>
              <label>期間</label>
              {this.state.dates.map((date,index) => {
                return(<div key={index}><li className="dateItem">{date}</li></div>)})}

              <input name="dateRange" placeholder="mm/dd/yyyy - mm/dd/yyyy" value={this.state.datePlaceholder} type ="text" onChange={e => this.setState({datePlaceholder: e.target.value})}　readOnly/>
              <Calendar callbackParent = {this.setCalendarPlaceholder}/>
          <button id="secondary" onClick={this.onDateSubmission}>+</button>
            </div>
            <div className="column2">
              <label>予想の値段</label>
              <input name="estimatedCost" type="text" placeholder="$" onChange={e => this.setState({estCost: e.target.value})}/>
              {this.state.activities.map ((activity,index) =>
                (<div key={index} id='activityList'>
                  <div className="activityGroup">
                    <br/><br/><br/><br/>
                    <li><span>アクティビティ:</span> {activity.activityName} </li>
                    <li><span>内容:</span> {activity.activityDescription} </li>
                    <li><span>値段:</span> ${activity.activityCost} </li>
                  </div>
                </div>
              ))}
              <br/><br/><br/><br/>
              <label>アクティビティ</label>
              <input name="activity" type ="text" placeholder="アクティビティ" value={this.state.activityPlaceholder} onChange={e => this.setState({activityName: e.target.value, activityPlaceholder: e.target.value})}/>
              <input name="activity" type ="text" placeholder="内容" value={this.state.descriptionPlaceholder} onChange={e => this.setState({activityDescription: e.target.value, descriptionPlaceholder: e.target.value})}/>
              <input name="activity" type ="text" placeholder="値段" value={this.state.costPlaceholder} onChange={e => this.setState({activityCost: e.target.value, costPlaceholder: e.target.value})}/>
              <button id="secondary" onClick={this.onActivityClick}>+</button>
            </div>
            <button id="primary" onClick={this.toggleModal}>次へ</button>
          </form>
          {this.state.showReqFields ? (<p className="errorMsg">旅行の名前を入れてません。</p>) : null }
          </div>
        </div>
        <InviteFriendsJp show = {this.state.isInviteFriendModalOpen} onClose = {this.toggleModal} onAddTripClick = {this.onAddTripClick} onClose={this.toggleModal} updateCurrentTrip = {this.props.updateCurrentTrip} >
          <h3>シェアする</h3>
        </InviteFriendsJp>
        <YelpSearchJp insertYelpActivityToForm={this.insertYelpActivityToForm}/>
      </div>
    )
  }
}
export default CreateTripJp;
