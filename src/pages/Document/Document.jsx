import React from 'react'
import styled from 'styled-components'

function Document() {
    return (
        <Wrap>
            이 웹사이트는 구글 개발자 계정<br/>
            (seonghwa0928@gmail.com) 소유임을 인증합니다.<br/>
            <hr/> <br/>
            I certify that this website is owned by <br/>a Google developer account (seonghwa0928@gmail.com).
        </Wrap>
    )
}

export default Document

const Wrap = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    line-height: 24px;

    h3 {
        color: var(--primary);
    }

    a {
        margin-top: 15px;
        color: var(--primary);
        font-size: 14px;
        letter-spacing: 0px;
    }
`