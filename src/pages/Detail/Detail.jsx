import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useNavigate, useParams } from 'react-router-dom'

import OPEN_DATA from '../../data/gyeonggi-open-data.json'
import { FindKoreanName } from '../../data/FindKoreanName'

import LeftArrow from '../../assets/icon/left-arrow.png'
import MapIcon from '../../assets/icon/location.png'
import StarOff from '../../assets/icon/star-off.png'
import MapBox from './MapBox'

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

    const [selectedNextSi, setSelectedNextSi] = useState('')

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        let localFavorite = window.localStorage.getItem('favorite') || JSON.stringify([])

        if(localFavorite.length !== 0) {
            setFavorites( localFavorite )
        } else {
            localFavorite = JSON.parse(localFavorite)
        }
    }, [])

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
        const unoverlapGun = Array.from(new Set(originDatas.filter(v => v.SIGUN_NM === selectedNextSi).map(v => v.REFINE_LOTNO_ADDR.split(' ')[2])))
        setGunArr( unoverlapGun )

        // Type Datas
        const unoverlapTypes = Array.from(new Set(originDatas.map(v => v.INDUTYPE_NM)))
        setTypes( unoverlapTypes )

        let result = datas

        if(selectedGun !== '') {
            result = Array.from(new Set(originDatas.filter(v => v.SIGUN_NM === selectedNextSi && v.REFINE_LOTNO_ADDR.split(' ')[2] === selectedGun)))
        }

        if(selectedSi !== selectedNextSi) {
            setSelectedSi(selectedNextSi)
            setSelectedGun('')
        }
        setDatas( result )
    }, [selectedSi, selectedNextSi, selectedGun])

    const [isOverClientHeight, setIsOverClientHeight] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsOverClientHeight(window.innerHeight/2 < (isNaN(window.pageYOffset) ? window.scrollY : window.pageYOffset) ? true : false)
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

    const customAnimation = useSpring({ 
        loop: false,
        delay: 500,
        to,
        from
    });

    const [isMap, setIsMap] = useState(false)
    const [mapData, setMapData] = useState()

    const handleOpenMap = (data) => {
        setIsMap(state => !state)
        setMapData(data)
    }

    /**
     * 중복체크 필요
     * @param {*} data : Hospital Data
     */
    const addFavorite = ( data ) => {
        let newFavorite = favorites;

        if(newFavorite.length > 0) {
            newFavorite.push( data )
            localStorage.setItem('favorite', JSON.stringify( newFavorite ))
        } else {
            newFavorite.push( data )
            localStorage.setItem('favorite', JSON.stringify( newFavorite ))
        }

        alert('즐겨찾기에 추가되었습니다.')
    }


    const isExist = (data) => {
        let result = false;
        let existFavorites = [];

        if(favorites && favorites.length > 0) {
            existFavorites = favorites.filter(v => v.MEDCARE_FACLT_NM === data.MEDCARE_FACLT_NM && v.REFINE_ROADNM_ADDR === data.REFINE_ROADNM_ADDR)
        }

        console.log( existFavorites )

        if(existFavorites.length > 0) {
            result = true;
        }

        return result;
    }

    const isDuplicate = () => {
        alert('이미 추가된 병원입니다.\n즐겨찾기 탭에서 삭제할 수 있습니다.')
    }

    return (
        <Wrap>
            <BackButton onClick={() => {
                isMap ? setIsMap(state => !state) : navigate('/main')
            }}>
                <img src={LeftArrow} alt="img" />
            </BackButton>

            {
                !isMap ?
                <>
                    <Header isOverClientHeight={isOverClientHeight}>
                        <HeaderTop isOverClientHeight={isOverClientHeight}>
                            <h1>
                                <span>{ FindKoreanName(category) }</span> 가능한 병원
                            </h1>

                            <div className="topBtn" onClick={() => window.scrollTo(0, 0)}>
                                <img src={LeftArrow} alt="img" />
                            </div>
                        </HeaderTop>

                        <SearchGroup>
                            <SearchItem>
                                <SearchLabel>지역</SearchLabel>
                                <SearchForm>
                                    <select onChange={(e) => setSelectedNextSi(e.target.value)} value={selectedSi}>
                                        <option>선택</option>
                                        { siArr.length > 0 && siArr.map((si, idx) => 
                                            <option key={idx}>{si}</option>
                                        )}
                                    </select>
                                </SearchForm>
                            </SearchItem>
                            <SearchItem>
                                <SearchLabel>구·동·읍·면</SearchLabel>
                                <SearchForm>
                                    <select onChange={(e) => setSelectedGun(e.target.value)} value={selectedGun}>
                                        { gunArr.length > 0 ? 
                                            <>
                                                <option selected>선택</option>
                                                {   
                                                    gunArr.map((gun, idx) => 
                                                        <option key={idx}>{gun}</option>
                                                    )
                                                }
                                            </>
                                            :
                                            <option>선택</option>
                                        }
                                    </select>
                                </SearchForm>
                            </SearchItem>
                        </SearchGroup>
                    </Header>

                    <animated.div style={customAnimation}>
                        <List>
                            {
                                datas.length > 0 ?
                                    datas.map((data, idx) => {
                                        return (
                                            <Item key={idx}>
                                                <div className="left">
                                                    <div className={
                                                        data.INDUTYPE_NM === '병원' ? 'type h01' 
                                                        : data.INDUTYPE_NM === '상급종합' ? 'type h02'
                                                        : data.INDUTYPE_NM === '요양병원' ? 'type h03'
                                                        : data.INDUTYPE_NM === '종합병원' ? 'type h04'
                                                        : 'type h05' // 의원
                                                    }>{data.INDUTYPE_NM}</div>
                                                    <div className="name">{data.MEDCARE_FACLT_NM}</div>
                                                    <div className="address">{data.REFINE_ROADNM_ADDR}</div>
                                                    {/*<div className="tel">Tel) {data.MEDCARE_FACLT_TELNO}</div>}*/}
                                                </div>
                                                <div className="right">
                                                    <ul>
                                                        <li onClick={() => handleOpenMap(data)}><img src={MapIcon} alt="img"/></li>
                                                        <li 
                                                            className={isExist(data) ? 'selected' : null} 
                                                            onClick={() => isExist(data) ? isDuplicate() : addFavorite(data)}>
                                                                <img src={StarOff} alt="img" />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Item>
                                        )}
                                    )
                                :
                                    <div className='non-list'>
                                        지역을 선택해주세요.
                                    </div>
                            }
                        </List>
                    </animated.div>
                </>
                :
                <MapBox mapData={mapData} />
            }
        </Wrap>
    )
}

export default Detail

const Wrap = styled.div`
    padding: 25px 25px;

    h1 {
        font-size: 15px;
        font-weight: 300;
        margin-top: 15px;
        margin-bottom: 15px;

        span {
            color: var(--primary);
            font-size: 18px;
            margin-right: 5px;
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
    padding: ${({isOverClientHeight}) => isOverClientHeight ? '20px 25px' : '0px'};
    transition: all 0.2s ease-out;
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
    border: 2px solid var(--primary);
    box-shadow: 0px 3px 5px rgba(69, 196, 133, 0.397);
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
    width: 40%;
    color: var(--second);
    text-align: center;
`

const SearchForm = styled.div`
    width: 60%;
`

export const List = styled.div`
    margin-top: 25px;
    padding-bottom: 30px;

    .non-list {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 200px;
    }
`

export const Item = styled.div`
    padding: 25px;
    background: #333333;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;

    .left {
        width: 85%;
        margin-right: 10px;

        & > div {
           margin-bottom: 8px; 
        }
    }

    .right {
        width: 15%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        ul {
            width: 70%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        li {
            cursor: pointer;
            width: 100%;
            height: 35%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #636366;
            border-radius: 3px;
            margin-bottom: 10px;
            transition: all 0.3s ease-out;

            &:nth-last-child(1) {
                margin-bottom: 0px;
            }

            &:hover {
                background: linear-gradient(160deg, var(--primary), var(--third));
                border: 2px solid var(--primary);
                box-shadow: 0px 3px 5px rgba(69, 196, 133, 0.397);
            }
        }
        img {
            width: 16px;
            height: 16px;
        }

        .selected {
            background: linear-gradient(160deg, var(--primary), var(--third));
            border: 2px solid var(--primary);
            box-shadow: 0px 3px 5px rgba(69, 196, 133, 0.397);
        }
    }

    span {
        margin-right: 10px;
    }

    .type {
        padding: 2px 6px;
        border-radius: 4px;
        width: fit-content;
        font-size: 12px;
    }

    .h01 { color: #fff; background: #cf5050; }
    .h02 { color: #fff; background: #dd7732; }
    .h03 { color: #fff; background: #80ad55; }
    .h04 { color: #fff; background: #355496; }
    .h05 { color: #fff; background: #ca5888; }

    .name {
        margin-top: 8px;
        font-size: 14px;
    }
    
    .address {
        font-size: 11px;
        color: #b6b6b6;
    }

    .tel {
        letter-spacing: 0.5px;
        font-size: 11px;
    }
`