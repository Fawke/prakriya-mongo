import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import Request from 'superagent';

const items = [
  <MenuItem key={1} value={"mentor"} primaryText="Mentor" />,
  <MenuItem key={2} value={"administrator"} primaryText="Administrator" />,
  <MenuItem key={3} value={"sradministrator"} primaryText="Sr. Administrator" />,
  <MenuItem key={4} value={"sponsor"} primaryText="Sponsor" />
];



const addButtonStyle = {
	position:'fixed',
  top: '13%',
  right:'5%',
  zIndex: 2
}

const dialogStyle = {
  textAlign: 'center'
};

export default class AddUser extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			open: false,
			name: '',
			username: '',
			email: '',
			password: '',
			cpassword: '',
			role: '',
			roles: []
		}
	
		this.handleOpen = this.handleOpen.bind(this);
	  this.handleClose = this.handleClose.bind(this);
		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.onChangePassword = this.onChangePassword.bind(this)
		this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
		this.onChangeRole = this.onChangeRole.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		let th = this
		Request
			.get('/admin/roles')
			.set({'Authorization': localStorage.getItem('token')})
			.end(function(err, res) {
				if(err)
		    	console.log(err);
		    else {
		    	th.setState({
		    		roles: res.body
		    	})
		    }
			})
	}
	handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };
	onChangeName(e) {
		this.setState({name: e.target.value})
	}
	onChangeUsername(e) {
		this.setState({username: e.target.value})
	}
	onChangeEmail(e) {
		this.setState({email: e.target.value})
	}
	onChangePassword(e) {
		this.setState({password: e.target.value})
	}
	onChangeConfirmPassword(e) {
		this.setState({cpassword: e.target.value})
	}
	onChangeRole(event, key, value) {
		this.setState({role: value})
	}
	handleSubmit() {
		let th = this
		let user = {}
		user.name = this.state.name
		user.username = this.state.username
		user.email = this.state.email
		user.password = this.state.password
		user.role = this.state.role
		Request
			.post('/admin/adduser')
			.set({'Authorization': localStorage.getItem('token')})
			.send(user)
			.end(function(err, res){
		    // Do something
		    let userObj
		    if(res.text)
		    	userObj = JSON.parse(res.text)
		    th.context.router.push('/app')
		  });
	}

	render() {
		const style = {
			fontFamily: 'sans-serif',
			margin: 'auto',
			width: '500px'
		}
		return(
			<div>
				
					<FloatingActionButton style={addButtonStyle} mini={true} onTouchTap={this.handleOpen} >
			      <ContentAdd />
			    </FloatingActionButton>
				
				
		    <Dialog style={dialogStyle}
          title="Add new User"
          modal={false}
          open={this.state.open}
          
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
      			
      						<TextField 
						    		hintText="Display name" 
						    		floatingLabelText="Name"
						    		onChange={this.onChangeName} 
						    	/><br/>
						    	<TextField 
						    		hintText="Should not be your name" 
						    		floatingLabelText="Username"
						    		onChange={this.onChangeUsername} 
						    	/><br/>
						    	<TextField 
						    		hintText="This will be unique"
						    		floatingLabelText="Email" 
						    		onChange={this.onChangeEmail} 
						    	/><br/>
						    	<TextField 
						    		floatingLabelText="Password" 
						    		hintText="Secure your account" 
						    		type="password" 
						    		onChange={this.onChangePassword} 
						    	/><br/>
						    	<TextField 
						    		floatingLabelText="Confirm Password" 
						    		hintText="Confirm password" 
						    		type="password" 
						    		onChange={this.onChangeConfirmPassword} 
						    	/><br/>
						    	<SelectField
						        onChange={this.onChangeRole}
						        floatingLabelText="Select Role"
						        value={this.state.role}
						      >
						        {this.state.roles}
						      </SelectField>
      					
      			
				    			<div>
				    				<RaisedButton 
						    	 		label="Add User" 
						    	   	primary={true}
						    			onClick={this.handleSubmit}
						    	 	/>&nbsp;	
					    		
					    			<RaisedButton 
						    	 		label="Cancel" 
						    	   	primary={true}
						    			onClick={this.handleSubmit}
						    			onTouchTap={this.handleClose}
						    	 	/>	
				    			</div>
				    			
				    		
        </Dialog>
			</div>
		)
	}
}

AddUser.contextTypes = {
  router: React.PropTypes.object.isRequired
};