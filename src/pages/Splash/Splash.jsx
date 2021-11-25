import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// LogoIcon
import LogoIcon from '../../assets/icon/hospital.png'
import useClientSize from '../../hooks/useClientSize'
import SearchBg from '../../assets/search.svg'

function Splash() {
    const navigate = useNavigate()
    const clientSize = useClientSize()
	const isPc = clientSize?.width > 500;

    useEffect(() => {
        setTimeout(() => {
            navigate('/main')
        }, 3000)
    })

    return (
        <Wrap clientSize={clientSize} isPc={isPc}>
            <Outer>
                <Inner>
                    <img src={SearchBg} alt="img" />
                </Inner>
            </Outer>
        </Wrap>
    )
}

export default Splash

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% impotant;
    height: ${({clientSize}) => `${clientSize.height}px`};
`

const Outer = styled.div`
    display: flex;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(var(--primary), var(--second));
    box-shadow: 0px 3px 12px 6px rgba(69, 196, 133, 0.555);
    -webkit-animation: AnimationName 3s ease infinite; 
    -moz-animation: AnimationName 3s ease infinite; 
    -o-animation: AnimationName 3s ease infinite; 
    animation: AnimationName 3s ease infinite;


    @-webkit-keyframes AnimationName { 
        0% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
        50% {
            box-shadow: 0px 3px 15px 13px rgba(69, 196, 133, 0.555);
        }
        100% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
    } 
    
    @-moz-keyframes AnimationName { 
        0% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
        50% {
            box-shadow: 0px 3px 15px 13px rgba(69, 196, 133, 0.555);
        }
        100% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
    } 
    
    @-o-keyframes AnimationName { 
        0% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
        50% {
            box-shadow: 0px 3px 15px 13px rgba(69, 196, 133, 0.555);
        }
        100% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
    } 
    
    @keyframes AnimationName { 
        0% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
        50% {
            box-shadow: 0px 3px 15px 13px rgba(69, 196, 133, 0.555);
        }
        100% {
            box-shadow: 0px 3px 3px 6px rgba(69, 196, 133, 0.555);
        }
    }

    h3 {
        color: var(--primary);
        font-size: 28px;
        font-weight: 600;
        font-family: var(--enFont);
        border-radius: 8px;
    }

    p {
        margin-top: 1px;
        border-radius: 3px;
        margin-left: 10px;
        font-size: 10px;
        line-height: 12px;
        font-weight: 500;
        letter-spacing: 0px;
        text-align: center;
        color: var(--sub);
        font-family: var(--enFont);
    }
`

const Inner = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 180px;
    background: var(--background);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 80%;
        height: 80%;
    }
`