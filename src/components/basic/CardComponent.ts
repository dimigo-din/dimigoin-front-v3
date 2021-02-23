import styled from "@emotion/styled";


export const CardHeader = styled.h2`
    font-size: 19px;
    font-weight: 800;
    flex: 1;
    word-break: keep-all;
    line-height: 24px;
`

export const CardDetail = styled.p`
    font-size: 17px;
    font-weight: 700;
    margin-top: 6px;
    color: #393939;
`

export const CardContent = styled.p`
    font-size: 17px;
    color: #707070;
    margin-top: 15px;
    line-height: 24px;
    
    overflow: hidden;
    text-overflow: ellipsis;
    
    white-space: normal;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    &:hover+p {
        opacity: 1;
    }
`