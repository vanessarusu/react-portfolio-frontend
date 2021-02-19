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
            <li tabindex="0" role="tab" aria-controls="featuredWork" onClick={this.props.handleClick} className={this.props.active ? `${this.props.activeClass}` : ''}>{this.props.data.name}</li>
        )
    }    
}

export default ProjectTag;