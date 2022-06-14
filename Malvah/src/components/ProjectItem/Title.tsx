import { FC } from "react";
import STYLE from './projectItem.module.scss';

interface ProjectTitleProps {
    title: string
}

const ProjectTitle: FC<ProjectTitleProps> = ({ title }) => {
    return (
        <div className={STYLE['title-item']}>
            <h1 className={STYLE['menu-title']}>
                {title}
            </h1>
        </div>
    )
}

export default ProjectTitle