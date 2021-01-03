import React from 'react';
// import styles from './SinglePortfolio.module.scss';

class ProjectTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}


    render() {
        
        return (
            <li onClick={this.props.handleClick} className={this.props.active ? `${this.props.activeClass}` : ''}>{this.props.data.name}</li>
        )
    }    
}

export default ProjectTag;