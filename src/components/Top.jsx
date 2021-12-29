import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

function Top() {
    const navigate = useNavigate()

    const to = {
        transform: 'translateY(0)',
        opacity: 1
    }

    const from = {
        transform: 'translateX(-60px)',
        opacity: 0
    }

    const customAnimation = useSpring({ 
        loop: false,
        delay: 300,
        to,
        from
    });

    return (
        <TopWrap>
            <TopBorder />
            <animated.div style={customAnimation}>
                <Logo onClick={() => navigate('/main')}>
                    <h3>FSH+</h3>
                    <p>FIND<br/>Specific Hospital</p>
                </Logo>
            </animated.div>
        </TopWrap>
    )
}

export default Top

const TopWrap = styled.div`
    width: 100%;
    padding: 25px;
`

const TopBorder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(160deg, var(--primary), var(--third));
`

const Logo = styled.div`
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;

    h3 {
        color: var(--primary);
        font-size: 28px;
        font-weight: 800;
        font-family: var(--enFont);
        padding-right: 15px;
        border-right: 1px solid var(--borderColor);
    }

    img {
        width: 22px;
        height: 22px;
        vertical-align: top;
        margin-right: 10px;
    }

    p {
        margin-top: 1px;
        border-radius: 3px;
        margin-left: 15px;
        font-size: 10px;
        line-height: 12px;
        font-weight: 500;
        letter-spacing: 0px;
        color: var(--sub);
        font-family: var(--enFont);
    }
`