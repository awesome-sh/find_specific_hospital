import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import StarOff from '../assets/icon/star-off.png'
import Option from '../assets/icon/option.png'
import Home from '../assets/icon/home.png'
import { useNavigate } from 'react-router-dom'

function Bottom() {
    const navigate = useNavigate()

    const customAnimation = useSpring({ 
        loop: false,
        delay: 250,
        to: {
            bottom: '0',
            opacity: 1
        },
        from: {
            bottom: '-30px',
            opacity: 0
        }
    })


    return (
        <animated.div style={customAnimation}>
            <BottomWrap>
                <ul>
                    <li onClick={() => navigate('/main')}><img src={Home} alt="img"/></li>
                    <li><img src={StarOff} alt="img"/></li>
                    <li><img src={Option} alt="img"/></li>
                </ul>
            </BottomWrap>
        </animated.div>
    )
}

export default Bottom

const BottomWrap = styled.div`
    position: fixed;
    z-index: 99999;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: linear-gradient(var(--deep), var(--third));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -0px -3px 5px rgba(69, 196, 133, 0.253);

    ul {
        display: flex;
    }

    li {
        cursor: pointer;
        width: 90px;
        height: 35px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;

        img {
            width: 21px;
            height: 21px;
        }

        &:nth-last-child(1) { 
            border-right: 0px;
        }
    }
`
