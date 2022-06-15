import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectItem from "../components/ProjectItem";
import { pageData } from '../data';

type Props = {}

const Home = (props: Props) => {
    const menuItems = useRef<any>(null)
    const [renderItems, setRenderItems] = useState(pageData);

    const cloneItems = () => {
        const itemHeight = menuItems.current?.childNodes?.[0]?.offsetHeight as number;
        const fitMax = Math.ceil(window.innerHeight / itemHeight);
        const clonedItems = [...renderItems].filter((_: any, index: number) => index < fitMax).map((target: any) => target);

        setRenderItems([...renderItems, ...clonedItems]);
        return clonedItems.length * itemHeight;
    }

    const getScrollPosition = () => {
        return (
            (menuItems.current?.pageYOffset || menuItems.current?.scrollTop) - (menuItems.current?.clientTop || 0)
        )
    }

    const setScrollPosition = (position: number) => {
        menuItems.current.scrollTop = position;
    }

    const initScroll = () => {
        const scrollPos = getScrollPosition();
        if (scrollPos <= 0) {
            setScrollPosition(1);
        }
    }

    useEffect(() => {
        // const clonesHeight = cloneItems();
        // initScroll();
        // const scrollUpdate = () => {
        //     const scrollPos = getScrollPosition();
        //     if (clonesHeight + scrollPos >= menuItems.current?.scrollHeight) {
        //         setScrollPosition(1);
        //     } else if (scrollPos <= 0) {
        //         setScrollPosition(menuItems.current.scrollHeight - clonesHeight);
        //     }
        // }
        // menuItems.current?.addEventListener('scroll', scrollUpdate);
        return () => {
            // menuItems.current?.removeEventListener('scroll', scrollUpdate)
        }
    }, [])

    return (
        <>
            <Header />
            <div className="main-container">
                <ul ref={menuItems}>
                    {renderItems?.map((project, index) => <ProjectItem key={index} project={project} index={index} />)}
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default Home