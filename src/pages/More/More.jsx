import React from 'react'
import styled from 'styled-components'

function More() {
    return (
        <Wrap>
            <div className="group">
                <div className="group-title">개발</div>
                <div className="info">
                    <ul>
                        <li>문의 : sihus@naver.com</li>
                        <li>블로그 : <a href="https://sihus.tistory.com" target="_blank">sihus.tistory.com</a></li>
                    </ul>
                </div>
            </div>

            <div className="group">
                <div className="group-title">데이터 출처</div>
                <div className="info">
                    <ul>
                        <li>경기데이터드림</li>
                        <li>사이트 : <a href="https://data.gg.go.kr/portal/mainPage.do" target="_blank">https://data.gg.go.kr</a></li>
                    </ul>
                </div>
            </div>
        </Wrap>
    )
}

export default More

const Wrap = styled.div`
    height: 100vh;
    line-height: 24px;

    a {
        color: var(--primary);
        font-size: 14px;
        letter-spacing: 0px;
    }

    .group {
        padding: 25px;
    }

    .group-title {
        font-size: 18px;
        margin-bottom: 15px;
    }
`