import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useNavigate, useParams } from 'react-router-dom'

import OPEN_DATA from '../../data/gyeonggi-open-data.json'
import { FindKoreanName } from '../../data/FindKoreanName'

import LeftArrow from '../../assets/icon/left-arrow.png'
import useClientSize from '../../hooks/useClientSize'

function Detail() {
    const navigate = useNavigate()
    const { category } = useParams()
    const [originDatas, setOriginDatas] = useState([])
    const [datas, setDatas] = useState([])

    // for Search Option States
    const [types, setTypes] = useState([])
    const [siArr, setSiArr] = useState([])
    const [gunArr, setGunArr] = useState([])

    const [selectedSi, setSelectedSi] = useState('')
    const [selectedGun, setSelectedGun] = useState('')
    const [selectedType, setSelectedType] = useState('')

    useEffect(() => {
        let findData = Object.keys( OPEN_DATA ).includes( category ) ? OPEN_DATA[category] : null;

        if(findData) {
            // Total Datas
            setOriginDatas( findData )
            setDatas( findData )

            // Initialize Location : Si(시)
            const unoverlapSi = Array.from(new Set(findData.map(v => v.SIGUN_NM)))
            setSiArr( unoverlapSi )
            setSelectedSi( unoverlapSi[0] )
        }
    }, [category])

    useEffect(() => {
        const unoverlapGun = Array.from(new Set(originDatas.filter(v => v.SIGUN_NM === selectedSi).map(v => v.REFINE_ROADNM_ADDR.split(' ')[2])))
        setGunArr( unoverlapGun )

        // Type Datas
        const unoverlapTypes = Array.from(new Set(originDatas.map(v => v.INDUTYPE_NM)))
        setTypes( unoverlapTypes )

        let result = datas

        if(selectedGun !== '') {
            result = Array.from(new Set(originDatas.filter(v => v.SIGUN_NM === selectedSi && v.REFINE_ROADNM_ADDR.split(' ')[2] === selectedGun)))
        }

        if(selectedType !== '') {
            result = result.filter(v => v.INDUTYPE_NM === selectedType)
        }

        setDatas( result )
    }, [selectedSi, selectedGun, selectedType])

    const [isOverClientHeight, setIsOverClientHeight] = useState(false)
    const clientSize = useClientSize()

    useEffect(() => {
        const handleScroll = () => {
            setIsOverClientHeight(clientSize.height/4 < window.pageYOffset ? true : false)
        }

        window.addEventListener('scroll', handleScroll)
    }, [])

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
        delay: 500,
        to,
        from
    });

    return (
        <Wrap>
            <BackButton onClick={() => navigate('/main')}>
                <img src={LeftArrow} alt="img" />
            </BackButton>

            <Header isOverClientHeight={isOverClientHeight}>
                <HeaderTop isOverClientHeight={isOverClientHeight}>
                    <h1>
                        <animated.span style={customAnimation01}>{ FindKoreanName(category) }</animated.span> 가능한 병원
                    </h1>

                    <div className="topBtn" onClick={() => window.scrollTo(0, 0)}>
                        <img src={LeftArrow} alt="img" />
                    </div>
                </HeaderTop>

                <SearchGroup>
                    <SearchItem>
                        <SearchLabel>지역</SearchLabel>
                        <SearchForm>
                            <select onChange={(e) => setSelectedSi(e.target.value)}>
                                { siArr.length > 0 && siArr.map((si, idx) => 
                                    <option key={idx} selected={idx === 0}>{si}</option>
                                )}
                            </select>
                        </SearchForm>
                    </SearchItem>
                    <SearchItem>
                        <SearchLabel>세부</SearchLabel>
                        <SearchForm>
                            <select onChange={(e) => setSelectedGun(e.target.value)}>
                                { gunArr.length > 0 ? 
                                    <>
                                        <option selected>지역 선택</option>
                                        {   
                                            gunArr.map((gun, idx) => 
                                                <option key={idx}>{gun}</option>
                                            )
                                        }
                                    </>
                                    :
                                    <option selected>지역 선택</option>
                                }
                            </select>
                        </SearchForm>
                    </SearchItem>
                    <SearchItem>
                        <SearchLabel>업종</SearchLabel>
                        <SearchForm>
                            <select onChange={(e) => setSelectedType(e.target.value)}>
                                { types.length > 0 && types.map((type, idx) => 
                                    <option key={idx} selected={idx === 0}>{type}</option>
                                )}
                            </select>
                        </SearchForm>
                    </SearchItem>
                </SearchGroup>
            </Header>

            <animated.div style={customAnimation02}>
                <List>
                    {
                        datas.length > 0 ?
                            datas.map((data, idx) => {
                                return (
                                    <Item key={idx}>
                                        <div className="type"><span>업종</span>{data.INDUTYPE_NM}</div>
                                        <div className="location"><span>지역</span>{data.SIGUN_NM}</div>
                                        <div className="name"><span>병원명</span>{data.MEDCARE_FACLT_NM}</div>
                                        <div className="address"><span>도로명 주소</span>{data.REFINE_ROADNM_ADDR}</div>
                                        <div className="tel"><span>전화번호</span>{data.MEDCARE_FACLT_TELNO}</div>
                                        <div className="found_date"><span>설립일자</span>{data.FOUND_DE}</div>
                                    </Item>
                                )}
                            )
                        :
                            <h3>
                                목록이 존재하지 않습니다.
                            </h3>
                    }
                </List>
            </animated.div>
        </Wrap>
    )
}

export default Detail

const Wrap = styled.div`
    padding: 0 25px;

    h1 {
        font-size: 15px;
        font-weight: 300;
        margin-top: 15px;
        margin-bottom: 15px;

        span {
            color: var(--second);
            font-size: 18px;
            margin-right: 10px;
        }
    }
`

const Header = styled.div`
    position: ${({isOverClientHeight}) => isOverClientHeight ? 'fixed' : ''};
    z-index: ${({isOverClientHeight}) => isOverClientHeight ? '9999' : '0'};
    top: ${({isOverClientHeight}) => isOverClientHeight ? '0px' : ''};
    left: ${({isOverClientHeight}) => isOverClientHeight ? '0px' : ''};
    background: ${({isOverClientHeight}) => isOverClientHeight ? 'rgba(0, 0, 0, 0.493)' : ''};
    backdrop-filter: ${({isOverClientHeight}) => isOverClientHeight ? 'blur(8px)' : ''};
    width: 100%;
    padding: ${({isOverClientHeight}) => isOverClientHeight ? '25px' : '0px'};
    transition: all 0.3s ease-out;
`

const HeaderTop = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    .topBtn {
        cursor: pointer;
        display: ${({isOverClientHeight}) => isOverClientHeight ? 'flex' : 'none !important'};
        position: absolute;
        right: 0;
        justify-content: center;
        align-items: center;
        width: 34px;
        height: 34px;
        border: 1px solid #8d8d8d;
        border-radius: 4px;

        img {
            width: 14px;
            height: 14px;
            transform: rotate(90deg)
        }
    }
`

const BackButton = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: 1px solid #757272;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-out;

    img {
        width: 16px;
        height: 16px;
    }

    &:hover {
        background: var(--primary);
        border: 1px solid var(--primary);
        box-shadow: 0px 3px 5px rgba(69, 196, 133, 0.397);
    }
`

const SearchGroup = styled.div`
    padding: 0px 8px;
    width: 100%;
    border: 2px solid var(--borderColor);
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

const SearchItem = styled.div`
    display: flex;
    height: 35px;
    align-items: center;
`

const SearchLabel = styled.div`
    width: 30%;
    color: var(--second);
    text-align: center;
`

const SearchForm = styled.div`
    width: 70%;
`

const List = styled.div`
    margin-top: 15px;
`

const Item = styled.div`
    padding: 15px;
    border-bottom: 1px solid var(--borderColor);

    span {
        margin-right: 10px;
    }

    & > div {
        line-break: auto;
        margin-bottom: 6px;
    }
`