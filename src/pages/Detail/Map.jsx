import React from 'react'
import styled from 'styled-components'
import useClientSize from '../../hooks/useClientSize'

function Map() {
    const clientSize = useClientSize()

    return (
        <MapWrap clientSize={clientSize}>
            지도표출
        </MapWrap>
    )
}

export default Map

const MapWrap = styled.div`
    background: rgba(0, 0, 0, 0.719);
    backdrop-filter: blur(8px);
    color: #fff;
    font-size: 24px;
    overflow: hidden;
    width: 100%;
    height: 100%;
`