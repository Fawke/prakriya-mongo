import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import app from '../../styles/app.json';
import select from '../../styles/select.json';
import dialog from '../../styles/dialog.json';
import CONFIG from '../../config/index';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import IconButton from 'material-ui/IconButton';

const styles = {
  paper: {
    margin: '5px',
    padding: '5px',
    width: 'auto',
    height: '120px',
    borderRadius: '2px'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '4px',
    background: '#eee'
  }
}

export default class AddProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      Name: '',
      Mode: '',
      Description: '',
      OrganizationName: '',
      Courses: [],
      NameErrorText: '',
      ModeErrorText: '',
      DescriptionErrorText: '',
      OrganizationNameErrorText: '',
      CourseErrorText: '',
      disableSave: true
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMode = this.onChangeMode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeOrganizationName = this.onChangeOrganizationName.bind(this);
    this.resetFields = this.resetFields.bind(this);
    // this.handleAdd = this.handleAdd.bind(this); 
    this.addProgram = this.addProgram.bind(this);   
    this.validationSuccess = this.validationSuccess.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
  }

  componentWillMount() {
    if (this.props.openDialog) {
      this.setState({ showDialog: true, Name: this.props.program.name, Mode: this.props.program.mode, Description: this.props.program.Description, OrganizationName: this.props.program.organizationName, Courses: this.props.program.courses })
    }
  }

  onChangeName(e) {
    this.setState({ Name: e.target.value, NameErrorText: '' })
  }

  onChangeMode(e, key, value) {
    console.log('mode e: ', value)
    this.setState({ Mode: value, ModeErrorText: '' })
  }

  onChangeCourse(e, key, values) {
    console.log('course e: ', values);
    this.setState({Courses: values, CourseErrorText: ''});
  }

  // onChangeDuration(e) {
  //   this.setState({ Duration: e.target.value, DurationErrorText: '' })
  // }

  onChangeOrganizationName(e) {
    this.setState({ OrganizationName: e.target.value, OrganizationNameErrorText: '' });
  }

  onChangeDescription(e) {
    this.setState({ Description: e.target.value, DescriptionErrorText: '' });
  }

  // handleSkillChange(e) {
  //   this.setState({ SkillName: e.target.value, disableSave: false })
  // }

  // onAddSkill() {
  //   if (this.state.SkillName.trim().length != 0) {
  //     let skill = this.state.Skills
  //     skill.push(this.state.SkillName)
  //     this.setState({ Skills: skill, SkillName: '', disableSave: true })
  //   }
  // }

  handleUpdate() {
    const program = {};
    program.Name = this.state.Name;
    program.Mode = this.state.Mode;
    program.Description = this.state.Description;
    program.OrganizationName = this.state.OrganizationName;
    program.Courses = this.state.Courses;
    this.props.handleUpdate(program);
  }


  handleOpen() {
    this.setState({ showDialog: true })
  }

  handleClose(e, action) {
    console.log('entered handle close function');
    if (action == 'ADD') {
      console.log('entered add condition');
      if (this.validationSuccess()) {
        console.log('entered validated add condition');
        this.addProgram()
        this.setState({ showDialog: false })
        this.resetFields()
      }
    } else if (action == 'EDIT') {
      console.log('entered edit condition');
      if (this.validationSuccess()) {
        this.handleUpdate()
        this.setState({ showDialog: false })
        if (this.props.openDialog)
          this.props.handleClose()
        this.resetFields()
      }
    } else {
      console.log('entered the else condition');
      this.setState({ showDialog: false })
      if (this.props.openDialog)
        this.props.handleClose()
      this.resetFields()
    }
  }

  addProgram() {
    console.log('entered add program')
    const program = {};
    program.name = this.state.Name;
    program.mode = this.state.Mode;
    program.description = this.state.Description;
    program.organizationName = this.state.OrganizationName;
    program.courses = this.state.Courses;
    this.props.handleAdd(program);
  }

  // handleSkillDelete(perm) {
  //   let skill = this.state.Skills.filter(function (control) {
  //     return perm != control
  //   })
  //   this.setState({ Skills: skill, disableSave: false })
  // }

  resetFields() {
    this.setState({
      Name: '',
      Mode: '',
      Description: '',
      OrganizationName: '',
      Courses: [],
      NameErrorText: '',
      ModeErrorText: '',
      DurationErrorText: '',
      OrganizationNameErrorText: ''
    })
  }

  // handleUpdate() {
  //   let th = this
  //   let course = {}
  //   course.ID = this.props.course.ID;
  //   course.Name = this.state.Name;
  //   course.Mode = this.state.Mode;
  //   course.Duration = this.state.Duration;
  // 	course.Skills = this.state.Skills;
  //   course.History = '';
  //   this.props.handleUpdate(course);
  // }


  // handleAdd() {
  //   let th = this
  //   let course = {}
  //   console.log('id: ' + th.state.Name + '_' + th.state.Mode);
  //   course.ID = th.state.Name + '_' + th.state.Mode;
  //   course.Name = this.state.Name;
  //   course.Mode = this.state.Mode;
  //   course.Skills = this.state.Skills;
  //   course.Assignments = [];
  //   course.Schedule = [];
  //   course.Removed = false;
  //   course.Duration = this.state.Duration;
  //   course.History = '';
  //   this.props.handleAdd(course);
  // }

  validationSuccess() {
    // let durationPattern = /[0-9]{1,}/
    if (this.state.Name.trim().length == 0) {
      this.setState({ NameErrorText: 'This field cannot be empty.' })
    } else if (this.state.Mode.trim().length == 0) {
      this.setState({ ModeErrorText: 'This field cannot be empty.' })
    } else if (this.state.Description.trim().length == 0) {
      this.setState({ DescriptionErrorText: 'This field cannot be empty.' })
    } else if (this.state.OrganizationName.trim().length == 0) {
      this.setState({ OrganizationNameErrorText: 'This field cannot be empty.' })
    } else {
      return true
    }
    return false
  }

  render() {
    let th = this
    let actions,
      title
    if (this.props.openDialog) {
      actions = [< FlatButton label="Cancel" onTouchTap={
        (e) => this.handleClose(e, 'CLOSE')
      }
        style={
          dialog.actionButton
        } />, < FlatButton label="Update Program" onClick={
          (e) => this.handleClose(e, 'EDIT')
        }
          style={
            dialog.actionButton
          } />
      ]
      title = 'EDIT Program'
    } else {
      actions = [< FlatButton label="Cancel" onTouchTap={
        (e) => this.handleClose(e, 'CLOSE')
      }
        style={
          dialog.actionButton
        } />, < FlatButton label="Add Program" onClick={
          (e) => this.handleClose(e, 'ADD')
        }
          style={
            dialog.actionButton
          } />
      ]
      title = 'ADD PROGRAM'
    }
    return (  
      <div>
        <FloatingActionButton mini={true} style={app.fab} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog bodyStyle={dialog.body} title={title} titleStyle={dialog.title} actionsContainerStyle={dialog.actionsContainer} open={this.state.showDialog} autoScrollBodyContent={true} onRequestClose={() => this.handleClose('CLOSE')} actions={actions}>
          <div>
            <div style={dialog.box100}>
              <TextField style={{
                width: '100%'
              }} hintText="Program Name" floatingLabelText="Name *" floatingLabelStyle={app.mandatoryField} value={this.state.Name} onChange={this.onChangeName} errorText={this.state.NameErrorText} />
            </div>
          </div>
          <div>
            <div style={dialog.box100}>
              <SelectField style={{
                width: '100%'
              }} hintText="Mode" floatingLabelText='Mode *' floatingLabelStyle={app.mandatoryField} value={this.state.Mode} onChange={this.onChangeMode} errorText={this.state.ModeErrorText} menuItemStyle={select.menu} listStyle={select.list} selectedMenuItemStyle={select.selectedMenu} maxHeight={600}>
                {CONFIG.MODES.map(function (mode, key) {
                  return (<MenuItem key={key} value={mode} primaryText={mode} />)
                })
                }
              </SelectField>
            </div>
          </div>

          <div>
            <div style={dialog.box100}>
              <TextField style={{
                width: '100%'
              }} hintText="Organization Name" floatingLabelText='Organization Name *' floatingLabelStyle={app.mandatoryField} value={this.state.OrganizationName} onChange={this.onChangeOrganizationName} errorText={this.state.OrganizationNameErrorText} menuItemStyle={select.menu} listStyle={select.list} selectedMenuItemStyle={select.selectedMenu} maxHeight={600} />
            </div>
          </div>

          <div>
            <div style={dialog.box100}>
              <TextField style={{
                width: '100%'
              }} hintText="Description" floatingLabelText="Description *" floatingLabelStyle={app.mandatoryField} value={this.state.Description} onChange={this.onChangeDescription} errorText={this.state.DescriptionErrorText} />
            </div>
          </div>

          <div style={dialog.box100}>
            <SelectField multiple={true} style={{
              width: '100%'
            }} hintText="Courses" floatingLabelText='Course(s) *' floatingLabelStyle={app.mandatoryField} value={this.state.Courses} onChange={this.onChangeCourse} errorText={this.state.CourseErrorText} menuItemStyle={select.menu} listStyle={select.list} selectedMenuItemStyle={select.selectedMenu} maxHeight={600}>
              {
                this.props.courses.map((course, key) => {
                  return (<MenuItem key={key} value={course.Name} primaryText={course.Name} />)
              })
              }
            </SelectField>
          </div>

        </Dialog>
      </div>
    )
  }
}
