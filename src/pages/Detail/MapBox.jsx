import React, { useEffect } from 'react'
import styled from 'styled-components'
import useClientSize from '../../hooks/useClientSize'
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'

function MapBox({ mapData }) {
    const clientSize = useClientSize()
    return (
        <>
            <MapWrap clientSize={clientSize}>
                <Map
                    center={{ lat: mapData.REFINE_WGS84_LAT, lng: mapData.REFINE_WGS84_LOGT }}
                    style={{ width: "100%", height: "360px" }}
                >
                    <CustomOverlayMap 
                        position={{ lat: mapData.REFINE_WGS84_LAT, lng: mapData.REFINE_WGS84_LOGT }}
                    >
                        <MapInfo>{mapData.MEDCARE_FACLT_NM}</MapInfo>
                    </CustomOverlayMap>
                </Map>
            </MapWrap>

            <Content>
                <ul>
                    <li>
                        <p>병원명</p>
                        <div className="desc">
                            {mapData.MEDCARE_FACLT_NM}
                        </div>
                    </li>
                    <li>
                        <p>도로명</p>
                        <div className="desc">
                            {mapData.REFINE_ROADNM_ADDR}
                        </div>
                    </li>
                    <li>
                        <p>지번</p>
                        <div className="desc">
                            {mapData.REFINE_LOTNO_ADDR}
                        </div>
                    </li>
                    <li>
                        <p>전화번호</p>
                        <div className="desc">
                            {mapData.MEDCARE_FACLT_TELNO}
                        </div>
                    </li>
                </ul>
            </Content>
        </>
    )
}

export default MapBox

const MapWrap = styled.div`
    margin-top: 10px;
    backdrop-filter: blur(8px);
    font-size: 24px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 4px solid var(--deep);
    box-shadow: 0 3px 5px var(--deep2);
`

const MapInfo = styled.div`
    background: linear-gradient(160deg, var(--deep), var(--third));
    box-shadow: 0 3px 6px var(--deep);
    border: 1px solid var(--deep);
    color: #fff;
    border-radius: 15px;
    padding: 7px 15px;
`

const Content = styled.div`
    margin-top: 20px;
    padding-bottom: 40px;

    ul li {
        margin-bottom: 15px;

        p {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 7px 15px;
            width: fit-content;
            height: 24px;
            border: 1px solid var(--borderColor);
            color: var(--primary);
            border-top-left-radius: 8px;
            border-bottom-right-radius: 8px;
            margin-bottom: 10px;
        }

        .desc {
            padding-left: 15px;
            font-size: 12px;
        }
    }
`