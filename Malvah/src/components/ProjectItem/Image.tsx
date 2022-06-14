import { FC } from "react"
import STYLE from './projectItem.module.scss'

interface ProjectImageProps {
    url: string,
    alt: string
}

const ProjectImage: FC<ProjectImageProps> = ({ url, alt }) => {
    return <img className={STYLE['image']}
        src={url}
        alt={alt}
    />
}

export default ProjectImage