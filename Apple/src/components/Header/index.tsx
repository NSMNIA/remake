import styled from 'styled-components';

const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`;

const H2 = styled.h2`
    grid-row: 7;
    grid-column: 5 / span 4;
    align-self: center;
`;


const Header = () => {
    return (
        <section>
            <Grid>
                <H2>The custom OLED displays on iPhone&nbsp;X deliver the most accurate color in the industry, HDR, and true blacks. And iPhone&nbsp;XMax has our largest display ever on an&nbsp;iPhone.</H2>
            </Grid>
        </section>
    )
}

export default Header