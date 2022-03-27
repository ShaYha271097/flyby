/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookMark from "../../assets/base64/bookmark.json";
import Star from "../../assets/base64/star.json";
import LogoSpace from "../../assets/icon1.png";
import img1 from "../../assets/Footer/1.svg";
import img2 from "../../assets/Footer/2.svg";
import img3 from "../../assets/Footer/3.svg";
import img4 from "../../assets/Footer/4.svg";
import img5 from "../../assets/Footer/5.svg";
import img6 from "../../assets/Footer/6.svg";
import img7 from "../../assets/Footer/7.svg";

export default function Footer() {
	const [imageBookMark, setImageBookMark]: any = useState();
	const [imageStar, setImageStar]: any = useState();

	const configIndexedData = async () => {
		const bookMark = await localStorage.getItem("flyby_bookmark");
		if (bookMark) {
			setImageBookMark(bookMark);
		} else {
			localStorage.setItem("flyby_bookmark", BookMark.data);
			setImageBookMark(BookMark.data);
		}

		const logoStar = await localStorage.getItem("flyby_star");
		if (logoStar) {
			setImageStar(logoStar);
		} else {
			localStorage.setItem("flyby_star", Star.data);
			setImageStar(Star.data);
		}
	};

	useEffect(() => {
		configIndexedData();
	}, []);

	return (
		<>
			<FooterWrapper>
				<Privacy className="social" style={{ display: "flex" }}>
					<a href="https://forbitswap.medium.com/" target="_blank">
						<img src={img1} alt="" />
					</a>
					<a href="https://www.reddit.com/r/forbitswap/" target="_blank">
						<img src={img2} alt="" />
					</a>
					<a href="https://discord.gg/CnJqNa2wfG" target="_blank">
						<img src={img3} alt="" />
					</a>
					<a href="https://github.com/forbitswap" target="_blank">
						<img src={img4} alt="" />
					</a>
					<a href="https://t.me/flybyLaunchpad" target="_blank">
						<img src={img5} alt="" />
					</a>
					<a href="https://twitter.com/forbitswap" target="_blank">
						<img src={img6} alt="" />
					</a>
					<a href="https://www.youtube.com/channel/UCU9ejvfmL6p2Pdwp2-q163w" target="_blank">
						<img src={img7} alt="" />
					</a>
				</Privacy>
				<Privacy style={{ display: "flex" }}>
					<WrapperPolicy href="/policy.pdf" target="_blank">
						<Image src={imageBookMark} alt="" width="10px" height="10px" />
						<Span>Privacy Policy</Span>
					</WrapperPolicy>
					<WrapperPolicy href="/terms-of-service.pdf" target="_blank">
						<Image src={imageBookMark} alt="" width="10px" height="10px" />
						<Span>Terms of service</Span>
					</WrapperPolicy>
					<WrapperPolicy>
						<Image src={imageStar} alt="" width="10px" height="10px" />
						<Span>forbitswap</Span>
					</WrapperPolicy>
				</Privacy>

				<Privacy>
					<WrapperPolicy>
						<TextP>forbitspace foundation LLC</TextP>
					</WrapperPolicy>
					<WrapperPolicy>
						<LogoFS width="20px" src={LogoSpace} alt="no-image" />
						<TextP>© 2021 @forbitspace, All Rights Reserved</TextP>
					</WrapperPolicy>
				</Privacy>
			</FooterWrapper>
		</>
	);
}

const FooterWrapper = styled.div`
	/* position: absolute;
    bottom: 10px; */
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	font-size: 0.8rem;
	align-items: center;

	justify-content: space-between;
	width: 90%;
	margin: auto;
	gap: 15px;
	.social {
		@media (max-height: 841px) {
			display: none;
		}
		a {
			transition: all 0.5s ease-in-out;
			:hover {
				transform: scale(1.1);
			}
			img {
				width: 25px;
				height: auto;
			}
		}
	}
	@media (max-width: 973px) {
		justify-content: center;
	}
`;

const Privacy = styled.div`
	margin-top: 10px;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	align-items: center;
`;

const Span = styled.span`
	color: white;
`;

const WrapperPolicy = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	font-style: italic;
	color: white !important;
	text-decoration: none;
	&:hover {
		text-decoration: none;
	}
`;

const Image = styled.img<{ width: string }>`
	width: ${({ width }) => width};
	filter: invert(1) sepia(1) saturate(5) hue-rotate(180deg);
`;

const LogoFS = styled.img<{ width: string }>`
	width: ${({ width }) => width};
`;

const TextP = styled.p`
	margin: 0;
`;
