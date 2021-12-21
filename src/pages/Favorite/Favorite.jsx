import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Item, List } from '../Detail/Detail'

function Favorite() {
    const [favorites, setFavorites] = useState(null)

    useEffect(() => {
        let localFavorite = localStorage.getItem('favorite') || []

        if(localFavorite) {
            localFavorite = JSON.parse(localFavorite)
            console.log( localFavorite )
            setFavorites( localFavorite )
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
                window.alert('성공적으로 삭제되었습니다.')
            }
        }
    }

    return (
        <Wrap>
            <h1>즐겨찾기</h1>

            <Content>
                {
                    favorites && favorites.length > 0 ?
                    <List>
                        {
                            favorites.map((data, idx) => {
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
                            )
                        }
                    </List>
                    :
                    <>
                        즐겨찾기 목록이 존재하지 않아요<br />
                        병원 검색 - '별' 모양 아이콘 클릭 - 즐겨찾기에 추가
                    </>
                }
                
            </Content>
        </Wrap>
    )
}

export default Favorite

const Wrap = styled.div`
    width: 100%;
    padding: 25px 25px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h1 {
        font-size: 18px;
        font-weight: 300;
        color: var(--primary);
    }
`

const Content = styled.div`
    width: 100%;
`