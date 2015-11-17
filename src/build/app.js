/**ES6 Ready**/
var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import {drawing} from './starrynight';

drawing();

class ReactElement extends React.Component {
	constructor(){
		super();
		this.state = {
						feedElements: {},
						instagramPost: {
							comment: "Use the hashtag #sometag and get noticed!", 
							username: "Eric", 
							image: "http://image-link-archive.meteor.com/images/placeholder-640x480.png",
						},
						currentInstagramElement: 0,
						lastRefreshTime: new Date(),
						//how many posts must there be before allowing the slideshow to begin
						//note if 0 that means that if there is only 1 post, that post will stay on for good
						minimumFeedElements: 0,
						//parameters set
						initialized: false,
						//defualt time to show each image/post
						timePerPost: 10000, 
						//this is to be used with defaultPost; default 5 minutes
						timeToReload: 300000, 
						//to be used inside handleUpdate when the oldtimestamp is expired, default 10 seconds
						timeToPullMorePosts: 10000,
					 };
		
	}
	
	componentDidMount() {
		
		//this.loadPosts();
	}
	
	defaultPost(){
		//this function is for when there is not enough image, 0 is default and means there no min
		//default recheck is after 5 minutes
		setTimeout(()=>{
			this.loadPosts();
		}, this.state.timeToReload);
	}
	
	loadPosts(){
		this.forceUpdate();
		let hashtag = ReactDOM.findDOMNode(this.refs.hashtag).value.trim();
		console.log('trying to search hashtag: ' + hashtag)
		//here make ajax call or get a new list, save inside newestFeedElements, if feed Elements < newestFeedElements, then make feedElemnts = newestFeedElements iff instragramFeedElement === 0 (to ensure we start from the beginning)
		let instagramURL = `https://api.instagram.com/v1/tags/${hashtag}/media/recent?access_token=1634218815.1fb234f.918a7735e59e47d0aa3761894d1d8cd0&callback=?`;
		$.ajax({
			url: instagramURL,
			dataType: 'json',
			success: function(data) {
				if( data.data.length < this.state.minimumFeedElements || data.data.length === 0 ){
					this.defaultPost();
				}else{
					this.setState({
						feedElements: data, 
						lastRefreshTime: new Date()
					});
					this.handleUpdate();
				}
								
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		
		
		
	}
     
	handleUpdate(){	
		//get current element of the result list, initially start with 0.
		let instagramFeedElementId = this.state.currentInstagramElement;
		//get data from post (caption, username, and photo)
		let instagramPostComment = this.state.feedElements.data[instagramFeedElementId].caption.text ;
		let instagramPostUsername = this.state.feedElements.data[instagramFeedElementId].user.username;
		let instagramPostImage = this.state.feedElements.data[instagramFeedElementId].images.standard_resolution.url;
		
		//create object to be copied to state
		let instagramPost = {
			comment: instagramPostComment,
			username: instagramPostUsername,
			image: instagramPostImage,
		}
		
		//default parameters are set
		let timeToPullMorePosts = parseInt(ReactDOM.findDOMNode(this.refs.timeToPullMorePosts).value.trim());
		let timePerPost = parseInt(ReactDOM.findDOMNode(this.refs.timePerPost).value.trim());
				
		this.setState({
			//here we are taking the feed element in state, seeing if we've been though all the posts, if we have reset counter and cycle through all the images again
			currentInstagramElement: (instagramFeedElementId === this.state.feedElements.data.length - 1) ? 0 : (instagramFeedElementId + 1),
			instagramPost: instagramPost
		})
		
		//take last refresh time (time that the posts were consumed), and add X amount of minutes to wait before making a refresh pull from the instagram API
		let newTimeToRefreshPosts = new Date( this.state.lastRefreshTime )
		newTimeToRefreshPosts.setSeconds(this.state.lastRefreshTime.getSeconds() + 30);
		//get Current Time
		let currentTime = new Date()
	
		if( currentTime > newTimeToRefreshPosts ){
			//This is done to ensure no time is stolen from the current post so that it waits the normal time, then it can make a pull
			//this is becuase inside the AJAX call, we call handleUpdate right away after a successfull pull
			setTimeout(()=> {
				this.loadPosts()
			}, timeToPullMorePosts)
		}else
		{
			//we call handleUpdate again after 10 seconds to load the new image ( a new image is loaded because of how we update state.currentInstagramElement
			setTimeout(() => {
				this.handleUpdate();
			}, timePerPost);
		}
		

	}
	
	
	
	submitNewQuery(){
		this.loadPosts();
		this.setState({
			initialized: true
		})
	}
	

	render(){	
		let className = 'newImage';
		let styles = {
			invisible:
			{
				visibility: 'hidden',
			},
			visible:
			{
				visibility: 'visible'
			}
			
		}

		return (

				<div className = {'container'}>
				
					<div className = {'left'}>
						<div className = {'polaroid'}>
							<img src = {this.state.instagramPost.image} alt = "Instagram Post Photo" />
						</div>
					</div>
					
					<div className = {'right'}>
						
						<div className = {'caption'}>
							{this.state.instagramPost.comment}
							<br />
							<span className = {'username'}>-{this.state.instagramPost.username}</span>
						</div>
					</div>
					
					<div className = {'parameter-changes'} style = {!this.state.initialized ? styles.visible : styles.invisible }>
						Hashtag: <input type = "text" ref = 'hashtag' defaultValue = "catsofinstagram" />
						Time Per Post:* <input type = "text" ref = "timePerPost" defaultValue = '10000' />
						Time Before Pulling New Feed:* <input type = "text" ref = "timeToPullMorePosts" defaultValue = '10000' />
						<button onClick = {this.submitNewQuery.bind(this)}>Go!</button>
						*Time in ms, if unsure, leave default values.
					</div>
					
				</div>

		);
	}
}

ReactDOM.render(<ReactElement />, document.getElementById('content'));


