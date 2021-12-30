import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { List } from '../Detail/Detail'

function Favorite() {
    const [favorites, setFavorites] = useState(null)
    const [category, setCategory] = useState([])

    const createCategory = (localFavorite) => {
        const tempCategory = []
        for(let fav of localFavorite) {
            if(tempCategory.length > 0) {
                if(!tempCategory.find(v => v === fav.SPECL_TREAT_NM)) {
                    tempCategory.push( fav.SPECL_TREAT_NM )
                }
            } else {
                tempCategory.push( fav.SPECL_TREAT_NM )
            }
        }

        setCategory( tempCategory )
    }

    useEffect(() => {
        let localFavorite = window.localStorage.getItem('favorite') || JSON.stringify([])

        if(localFavorite.length !== 0) {
            setFavorites( localFavorite )
            createCategory( localFavorite )
        } else {
            localFavorite = JSON.parse(localFavorite)
        }
    }, [])

    const removeFavorite = ( data ) => {
        let newFavorite;

        if(favorites && favorites.length > 0) {
            if(window.confirm(`${data.MEDCARE_FACLT_NM} 병원을 즐겨찾기에서 삭제하시겠습니까?`)) {
                newFavorite = favorites
                newFavorite = newFavorite.filter(v => 
                    v.MEDCARE_FACLT_NM !== data.MEDCARE_FACLT_NM 
                    && v.MEDCARE_FACLT_TELNO !== data.MEDCARE_FACLT_TELNO)
                localStorage.setItem('favorite', JSON.stringify( newFavorite ))

                setFavorites( newFavorite )
                createCategory( newFavorite )
                window.alert('성공적으로 삭제되었습니다.')
            }
        }
    }

    return (
        <Wrap>
            <h1>즐겨찾기</h1>

            <Content>
                {
                    category && category.length > 0 ? 
                        category.map(v => 
                            <>
                                <h3>{v}</h3>
                                <List>
                                    {
                                        favorites.map((data, idx) => {
                                            if(data.SPECL_TREAT_NM === v) {
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
                                                                <li onClick={() => removeFavorite(data)}>삭제</li>
                                                            </ul>
                                                        </div>
                                                    </Item>
                                                )}
                                            }
                                        )
                                    }
                                </List>
                            </>
                        )
                    :
                    <NoData>
                        즐겨찾기 목록이 존재하지 않아요<br />
                        <p>병원 검색 - '별' 모양 아이콘 클릭 - 즐겨찾기에 추가</p>
                    </NoData>
                }
                
            </Content>
        </Wrap>
    )
}

export default Favorite

const Wrap = styled.div`
    width: 100%;
    padding: 0px 25px 25px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h1 {
        font-size: 21px;
        font-weight: 300;
        color: var(--primary);
        margin-bottom: 30px;
        width: 100%;
    }
`

const Content = styled.div`
    width: 100%;
    overflow: hidden;

    h3 {
        width: 100%;
        text-align: right;
        font-size: 15px;
    }
`

const NoData = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    line-height: 24px;

    p {
        font-size: 12px;
        color: #b8b8b8;
    }
`

const Item = styled.div`
    padding: 25px;
    background: #333333;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;

    .left {
        width: 75%;
        margin-right: 10px;

        & > div {
           margin-bottom: 8px; 
        }
    }

    .right {
        width: 25%;
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
            height: 40%;
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