import styled from "styled-components";
import Iphone1 from '../../assets/iphone-1.png';
import Iphone3 from '../../assets/iphone-3.png';
import IphoneLeft from '../../assets/iphone-left.png';
import IphoneRight from '../../assets/iphone-right.png';

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

const Main = () => {
    return (
        <section>
            <div>
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
            </div>
        </section>
    )
}

export default Main