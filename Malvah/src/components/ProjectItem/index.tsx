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
    scale: .8,
    rotationPos: 0,
    active: false
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
        case "CHANGE/ROTATION": {
            return {
                ...state,
                rotationPos: action.payload
            }
        }
        case "CHANGE/SCALE": {
            return {
                ...state,
                scale: action.payload
            }
        }
        case "MOUSE/ENTER": {
            return {
                ...state,
                active: true
            }
        }
        case "MOUSE/LEAVE": {
            return {
                ...state,
                active: false
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

    const handleScale = (initialScale: number, newScale: number, duration: number) => {
        animate({
            fromValue: initialScale,
            toValue: newScale,
            duration,
            onUpdate: (newScale: number, callback: any) => {
                dispatch({ type: 'CHANGE/SCALE', payload: newScale });
                callback();
            },
            onComplete: () => { },
        })
    }

    const handleRotation = (currentRotation: number, duration: number) => {
        const newRotation = Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1);
        animate({
            fromValue: currentRotation,
            toValue: newRotation,
            duration,
            onUpdate: (newRotation: number, callback: any) => {
                dispatch({ type: 'CHANGE/ROTATION', payload: newRotation });
                callback();
            },
            onComplete: () => { },
        })
    }

    const handleMouseEnter = () => {
        handleScale(.8, 1, 500);
        handleOpacity(0, 1, 500);
        handleRotation(state.rotationPos, 500);
        listItem.current?.addEventListener('mousemove', parallex)
        dispatch({ type: 'MOUSE/ENTER' })
    }

    const handleMouseLeave = () => {
        listItem.current?.removeEventListener('mousemove', parallex)
        handleOpacity(1, 0, 800);
        handleScale(1, initialState.scale, 500);
        handleRotation(state.rotationPos, 500);
        dispatch({
            type: 'MOUSE/COORDINATES',
            payload: initialState.parallexPos
        })
        dispatch({ type: 'MOUSE/LEAVE' })
    }

    return <li ref={listItem}>
        <ProjectTitle title={project.title} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <ProjectImage url={project.url} alt={project.title} opacity={state.opacity} parallexPos={state.parallexPos} scale={state.scale} rotationPos={state.rotationPos} />

        <div className={state.active ? `${STYLE["info-block"]} ${STYLE["active"]}` : STYLE["info-block"]}>
            <p className={STYLE["info-block-header"]}>
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