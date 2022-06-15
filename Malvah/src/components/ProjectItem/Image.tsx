import { FC } from "react"
import STYLE from './projectItem.module.scss'

interface ProjectImageProps {
    url: string,
    alt: string,
    opacity: number,
    parallexPos: {
        x: number,
        y: number
    }
}

const ProjectImage: FC<ProjectImageProps> = ({ url, alt, opacity, parallexPos }) => {
    const style = {
        opacity,
        transform: `translate3d(${parallexPos.x}px, ${parallexPos.y}px, 0)`,
    }
    return <img className={STYLE['image']}
        style={style}
        src={url}
        alt={alt}
    />
}

export default ProjectImage