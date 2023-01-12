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
            let delay = 0.5;
            for (let i = 0; i < titleChildren.length; i++) {
                const span = titleChildren[i] as HTMLSpanElement;
                for (let j = 0; j < span.children.length; j++) {
                    const child = span.children[j] as HTMLDivElement;
                    for (let k = 0; k < child.children.length; k++) {
                        const childChild = child.children[k] as HTMLDivElement;
                        childChild.style.transitionDelay = `${delay}s`;
                        delay += 0.3;
                        setTimeout(() => {
                            childChild.style.transitionDelay = "";
                        }, delay * 1000 + 500);
                    }
                }
            }

            setTimeout(() => {
                title.current?.classList.add("active");
            }, 1500);
        }

        return () => {
            intro.current?.removeEventListener("ended", () => {
                if (introLoop.current) {
                    introLoop.current.style.zIndex = "3";
                    introLoop.current.play();
                }
            });
        };
    }, []);

    return (
        <>
            <header>
                <div className="logo">
                    <a href="/">
                        <span>Home</span>
                        <img src="https://useplink.com/assets/images/logo--light.svg" alt="Plink" width="57" height="23" />
                    </a>
                </div>
            </header>
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
                <div className="intro--titles" ref={title}>
                    <h1 className="title">
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
                        <span>
                            <div>86%&nbsp;</div>
                            <div>of&nbsp;</div>
                            <div>our&nbsp;</div>
                            <div>payment&nbsp;</div>
                            <div>requests&nbsp;</div>
                            <div>get&nbsp;</div>
                            <div>paid&nbsp;</div>
                            <div>within&nbsp;</div>
                            <div>12&nbsp;</div>
                            <div>hours.</div>
                        </span>
                    </h2>
                </div>
            </section>
        </>
    );
};

export default App;
