import React from 'react';
import PropTypes from 'prop-types';

export class ProjectList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.projectList.length > 0) {
            let projectList = this.props.projectList.map((project) => {
                if (project !== null) project = project.substr(1);
                return <div key={project}>{project}</div>;
            });
            return(
                <div className="project-list">
                    <h3>Projects:</h3>
                    {projectList}
                </div>
            );
        } else {
            return (
                <div className="project-list"></div>
            );
        }
    }
}

ProjectList.propTypes = {
    projectList: PropTypes.array
}
