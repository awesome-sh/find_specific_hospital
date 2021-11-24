import React from 'react'
import styled from 'styled-components'

function Top() {
    return (
        <TopWrap>
            <Logo>
                <h3>FSH</h3>
                <p>Find Specific Hospital</p>
            </Logo>
            <LogoDesc>
                　· 경기도 특수 수술/시술 병원찾기 서비스
            </LogoDesc>
        </TopWrap>
    )
}

export default Top

const TopWrap = styled.div`
    width: 100%;
    padding: 25px;
    border-bottom: 1px solid #e8eaee;
`

const Logo = styled.div`
    display: flex;
    height: 40px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;

    h3 {
        font-family: 'paybooc-ExtraBold';
        color: #2955a1;
        font-size: 28px;
        border-radius: 8px;
        font-weight: bold;
    }

    p {
        border-radius: 3px;
        margin-left: 10px;
        padding: 4px 6px 4px 6px;
        font-size: 11px;
        letter-spacing: 0px;
        color: #fff;
        background: #2955a1;
    }
`

const LogoDesc = styled.div`
    margin-top: 5px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: #6c6f75;
`