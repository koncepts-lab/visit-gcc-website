'use client'
import Link from "next/link";
import MobileMenu from "../layouts/mobile-menu";
import UseSticky from "@/hooks/UseSticky";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/img/logo.svg";
import Logo_white from "../../public/assets/img/Logo_white.png";

const menu_data = [
	
	{ id: 1, title: "Events", link: '/events', has_dropdown: false },
	{ id: 2, title: "Fair", link: '/fair', has_dropdown: false },
	{ id: 3, title: "Studios", link: '/studios', has_dropdown: false },
	{ id: 4, title: "Sale", link: '/sale', has_dropdown: false },
	{ id: 5, title: "Installation", link: '/installation', has_dropdown: false },	
	{ id: 6, title: "Contact", link: "/contact", has_dropdown: false },
	{ id: 6, title: "Sign In", link: "/sign-in", has_dropdown: false },
	{ id: 6, title: "🛒 Cart", link: "/Cart", has_dropdown: false },
]
 
const Header = () => {
	const { sticky } = UseSticky();
	const [active, setActive] = useState(false);
	const [navTitle, setNavTitle] = useState("");
	const [lastScrollTop, setLastScrollTop] = useState(0);

	const handleActive = () => setActive(!active);

	const openMobileMenu = (menu) => {
		setNavTitle(navTitle === menu ? "" : menu);
	};

	useEffect(() => {
		const handleScroll = () => {
			const header = document.querySelector(".cs_sticky_header");

			if (!header) {
				console.error("Sticky header element not found");
				return;
			}

			const headerHeight = header.offsetHeight + 30;
			const windowTop = window.pageYOffset || document.documentElement.scrollTop;

			if (windowTop >= headerHeight) {
				header.classList.add("cs_gescout_sticky");
			} else {
				header.classList.remove("cs_gescout_sticky");
				header.classList.remove("cs_gescout_show");
			}

			if (header.classList.contains("cs_gescout_sticky")) {
				if (windowTop < lastScrollTop) {
					header.classList.add("cs_gescout_show");
				} else {
					header.classList.remove("cs_gescout_show");
				}
			}

			setLastScrollTop(windowTop);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollTop]);

	return (
		<>
			<header className={`cs_site_header cs_style1 cs_sticky_header cs_site_header_full_width ${sticky ? 'cs_gescout_sticky' : ''}`}>
				<div className="cs_main_header">
					<div className="container">
						<div className="cs_main_header_in">
							<div className="cs_main_header_left">
								<Link className="cs_site_branding logo-dark" href="/">
									<Image src={logo} alt="Logo" />
								</Link>
								<Link className="cs_site_branding logo-white" href="/">
									<Image src={Logo_white} alt="Logo" />
								</Link>
							</div>
							<div className="cs_main_header_right">
								<div className="cs_nav cs_medium">
									<MobileMenu active={active} navTitle={navTitle} openMobileMenu={openMobileMenu} />
									<span className={`cs_munu_toggle ${active ? "cs_toggle_active" : ""}`} onClick={handleActive}><span></span></span>
								</div>
								{/*

								<div className="cs_toolbox">
									<span className="cs_icon_btn">
										<span className="cs_icon_btn_in" onClick={handleActive}>
											<span></span>
											<span></span>
											<span></span>
											<span></span>
										</span>
									</span>
								</div>

								 */}
							</div>
						</div>
					</div>
				</div>
			</header>

			
		</>
	);
};

export default Header;
