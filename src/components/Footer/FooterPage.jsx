import React from 'react';
import './FooterPage.css';
import logoSvg from "../../assets/images/logo-haku.svg";

export default function FooterPage() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__row">
                    <div className="footer__col footer__col--content">
                        <div className="footer__logo-container">
                            <svg className='footer__logo' xmlns="http://www.w3.org/2000/svg">
                                <image href={logoSvg} width="100%" height="100%" />
                            </svg>
                            <h5 className="footer__title">Haku PetShop</h5>
                        </div>
                    </div>

                    <div className="footer__col footer__col--links">
                        <h5 className="footer__title">¡Síguenos!</h5>
                        <ul className="footer__list">
                            <li className="footer__list-item">
                                <a href="https://www.facebook.com/p/HAKU-Petshop-100065104568233/?locale=es_LA" className="footer__link">
                                    <i class="bi bi-facebook footer__icon"></i>
                                </a>
                            </li>
                            <li className="footer__list-item">
                                <a href="https://www.instagram.com/haku_pet_shop/" className="footer__link">
                                    <i className="bi bi-instagram footer__icon"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer__copyright">
                © {new Date().getFullYear()} Haku PetShop SA
            </div>
        </footer>
    );
}
