import React, { useEffect, useState, useRef } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import useWindowSize from "../hooks/useWindowSize";

function Header({horizontalPadding, handleNavigate}) {
    const size = useWindowSize()

    return(
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: horizontalPadding, paddingRight: horizontalPadding}}>
            <div>
                <p style={{color: "#fff", fontFamily: "Poppins", fontSize: 20, marginTop: 20}}>Finn</p>
            </div>
            <div>
                {size.width > 400 && <ul style={{color: "#fff", display: "flex", listStyle:"none", fontFamily: "Poppins"}}>
                    <li onClick={() => {
                        handleNavigate('showcase')
                    }} style={{paddingRight: 15, cursor: "pointer"}}>Portfolio</li>
                    <li onClick={() => {
                        handleNavigate('about')
                    }} style={{paddingRight: 15, cursor: "pointer"}}>About</li>
                    <li onClick={() => {
                        handleNavigate('cases')
                    }} style={{paddingRight: 15, cursor: "pointer"}}>Cases</li>
                    <li onClick={() => {
                        handleNavigate('contact')
                    }}>Contact</li>
                </ul>}
            </div>
        </div>
    )
}

export default Header;