import { useEffect, useRef } from "react";

const App = () => {
    const intro = useRef<HTMLVideoElement>(null);
    const introLoop = useRef<HTMLVideoElement>(null);
    const title = useRef<HTMLDivElement>(null);

    const playIntro = () => {
        if (intro.current) {
            intro.current.play();
        }
    };

    useEffect(() => {
        playIntro();
        // check if the video is playing
        if (intro.current) {
            intro.current.addEventListener("ended", () => {
                if (introLoop.current) {
                    introLoop.current.style.zIndex = "3";
                    introLoop.current.play();
                }
            });
        }

        if (title.current) {
            const titleChildren = title.current.children;
            for (let i = 0; i < titleChildren.length; i++) {
                const span = titleChildren[i] as HTMLSpanElement;
                for (let j = 0; j < span.children.length; j++) {
                    const child = span.children[j] as HTMLDivElement;
                    child.style.transitionDelay = `${(i + 1) * 0.5}s`;
                }
            }

            setTimeout(() => {
                title.current?.classList.add("active");
            }, 1500);
        }
    }, []);

    return (
        <>
            <section className="intro">
                <div className="videos">
                    <video className="video--intro" muted={true} playsInline={true} ref={intro}>
                        <source src="https://useplink.com/assets/images/frontpage/intro.webm" type="video/webm" />
                        <source src="https://useplink.com/assets/images/frontpage/intro.mp4" type="video/mp4" />
                    </video>
                    <video className="video--intro-loop" muted={true} playsInline={true} loop={true} ref={introLoop}>
                        <source src="https://useplink.com/assets/images/frontpage/loop.webm" type="video/webm" />
                        <source src="https://useplink.com/assets/images/frontpage/loop.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="intro--titles">
                    <h1 className="title" ref={title}>
                        <span>
                            <div>Send&nbsp;</div>
                            <div>payment&nbsp;</div>
                            <br />
                            <div>requests,&nbsp;</div>
                        </span>
                        <span>
                            <div>get&nbsp;</div>
                            <div>paid&nbsp;</div>
                            <br />
                            <div>fast!</div>
                        </span>
                    </h1>
                    <h2 className="baseline">
                        <div>86% of our payment requests get paid within 12 hours.</div>
                    </h2>
                </div>
            </section>
        </>
    );
};

export default App;
