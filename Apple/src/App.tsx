import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Main from "./components/Main";
const App = () => {
    gsap.registerPlugin(ScrollTrigger);
    return (
        <>
            <Main />
        </>
    )
}

export default App