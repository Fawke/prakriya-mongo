import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import SkillsIcon from 'material-ui/svg-icons/action/stars';
import DateIcon from 'material-ui/svg-icons/action/date-range';

export default class CourseDetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const bgColor = this.props.bgColor;
        const bgIcon = this.props.bgIcon;

        return (
            <div style={{display: 'inline-block', padding: '10px'}}>
                <Card style={{width: '310px', backgroud: bgColor}}>
                    <CardHeader 
                        title={`${this.props.course.name}`}
                    />
                </Card>
            </div>
        );
    }
}