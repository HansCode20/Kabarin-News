import React, { useEffect, useState } from 'react';
// Logo
import LogoPutih from "../assets/Kabarin FW.png";
import LogoHitam from '../assets/Kabarin FH.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav 
            className={`p-4 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/60' : 'bg-transparent'} shadow-md`}
        >
            <div className="container mx-auto flex items-center justify-center">
                <img 
                    src={isScrolled ? LogoPutih : LogoHitam} 
                    alt="Logo" 
                    className="w-40 h-auto transition-opacity duration-300"
                />
            </div>
        </nav>
    );
}

export default Navbar;
