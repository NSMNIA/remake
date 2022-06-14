import { FC } from "react"
import IPageData from "../../interfaces/data"
import ProjectImage from "./Image"
import STYLE from "./projectItem.module.scss"
import ProjectTitle from "./Title"

interface ProjectItemProps {
    project: IPageData,
    index: number
}

const ProjectItem: FC<ProjectItemProps> = ({ project, index }) => {
    return <li>
        <ProjectTitle title={project.title} />
        <ProjectImage url={project.url} alt={project.title} />

        <div className={STYLE["info-block"]}>
            <p className={STYLE["info-block--header"]}>
                <span>
                    #{index + 1}
                </span>
            </p>
            {project?.info?.map((element: string, i: number) => <p className={STYLE["info-block--text"]} key={i}>
                <span>
                    {element}
                </span>
            </p>)}
        </div>
    </li>
}

export default ProjectItem