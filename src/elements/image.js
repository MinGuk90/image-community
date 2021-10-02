import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size} = props;

    const styles = {
        src: src,
        size: size,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjlfMzcg/MDAxNTUzODI3OTU3NTg1.geQ7whX1F1DWXBeARbVmBfuqZWp_Db152hko56ZQneIg.5fjMBtfCJeBPcwr1CIndT4qQGbepVcgI9skIDJkEDq8g.JPEG.petianbooks/%25EA%25B0%2595%25EC%2595%2584%25EC%25A7%2580_%25EA%25B0%25B8%25EC%259A%25B0%25EB%259A%25B1.jpg?type=w800",
  size: 36,
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Image;