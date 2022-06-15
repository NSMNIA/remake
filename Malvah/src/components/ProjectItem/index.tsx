import { FC, useReducer, useRef } from "react"
import IPageData from "../../interfaces/data"
import animate from "./Animate"
import ProjectImage from "./Image"
import STYLE from "./projectItem.module.scss"
import ProjectTitle from "./Title"

interface ProjectItemProps {
    project: IPageData,
    index: number
}

const initialState = {
    opacity: 0,
    parallexPos: {
        x: 0,
        y: -20
    },
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "CHANGE/OPACITY": {
            return {
                ...state,
                opacity: action.payload
            }
        }
        case "MOUSE/COORDINATES": {
            return {
                ...state,
                parallexPos: action.payload
            }
        }
        default: {
            throw new Error();
        }
    }
}

const ProjectItem: FC<ProjectItemProps> = ({ project, index }) => {
    const listItem = useRef<HTMLLIElement>(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const throttle = (fn: any, time: number) => {
        let lastTime = 0;
        return (...args: any[]) => {
            const now = Date.now();
            if (now - lastTime > time) {
                fn(...args);
                lastTime = now;
            }
        }
    }

    const parallex = (e: MouseEvent) => {
        const speed = -5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        // throttle dispatch to prevent too many events
        dispatch({
            type: "MOUSE/COORDINATES",
            payload: {
                x,
                y
            }
        })
    }

    const handleOpacity = (initialOpacity: number, newOpacity: number, duration: number) => {
        animate({
            fromValue: initialOpacity,
            toValue: newOpacity,
            duration,
            onUpdate: (newOpacity: number, callback: any) => {
                dispatch({ type: 'CHANGE/OPACITY', payload: newOpacity });
                callback();
            },
            onComplete: () => { },
        })
    }

    const handleMouseEnter = () => {
        handleOpacity(0, 1, 500);
        listItem.current?.addEventListener('mousemove', throttle(parallex, 250))
    }

    const handleMouseLeave = () => {
        listItem.current?.removeEventListener('mousemove', throttle(parallex, 250))
        handleOpacity(1, 0, 800);
        dispatch({
            type: 'MOUSE/COORDINATES',
            payload: initialState.parallexPos
        })
    }

    return <li ref={listItem}>
        <ProjectTitle title={project.title} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <ProjectImage url={project.url} alt={project.title} opacity={state.opacity} parallexPos={state.parallexPos} />

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