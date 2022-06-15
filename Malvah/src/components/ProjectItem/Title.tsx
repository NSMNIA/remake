import { FC, MouseEventHandler } from "react";
import STYLE from './projectItem.module.scss';

interface ProjectTitleProps {
    title: string,
    handleMouseEnter: MouseEventHandler,
    handleMouseLeave: MouseEventHandler
}

const ProjectTitle: FC<ProjectTitleProps> = ({ title, handleMouseEnter, handleMouseLeave }) => {
    return (
        <div className={STYLE['title-item']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <h1 className={STYLE['menu-title']}>
                {title}
            </h1>
        </div>
    )
}

export default ProjectTitle