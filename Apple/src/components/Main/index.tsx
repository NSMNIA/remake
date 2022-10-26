import gsap from "gsap";
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
`

const Text = styled.div`
    grid-column: 1;
    text-align: right;
`

const Image = styled.div`
    grid-row: 1;
    grid-column: 2 / span 1;
    align-self: center;
    justify-self:center;
    text-align: center;
    max-width: 100%;

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
    z-index: 2;
`

const ImageStick = styled.img`
    display: none;
    position: absolute;
    left: 54.5%;
`

const ImageBehind = styled.img`
    z-index: 1;
    position: relative;
`

const Text2 = styled.div`
    grid-column: 3;
`

const Images = styled.div`
    height: 100vh;
`

const Main = () => {
    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#grid",
                start: "top top",
                end: "bottom center",
                scrub: 1,
                markers: true,
            },
        }).from("#wrapper", {
            scale: 2.7,
            transformOrigin: "center top",
        }).to("#wrapper", {
            scale: 1,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#wrapper",
                start: "-100 top",
                end: "bottom center",
                scrub: 1,
                markers: true,
                pin: true
            },
        }).from(".iphone-1", {
            x: 0,
            y: 0,
        }).to(".iphone-1", {
            x: "-50%",
        })

    }, [])
    return (
        <>
            <section>
                <Grid id='grid'>
                    <H2>The custom OLED displays on iPhone&nbsp;X deliver the most accurate color in the industry, HDR, and true blacks. And iPhone&nbsp;XMax has our largest display ever on an&nbsp;iPhone.</H2>
                </Grid>
            </section>
            <section>
                <Images id="wrapper">
                    <Wrapper>
                        <Text>
                            <p>iPhone Xs Max</p>
                            <p>6.5" dsiplay</p>
                        </Text>
                        <Image className="iphone-1">
                            <InnerImage>
                                <Image1 src={Iphone1} alt="" />
                                <ImageStick src={Iphone3} alt="" />
                                <ImageBehind src={IphoneLeft} alt="" />
                            </InnerImage>
                        </Image>
                        <Image className="iphone-2">
                            <InnerImage>
                                <Image1 src={Iphone1} alt="" />
                                <ImageBehind src={IphoneRight} alt="" />
                            </InnerImage>
                        </Image>
                        <Text2>
                            <p>iPhone Xs Max</p>
                            <p>5.8" display</p>
                        </Text2>
                    </Wrapper>
                </Images>
            </section>
        </>
    )
}

export default Main