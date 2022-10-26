import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import styled from "styled-components";
import Iphone1 from '../../assets/iphone-1.png';
import Iphone3 from '../../assets/iphone-3.png';
import IphoneLeft from '../../assets/iphone-left.png';
import IphoneRight from '../../assets/iphone-right.png';

const Grid = styled.div`
    height: 80vh;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`;

const H2 = styled.h2`
    grid-row: 7;
    grid-column: 5 / span 4;
    align-self: center;
`;

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    justify-content: center;
    display: grid;
    grid-auto-columns: 2fr 1fr 2fr;
    grid-template-rows: repeat(1, 1fr);
    align-items: center;
    position: relative;
`

const Text = styled.div`
    grid-column: 1;
    text-align: right;
`

const Image = styled.div`
    grid-row: 1;
    grid-column: 2 / span 1;
    align-self: flex-end;
    justify-self:flex-end;
    text-align: center;
    max-width: 100%;
    z-index: 3;

    &.iphone-1 img {
        width: 100%;
    }
    &.iphone-2 img {
        width: 88%;
    }
`

const InnerImage = styled.div`
    position: relative;
`

const Image1 = styled.img`
    position: absolute;
    z-index: 3;
`

const ImageStick = styled.img`
    display: none;
    position: absolute;
    left: 50%;
`

const ImageBehind = styled.img`
    z-index: 2;
    position: relative;
`

const Text2 = styled.div`
    grid-column: 3;
    z-index: 1;
`

const Images = styled.div`
    height: 100vh;
`

const Main = () => {
    useEffect(() => {
        ScrollTrigger.refresh();
        let scene = gsap.timeline({
            scrollTrigger: {
                trigger: "#grid",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
        });
        scene.fromTo("#wrapper", {
            scale: 2.7,
            transformOrigin: "center center",
        }, {
            scale: 1,
        })

        let scene2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#wrapper",
                start: "center center",
                end: "bottom center",
                scrub: 1,
                markers: true,
                pin: true,
            },
        }).fromTo(".iphone-1", {
            x: 0,
            y: 0,
        }, {
            x: "-50%"
        }).fromTo(".iphone-2", {
            x: 0,
            y: 0,
        }, {
            x: "50%"
        }).fromTo(".iphone-text-1", {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            x: "-30%"
        }, "-=1").fromTo(".iphone-text-2", {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            x: "30%"
        }, "-=.5").fromTo(".iphone-stick", {
            autoAlpha: 0,
        }, {
            display: "block",
            autoAlpha: 1,
        }).fromTo(".iphone-1-image", {
            autoAlpha: 1,
        }, {
            autoAlpha: 0,
        }).fromTo(".iphone-2-image", {
            autoAlpha: 1,
        }, {
            autoAlpha: 0,
        }, "-=.5").fromTo(".iphone-1-behind", {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            x: "-54%"
        }, "+=.5").fromTo(".iphone-2-behind", {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            x: "54%"
        }, "+=.5").fromTo(".iphone-text-1", {
            autoAlpha: 1,
        }, {
            autoAlpha: 0,
        }, "-=2").fromTo(".iphone-text-2", {
            autoAlpha: 1,
        }, {
            autoAlpha: 0,
        }, "-=2")


        return () => {
            scene.kill();
            scene2.kill();
        }
    }, [])
    return (
        <>
            <section>
                <Grid id='grid'>
                    <H2>The custom OLED displays on iPhone&nbsp;X deliver the most accurate color in the industry, HDR, and true blacks. And iPhone&nbsp;XMax has our largest display ever on an&nbsp;iPhone.</H2>
                </Grid>
            </section>
            <div id="wrapper">
                <section>
                    <Images>
                        <Wrapper>
                            <Text className="iphone-text-1">
                                <p>iPhone Xs Max</p>
                                <p>6.5" dsiplay</p>
                            </Text>
                            <Image className="iphone-1">
                                <InnerImage>
                                    <Image1 src={Iphone1} alt="" className="iphone-1-image" />
                                    <ImageStick src={Iphone3} alt="" className="iphone-stick" />
                                    <ImageBehind src={IphoneLeft} alt="" className="iphone-1-behind" />
                                </InnerImage>
                            </Image>
                            <Image className="iphone-2">
                                <InnerImage>
                                    <Image1 src={Iphone1} alt="" className="iphone-2-image" />
                                    <ImageBehind src={IphoneRight} alt="" className="iphone-2-behind" />
                                </InnerImage>
                            </Image>
                            <Text2 className="iphone-text-2">
                                <p>iPhone Xs Max</p>
                                <p>5.8" display</p>
                            </Text2>
                        </Wrapper>
                    </Images>
                </section>
            </div>
            <section style={{ height: "100vh" }}></section>
        </>
    )
}

export default Main