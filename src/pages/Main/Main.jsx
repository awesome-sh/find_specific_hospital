import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { FindKoreanName } from '../../data/FindKoreanName'
import OPEN_DATA from '../../data/gyeonggi-open-data.json'
import { useNavigate } from 'react-router-dom'

function Main() {
    const categories = Object.keys(OPEN_DATA)
    const navigate = useNavigate()

    const to = {
        transform: 'translateY(0)',
        opacity: 1
    }

    const from = {
        transform: 'translateY(60px)',
        opacity: 0
    }

    const customAnimation01 = useSpring({ 
        loop: false,
        delay: 300,
        to,
        from
    });

    const customAnimation02 = useSpring({ 
        loop: false,
        delay: 400,
        to,
        from
    });

    const customAnimation03 = useSpring({ 
        loop: false,
        delay: 500,
        to,
        from
    });

    const customAnimation04 = useSpring({ 
        loop: false,
        delay: 600,
        to,
        from
    });

    // States
    const [isDetail , setIsDetail] = useState( false )
    const [detailData, setDetailData] = useState([])


    /**
     * 해당 카테고리 디테일목록 조회
     * @param {String} category 
     */
    const handleDetail = (category) => {
        console.log(">> Clicked Category ", category)
        navigate(`/${category}`)
    }

    return (
        <MainWrap>

            <Content isDetail={isDetail} >
                <animated.div style={customAnimation01}>
                    <TitleElement>
                        경기도 내, 특수 수술 및 시술이
                    </TitleElement>
                </animated.div>
                <animated.div style={customAnimation02}>
                    <TitleElement>
                        가능한 병원을 찾아보세요
                    </TitleElement>
                </animated.div>

                <animated.div style={customAnimation03}>
                    <GroupSection>
                        { categories.map(( category, idx ) => 
                            <GroupItem key={idx} onClick={() => handleDetail( category )}>
                                { FindKoreanName( category ) }
                            </GroupItem>
                        )}
                    </GroupSection>
                </animated.div>
                
                <animated.div style={customAnimation04}>
                    <TextElement>
                        FSH(Find Specific Hospital)는 경기데이터드림 공공데이터를 기반으로하여 
                        경기도 내 <span>15가지 항목의 특수 수술 또는 시술이 가능한 병원 현황</span>을 제공합니다.
                        <hr/>
                        <SubText>
                            데이터 기준일자 : 2020-02-19 (최신)
                        </SubText>
                    </TextElement>
                </animated.div>
            </Content>

            
        </MainWrap>
    )
}

export default Main

const MainWrap = styled.div`
    padding: 0px 25px;
`

const TextElement = styled.div`
    padding-top: 30px;
    font-size: 11px;
    line-height: 20px;
    padding-bottom: 30px;

    span {
        font-size: 12px;
        color: var(--primary);
        letter-spacing: -0.3px;
    }
`

const SubText = styled.div`
    width: 100%;
    text-align: right;
    font-size: 11px;
`

const TitleElement = styled.div`
    font-size: 16px;
    line-height: 22px;
`

const GroupSection = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
`

const GroupItem = styled.div`
    cursor: pointer;
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid var(--borderColor);
    border-radius: 4px;
    padding-left: 10px;
    transition: all 0.3s ease-out;

    &:hover {
        color: #fff;
        background: linear-gradient(160deg, var(--primary), var(--third));
        border: 2px solid var(--primary);
        box-shadow: 0px 3px 5px rgba(69, 196, 133, 0.397);
    }
`

const Content = styled.div`
    height: ${({isDetail}) => isDetail ? '0px' : '100%'};
    overflow: ${({isDetail}) => isDetail ? 'hidden' : 'auto'};;
    visibility: ${({isDetail}) => isDetail ? 'hidden' : 'visible'};
    opacity: ${({isDetail}) => isDetail ? '0' : '1'};
    transition: all 0.5s ease-out;
`

