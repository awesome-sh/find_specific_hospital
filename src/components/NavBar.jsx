import React from 'react'
import styled from 'styled-components'

function NavBar() {
    return (
        <NavWrap>
            Navigation Bar
        </NavWrap>
    )
}

export default NavBar

const NavWrap = styled.div`
    position: fixed;
    z-index: 9999;
    left: 0;
    right: 0;
    bottom: 0;
    height: 65px;
    border-top: 1px solid #e8eaee;
    display: flex;
    align-items: center;
    justify-content: center;
`