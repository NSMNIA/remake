import { FC } from "react"
import STYLE from './projectItem.module.scss'

interface ProjectImageProps {
    url: string,
    alt: string,
    opacity: number,
    parallexPos: {
        x: number,
        y: number
    },
    scale: number,
    rotationPos: number
}

const ProjectImage: FC<ProjectImageProps> = ({ url, alt, opacity, parallexPos, scale, rotationPos }) => {
    const style = {
        opacity,
        transform: `translate3d(${parallexPos.x}px, ${parallexPos.y}px, 0) rotate(${rotationPos}deg) scale(${scale})`,
    }
    return <img className={STYLE['image']}
        style={style}
        src={url}
        alt={alt}
    />
}

export default ProjectImage