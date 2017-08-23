import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import HistoryIcon from 'material-ui/svg-icons/action/history';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ScheduleIcon from 'material-ui/svg-icons/action/schedule';
import OrganizationIcon from 'material-ui/svg-icons/action/store';
import SkillsIcon from 'material-ui/svg-icons/action/stars';
import CourseSubCard from './CourseSubCard.jsx';
// import AddCourse from './AddCourse.jsx';
import AddProgram from './AddProgram.jsx';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DateIcon from 'material-ui/svg-icons/action/date-range';

const styles = {
  heading: {
    textAlign: 'center'
  },
  col: {
    marginBottom: 20
  },
  deleteDialog: {
    backgroundColor: '#DDDBF1',
    border: '10px solid teal'
  },
  actionsContainer: {
    backgroundColor: 'teal',
    borderTop: '0px',
    marginTop: '0px'
  },
  actionButton: {
    backgroundColor: '#DDDBF1',
    width: '50%',
    color: 'teal',
    border: '1px solid teal',
    height: '100%'
  }
}

export default class ProgramCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      hide: 'inline',
      show: 'none',
      showDeleteDialog: false,
      openDialog: false,
      edit: false,
      showDetailDialog: false
    }
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleEditProgram = this.handleEditProgram.bind(this);
    // this.handleEditCourse = this.handleEditCourse.bind(this);
    // this.handleUpdateProgram = this.handleUpdateProgram.bind(this);
    // this.handleUpdateCourse = this.handleUpdateCourse.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleDeleteProgram = this.handleDeleteProgram.bind(this);
    // this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    // this.formatDate = this.formatDate.bind(this);
    this.handleEditDetail = this.handleEditDetail.bind(this);
    this.openDetailDialog = this.openDetailDialog.bind(this);
    this.closeDetailDialog = this.closeDetailDialog.bind(this);
  }

  componentWillMount() {
    this.props.setCurrentProgram();
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
    if (this.state.expanded) {
      this.setState({ expanded: false, hide: 'inline', show: 'none' });
    } else {
      this.setState({ expanded: true, hide: 'none', show: 'inline' });
    }
  };

  handleEditDetail() {
    this.setState({
      edit: true
    })
  }

  handleEditProgram() {
    this.setState({ openDialog: true });
  }

  // handleEditCourse() {
  //   this.setState({openDialog: true})
  // }

  handleClose() {
    this.setState({ openDialog: false, showAddCategoryDialog: false })
  }

  openDeleteDialog() {
    this.setState({ showDeleteDialog: true })
  }

  closeDeleteDialog() {
    this.setState({ showDeleteDialog: false })
  }

  openDetailDialog() {
    this.setState({ showDetailDialog: true })
  }

  closeDetailDialog() {
    this.setState({ showDetailDialog: false })
  }

  // handleUpdateProgram(program) {
  //   this.props.updateProgram(program);
  // }

  // handleUpdateCourse(course) {
  //   course.History = this.props.course.History;
  //   this.props.updateCourse(course);
  // }

  // handleDeleteCourse(course) {
  //   this.props.deleteCourse(this.props.course);
  // }

  // formatDate(date) {
  //   if (date) {
  //     return Moment(date).fromNow();
  //     // return Humanize.naturalDay(newdate,'H:i:s dS M, Y')
  //   } else
  //     return '-'
  // }

  render() {
    const deleteDialogActions = [< FlatButton label="Cancel" onTouchTap={
      this.closeDeleteDialog
    }
      style={
        styles.actionButton
      } />, < FlatButton label="Delete" onTouchTap={
        this.closeDeleteDialog
      }
        onClick={
          this.handleDeleteCourse
        }
        style={
          styles.actionButton
        } />
    ]
    let th = this
    // let history = this.props.course.History.split('\n');
    // history = history[history.length - 2].split(' on ');
    // if (history[1].includes(':')) {
    //   let date = history[1].split(' : ');
    //   history[1] = date[0];
    // }
    let bgColor = this.props.bgColor;
    let bgIcon = this.props.bgIcon;
    
    return (
      <div>
        <Card style={{
          width: '300px',
          marginRight: '20px',
          marginBottom: '20px',
          background: bgColor
        }}>
          <CardHeader title={`${this.props.program.name} - ${this.props.program.mode}`} avatar={<Avatar backgroundColor={
            bgIcon
          } > {
              this.props.program.mode.charAt(0).toUpperCase()
            } </Avatar>} />

          <IconButton tooltip="Organization">
            <OrganizationIcon />
          </IconButton>
          <span style={{ color: '#0000aa', textDecoration: 'underline', curson: 'pointer', verticalAlign: 'super' }}>
            {this.props.program.organizationName}
          </span><br />

          <IconButton tooltip="Courses">
            <SkillsIcon />
          </IconButton>
          <span style={{ color: '#0000aa', textDecoration: 'underline', cursor: 'pointer', verticalAlign: 'super' }} onTouchTap={() => { console.log('Courses clicked...') }}>
            {this.props.program.courses.length}&nbsp;course(s)
          </span><br />

        </Card>
      </div>
    )
  }
}
