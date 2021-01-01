import React from 'react'
import { Horizontal } from '../components/Atomics'
import CardGroupHeader from '../components/CardGroupHeader'
import DimiCard from '../components/dimiru/DimiCard'
import { Col } from '../components/grids/Cols'
import PageWrapper from '../components/grids/PageWrapper'
import NavigationBar from '../components/NavigationBar'

const Mentoring: React.FC = () => {
    return <>
            <NavigationBar />
            <PageWrapper>
                <Horizontal>
                    <Col width={5}>
                        <CardGroupHeader>
                            멘토링
                        </CardGroupHeader>
                        <DimiCard leftBorder>
                            멘토링은 웅앵
                        </DimiCard>
                    </Col>
                </Horizontal>
            </PageWrapper>
    </>
}

export default Mentoring