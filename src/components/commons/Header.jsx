import React from 'react';
import logoSvg from "../../assets/images/logo-header.svg";
import "./Header.css";

export default function Header() {
    return (
        <nav className="navbar is-info is-fullwidth" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <svg width="640" height="160" viewBox="0 0 640 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <image href={logoSvg} width="100%" height="100%" />
                    </svg>
                </a>
            </div>
        </nav>
    );
}
