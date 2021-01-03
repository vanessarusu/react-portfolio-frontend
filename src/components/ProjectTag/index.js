import React from 'react';

class ProjectTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}


    render() {
        return (
            <li role="button" onClick={this.props.handleClick} className={this.props.active ? `${this.props.activeClass}` : ''}>{this.props.data.name}</li>
        )
    }    
}

export default ProjectTag;