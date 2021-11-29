import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { FindKoreanName } from '../../data/FindKoreanName'
import OPEN_DATA from '../../data/gyeonggi-open-data.json'
import TRANSPLANTATION_DATA from '../../data/transplantation.json'
import { useNavigate } from 'react-router-dom'

function Main() {
    const navigate = useNavigate()

    const categories = Object.keys(OPEN_DATA)
    const transCategories = Object.keys(TRANSPLANTATION_DATA)
    
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
        to: {
            opacity: 1
        },
        from: {
            opacity: 0
        }
    });

    const customAnimation04 = useSpring({ 
        loop: false,
        delay: 600,
        to: {
            opacity: 1
        },
        from: {
            opacity: 0
        }
    });

    // States
    const [isDetail , setIsDetail] = useState( false )
    const [detailData, setDetailData] = useState([])

    /**
     * 해당 카테고리 디테일목록 조회
     * @param {String} category 
     */
    const handleDetail = (category) => {
        // console.log(">> Clicked Category ", category)
        navigate(`/${category}`)
    }

    return (
        <MainWrap>
            <Content isDetail={isDetail} >
                <animated.div style={customAnimation01}>
                    <TitleElement>
                        특수 수술 및 시술이
                    </TitleElement>
                </animated.div>
                <animated.div style={customAnimation02}>
                    <TitleElement>
                        가능한 병원을 찾아보세요
                    </TitleElement>
                </animated.div>

                <animated.div style={customAnimation04}>
                    <TextElement>
                        경기도 내 <span>15가지 항목의 특수 수술 또는 시술이 가능한 병원 현황</span>을 제공합니다.
                        
                        <SubText>
                            데이터 기준일자, 2020-02-19 (최신)
                        </SubText>
                    </TextElement>
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
                
                <hr/>
                
                <animated.div style={customAnimation01}>
                    <TitleElement>
                        장기이식 수술이
                    </TitleElement>
                </animated.div>
                <animated.div style={customAnimation02}>
                    <TitleElement>
                        가능한 병원을 찾아보세요
                    </TitleElement>
                </animated.div>

                <animated.div style={customAnimation04}>
                    <TextElement>
                        경기도 내 <span>7가지 항목의 장기이식 수술이 가능한 병원 현황</span>을 제공합니다.
                        <SubText>
                            데이터 기준일자, 2021-11-01 (최신)
                        </SubText>
                    </TextElement>
                </animated.div>

                <animated.div style={customAnimation03}>
                    <GroupSection>
                        { transCategories.map(( category, idx ) => 
                            <GroupItem key={idx} onClick={() => handleDetail( category )}>
                                { FindKoreanName( category ) }
                            </GroupItem>
                        )}
                    </GroupSection>
                </animated.div>
                

            </Content>
        </MainWrap>
    )
}

export default Main

const MainWrap = styled.div`
    padding: 0px 25px;
    overflow: hidden;
`

const TextElement = styled.div`
    padding-top: 15px;
    font-size: 11px;
    line-height: 20px;
    padding-bottom: 15px;

    span {
        font-size: 12px;
        color: var(--primary);
        letter-spacing: -0.3px;
    }
`

const SubText = styled.div`
    margin-top: 8px;
    width: 100%;
    text-align: right;
    font-size: 11px;
    color: var(--sub);
`

const TitleElement = styled.div`
    font-size: 16px;
    line-height: 22px;
`

const GroupSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
`

const GroupItem = styled.div`
    cursor: pointer;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid var(--borderColor);
    border-radius: 4px;
    padding-left: 10px;
    font-size: 13px;
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
    padding-bottom: 60px;

    hr {
        margin-top: 40px;
        margin-bottom: 40px;
    }
`

