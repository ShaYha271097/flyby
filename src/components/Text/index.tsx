import styled from "styled-components";

const Text = styled.p<{ marginTop?: any; size?: string }>`
    color: #fff;
    font-size: ${({ size }) => (size ? size : "0.875rem")};
    margin: ${({ marginTop }) => (marginTop ? marginTop : "10px")} 0 0;
    text-overflow: ellipsis;
    text-align: left;
    @media (max-width: 296px) {
        font-size: 2.5rem;
    }
    p {
        font-size: 0.8rem;
        opacity: 0.8;
    }
`;
export default Text;
