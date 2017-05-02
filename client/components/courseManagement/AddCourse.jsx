import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	addButton: {
		position:'fixed',
	  bottom: '60px',
	  right: '15px',
	  zIndex: 2
	},
	dialog: {
	  textAlign: 'center'
	},
	paper: {
		margin: '5px',
		padding: '5px',
		width: 'auto',
		height: '120px',
		borderRadius: '2px'
	},
	wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
	chip: {
    margin: '4px',
    background: '#eee'
  }
}

export default class AddCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDialog: false,
			CourseName: '',
			AssessmentName: '',
			AssessmentCategories: [],
			Duration: '',
			key: -1
		}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.handleCourseDelete = this.handleCourseDelete.bind(this);
		this.onChangeAssessmentCategory = this.onChangeAssessmentCategory.bind(this);
		this.onChangeAssessment = this.onChangeAssessment.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.resetFields = this.resetFields.bind(this);
	}
	componentDidMount() {
		if(this.props.openDialog) {
			this.setState({
				showDialog: true,
				CourseName: this.props.course.CourseName,
				AssessmentCategories: this.props.course.AssessmentCategories,
				Duration: this.props.course.Duration,
				disableSave: true,
			})
		}
	}
	onChangeName(e) {
		this.setState({
			CourseName: e.target.value
		})
	}
	onChangeDuration(e) {
		this.setState({
			Duration: e.target.value
		})
	}
	onChangeAssessmentCategory() {
		let assessment = this.state.AssessmentCategories;
		assessment.push(this.state.AssessmentName);
		this.setState({
			AssessmentCategories: assessment,
			AssessmentName: '',
			disableSave: true
		})
	}
	onChangeAssessment(e) {
		this.setState({
			AssessmentName: e.target.value,
			disableSave: false
		})
	}
	handleOpen() {
		this.setState({
			showDialog: true
		})
	}
	handleClose() {
		this.setState({
			showDialog: false
		})
		this.props.handleClose();
	}
	handleCourseDelete(perm) {
		let category = this.state.AssessmentCategories.filter(function(control) {
			return perm != control
		})
		this.setState({
			AssessmentCategories: category,
			disableSave: false
		})
	}

	resetFields() {
		this.setState({
			CourseName : '',
			AssessmentCategories : [],
			Duration: ''
		});
	}

	handleUpdate() {
		let th = this
		let course = {}
		course.CourseID = this.props.course.CourseID;
		course.CourseName = this.state.CourseName;
		course.AssessmentCategories = this.state.AssessmentCategories;
		course.Duration = this.state.Duration;
		this.resetFields();
		this.handleClose();
		this.props.handleUpdate(course);
	}


	render() {
		let th = this;
		return(
			<div>
				<Dialog
		    	style={styles.dialog}
          title="Update Course"
          open={this.state.showDialog}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
        <TextField
						    		hintText="Course name"
						    		floatingLabelText="Name"
						    		value={this.state.CourseName}
						    		onChange={this.onChangeName}
						    	/><br/>
						    	<TextField
						    		hintText="assessment"
						    		floatingLabelText="Assessment Category"
						    		value={this.state.AssessmentName}
						    		onChange={this.onChangeAssessment}
						    	/>
						    	<FlatButton
						    		label="Apply"
						    		primary={true}
						    		disabled={this.state.disableSave}
						    		icon={<SaveIcon />}
						    		onClick={this.onChangeAssessmentCategory}
						    	/>
									<Paper style={styles.paper} zDepth={1} >
												<div style={styles.wrapper}>
													{
														this.state.AssessmentCategories.map(function (category, index) {
															return(
																<Chip
																	onRequestDelete={() => th.handleCourseDelete(category)}
												          style={styles.chip}
												          key={index}
												        >
												          <span style={styles.chipName}>{category}</span>
												        </Chip>
											        )
														})
													}
												</div>
									</Paper>
									<TextField
									    		hintText="In weeks"
									    		floatingLabelText="Duration"
									    		value={this.state.Duration}
									    		onChange={this.onChangeDuration}
									    	/>
        					<div>
      						<RaisedButton
						    	 		label="Update Course"
						    	   	primary={true}
						    			onClick={this.handleUpdate}
						    	 	/>
				    				&emsp;
					    			<RaisedButton
						    	 		label="Cancel"
						    	   	primary={true}
						    			onTouchTap={this.handleClose}
						    	 	/>
				    			</div>
				    			</Dialog>
				    			</div>

		)
	}
}
