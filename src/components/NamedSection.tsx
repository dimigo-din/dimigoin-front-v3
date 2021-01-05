import css from '@emotion/css'
import React, { useState } from 'react'
import styled from "@emotion/styled";

const NamedSection: React.FC<{
    sections: {
        name: string;
        component: JSX.Element
    }[]
}> = ({ sections }) => {
    const [ selectedIndex, selectIndex ] = useState(0)
    return <Wrapper>
        <Header>
            {sections.map((section, index) =>
                <SectionName
                    key={section.name}
                    selected={index === selectedIndex}
                    onClick={() => selectIndex(index)}>
                    { section.name }
                </SectionName>
            )}
        </Header>
        <ContentWrapper>
            {sections[selectedIndex].component
        }
        </ContentWrapper>
    </Wrapper>
}

const Wrapper = styled.div`
    width: 100%;
    background-color: white;
    border-radius: 6px;
`

const Header = styled.div`
    justify-content: space-around;
    flex-direction: row;
    display: flex;
    font-weight: 900;
    font-size: 22px;
    color: #9A9A9A;
    border-bottom: 1px solid #D1D1D1;
`

const ContentWrapper = styled.div`
    padding: 36px;
`

const SectionName = styled.p<{ selected?: boolean }>`
    padding: 20px;
    color: #9A9A9A;
    position: relative;
    bottom: -2px;
    transition: 1000ms cubic-bezier(0, 0.75, 0.21, 1);
    height: 65px;
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    ${({ selected }) => selected && css`
        color: var(--main-theme-accent);
        border-color: var(--main-theme-accent);
    `}
`

export default NamedSection