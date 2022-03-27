// import { transparentize } from 'polished'
import React, { useMemo } from "react";
import styled, {
	ThemeProvider as StyledComponentsThemeProvider,
	createGlobalStyle,
	css,
	DefaultTheme,
} from "styled-components";
// import { useIsDarkMode } from "../state/user/hooks";
import { Text, TextProps } from "rebass";
import { Colors } from "./styled";

export * from "./components";

const MEDIA_WIDTHS = {
	upToExtraSmall: 500,
	upToSmall: 720,
	upToMedium: 960,
	upToLarge: 1280,
};

const mediaWidthTemplates: {
	[width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
	(accumulator as any)[size] = (a: any, b: any, c: any) => css`
		@media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
			${css(a, b, c)}
		}
	`;
	return accumulator;
}, {}) as any;

const white = "#FFFFFF";
const black = "#000000";

export function colors(darkMode: boolean): Colors {
	return {
		// base
		white,
		black,

		// text
		text1: darkMode ? "#ffffff" : "#565a69",
		text2: darkMode ? "#ffffff93" : "#ffffff93",
		text3: darkMode ? "#ffffff" : "#ffffff",
		text4: darkMode ? "#C3C5CB" : "#C3C5CB",
		text5: darkMode ? "#a0a2a6" : "#a0a2a6",
		text6: darkMode ? "#1265ab" : "#6c7e99",
		text7: darkMode ? "#ffffff" : "#647793",
		text8: darkMode ? "#ffffff" : "#007fff",
		text9: darkMode ? "#ffffff" : "#000000",

		// backgrounds / greys
		bg1: darkMode
			? "#0b2e4b 25%,#04223c 50%,#0b2e4b 75%"
			: "#ecf1f3 25%,#c8ced9 50%,#ecf1f3 75%",
		bg2: darkMode ? "#0a2e4b" : "#e0f7ff",
		bg3: darkMode ? "#a0a2a6" : "#a0a2a6",
		bg4: darkMode ? "#CED0D9" : "#CED0D9",
		bg5: darkMode ? "#0b4574" : "#ecf1f3",
		bg6: darkMode ? "#001426" : "#ecf1f3",
		bg7: darkMode ? "#0e2940" : "#e0f7FF",
		bg8: darkMode ? "#0a2e4b" : "#eceef2",
		bg9: darkMode ? "#2789f44d" : "transparent",
		bg10: darkMode ? "#0168ff" : "#789dbe",
		bg11: darkMode ? "#178cd6" : "#ecf1f3",
		bg12: darkMode ? "#001426" : "#ffffff",
		bg14: darkMode ? "#004078" : "#FFFFFF",
		bg15: darkMode ? "#004078" : "#f7f8fa",
		bg16: darkMode ? "#1571dc2b" : "#f7f8fa",
		bg17: darkMode ? "#032441" : "#f7f8fa",
		bg18: darkMode ? "#0768ff" : "#d8d8d8",

		//specialty colors
		modalBG: darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.3)",
		advancedBG: darkMode ? "#0168ff" : "#789dbe",
		borderBG: darkMode ? "#09385f" : "#ffffff",

		//primary colors
		primary1: darkMode ? "#007bff" : "#007bff",
		primary2: darkMode ? "#FF8CC3" : "#FF8CC3",
		primary3: darkMode ? "#D1EFF4" : "#D1EFF4",
		primary4: darkMode ? "#c1eef3" : "#c1eef3",
		primary5: darkMode ? "#f1f0f0" : "#f1f0f0",

		// color text
		primaryText1: darkMode ? "#007bff" : "#007bff",

		// secondary colors
		secondary1: darkMode ? "#007bff" : "#007bff",
		secondary2: darkMode ? "#F6DDE8" : "#F6DDE8",
		secondary3: darkMode ? "#f1f0f0" : "#f1f0f0",

		// other
		red1: darkMode ? "#fff" : "#fff",
		red2: "#F82D3A",
		green1: "#27AE60",
		yellow1: "#FFE270",
		yellow2: "#000",
		blue1: "#2172E5",
		gradient: darkMode ? "#0168ff" : "#0168ff",
		gradient1: darkMode
			? "linear-gradient(90deg,rgb(93 247 242) 0%,rgb(195 229 249) 100%)"
			: "linear-gradient(90deg,rgb(93 247 242) 0%,rgb(195 229 249) 100%)",
		gradient2: darkMode
			? "linear-gradient(30deg,#0090ff,#032d47)"
			: "linear-gradient(30deg,#06e8ff,#0a47fe)", //linear-gradient(45deg, #0eaefc, #0bd8ff)

		filter: darkMode ? "" : "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
		// dont wanna forget these blue yet
		// blue4: darkMode ? '#153d6f70' : '#C4D9F8',
		// blue5: darkMode ? '#153d6f70' : '#EBF4FF',
	};
}

export function theme(darkMode: boolean): DefaultTheme {
	return {
		...colors(darkMode),

		grids: {
			sm: 8,
			md: 12,
			lg: 24,
		},

		//shadows
		shadow1: darkMode ? "#000" : "#2F80ED",

		// media queries
		mediaWidth: mediaWidthTemplates,

		// css snippets
		flexColumnNoWrap: css`
			display: flex;
			flex-flow: column nowrap;
		`,
		flexRowNoWrap: css`
			display: flex;
			flex-flow: row nowrap;
		`,
	};
}

// export default function ThemeProvider({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	const darkMode = useIsDarkMode();

// 	const themeObject = useMemo(() => theme(darkMode), [darkMode]);

// 	return (
// 		<StyledComponentsThemeProvider theme={themeObject}>
// 			{children}
// 		</StyledComponentsThemeProvider>
// 	);
// }

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
	color: ${({ color, theme }) => (theme as any)[color]};
`;

export const TYPE = {
	main(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
	},
	link(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
	},
	black(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
	},
	white(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"white"} {...props} />;
	},
	body(props: TextProps) {
		return (
			<TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />
		);
	},
	largeHeader(props: TextProps) {
		return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
	},
	mediumHeader(props: TextProps) {
		return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
	},
	subHeader(props: TextProps) {
		return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
	},
	small(props: TextProps) {
		return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
	},
	blue(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
	},
	yellow(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"yellow1"} {...props} />;
	},
	darkGray(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"text3"} {...props} />;
	},
	gray(props: TextProps) {
		return <TextWrapper fontWeight={500} color={"bg3"} {...props} />;
	},
	italic(props: TextProps) {
		return (
			<TextWrapper
				fontWeight={500}
				fontSize={12}
				fontStyle={"italic"}
				color={"text"}
				{...props}
			/>
		);
	},
	error({ error, ...props }: { error: boolean } & TextProps) {
		return (
			<TextWrapper
				fontWeight={500}
				color={error ? "red1" : "text"}
				{...props}
			/>
		);
	},
};

export const FixedGlobalStyle = createGlobalStyle`
  html,  textarea, button {
      font-family: 'Roboto', sans-serif;
      font-display: fallback;
  }

.inner{
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 12px 3vw;
}
@media (max-width: 770px){
  .inner {
    padding: 11px 3%;
  }
}
@media (max-width: 576px){
  .intercom-lightweight-app-launcher{
    bottom: 68px !important;
  }

  .intercom-launcher-frame{
    bottom: 68px !important;
  }
}

/* LOGO */
.logo_dark{
  display:none;
}
body.dark-mode .logo_dark{
  display:block;
}
body.dark-mode .logo_light{
  display:none;
}

.darkmode-img {
  display: none;
}




body.dark-mode .darkmode-img{
  display: block;
}

body.dark-mode .lightmode-img {
  display: none;
}

.tab-name {
  color: #a5aaae;
}


body.dark-mode .tab-name {
  color: #d8d8d8 !important;
}

.swap-anyway {
  background: #0168ff;
  border: 1px solid white!important;
  transition: all ease-in-out .5s;
  box-shadow: rgb(0 0 0 / 19%) -3px 2px 3px 0px, rgb(0 0 0 / 23%) 0px 4px 12px; 
  &:hover {
    background-size: 200%;
    background-position: right;
    box-shadow: none;
  }
}
  .container{
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 9600px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }

//carrot modal
body .carrotquest-css-reset iframe html body.carrot-frame-body #carrotquest-messenger-title .title-name>span:first-child{
  font-style: italic!important;
  padding-right: 3px;
}
.bgrfix{
  z-index: 0;
  width: 100vw;
  height: 100vh;
  -webkit-user-select: none;
  user-select: none;
  position: fixed;
  top: 0vh;
}
.thumfix{
  mix-blend-mode: overlay;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 160px;
  top: 0px;
  background-repeat: no-repeat;
  opacity: 0.05 !important;
  background-size: auto;
  background-position: center;
}
/* DARK MODE */

body.dark-mode .menu_mode{
  background:#000;
}
body.dark-mode .link-mode{
  color:#fff;
}
body.dark-mode .modetext{
  color: rgb(125,125,125);
}
body.dark-mode .modeselect{
  color: #fff;
}
body.dark-mode .modepra{
  color:#afb8bd!important;
}
body.dark-mode .bgr-fix{
  display: none;
}
body.dark-mode .bg-btn-mode{
  background: #02192c;
  border: 1px solid #163d67;
  &:hover {
    background: none;
    border: 1px solid #0168ff;
  }
}
.bg-mode{
  background-color: #fff!important;
  border: 1px solid #7998d1;
}
body.dark-mode .bg-mode{
  background-color: transparent!important;
  border: 1px solid #09385f;
}
.bg-setting{
  background-color: #fff!important;
  border: 2px solid #0168ff00;
}
body.dark-mode .bg-setting{
  background-color: #001426!important;
  border: 1px solid #0168ff00;
}
.bg-liquid{
  background-color: #fff;
  border: 1px solid #7998d1;
  :hover {
      background-color: #ecf5ff;
  }
  &.active {
      background-color: #ecf5ff;
  }
}
body.dark-mode .bg-liquid{
  border: 1px solid #0b365b;
  background-color: #02192c;

  :hover {
    background-color: #0b4574;
  }
  &.active {
    background-color: #173657;
  }
}

.bg-wrap{
  background-color: #fff;
  border: 2px solid #e0f7ff;
}
body.dark-mode .bg-wrap{
  border: 1px solid #265aa8;
  background-color: #02192c;
}

.bg-gas-wrap{
  background-color: #fff;
  border: 1px solid #7998d1;

  &.active {
      background-color: #ecf5ff;
  }
}
body.dark-mode .bg-gas-wrap{
  border: 1px solid #0b365a;
  background-color: #02192c;
  &.active {
    background-color: #0b4574;
  }
}

.bg-gas-price{
  background-color: #fff;
  &.active {
      background-color: #ecf5ff;//e0f7ff
  }
}
body.dark-mode .bg-gas-price{
  background-color: #02192c;
  &.active {
    background-color: #0b4574;
  }
}

.bg-gas-mode{
  border: 1px solid #ecf1f3;
  background: #ecf1f3;
}
body.dark-mode .bg-gas-mode{
  border: 1px solid #09385f;
  background: #001426;
  @media (max-width: 576px) {
    background: #011c35;
  }
}

.bg-limit{
  background-color: #ecf1f3;
}

body.dark-mode .bg-limit{
  background-color: #0a2e4b;
}

.bg-limit-option{
  background-color: #ffffff;
}

body.dark-mode .bg-limit-option{
  background-color: #001f38;
}

.bg-circle{
  border: 1px solid #96bfe2;
  /* background-image: radial-gradient(#ffffff,#e0f6ff 70%); */
  background-color: #fff;
  /* border: 2px solid transparent; */
  background-clip: padding-box;
  box-shadow: rgb(0 0 0 / 23%) -1px 7px 18px 0px;
}
.bg-circle::after{
  /* content: ''; */
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  border-radius: 50%;
  /* background-image: linear-gradient(39deg, #00ff00 2%, #00f221 10%, #00d378 28%, #00a5f7 52%, #00ffeb 98%); */
  background-color: #96bfe2;
  z-index:-1;
}
body.dark-mode .bg-circle{
  border: 2px solid #108edc;
  background-image: linear-gradient(to right,#0090ffb5,#032d47b5);
  background-color: transparent;
}
body.dark-mode .bg-circle::after{
  content: '';
  background-color: #001426;
  background-image: none;
}
.bg-exchange{
  background-color: #ecf1f3;
}
body.dark-mode .bg-exchange{
  background-color: #0058c4;
}
.bg-chart{
  background: #fff;
  border-color: transparent;
  /* box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgb(0 0 0 / 23%) -1px 7px 18px 0px; */
  box-shadow: 0 3.75912px 22.5547px rgb(0 0 0 / 8%);
}
body.dark-mode .bg-chart{
  background: #001426;

  border: 2.5px solid rgba(39, 137, 224, 0.3);
  box-shadow: none;
  @media (max-width: 576px) {
    background: #011c35;
  }
}

.bg-pool{
  background-color: #e0f6ff;
    &.active {
      border: solid 0.5px #e0f5ff;
      background-color: #ffffff;
    }
}
body.dark-mode .bg-pool{
  @media (min-width: 1025px) {
    &.active {
      border: solid 0.5px #2789e0;
      background-color: #001426;
    }
  }
}
body.dark-mode .bg-pool-btn{
  background-color: rgba(39, 137, 224, 0.15);
  :hover {
    background-color: rgba(39, 137, 224, 0.65);
  }
}

.bg-pool-chart{
    background-color: #ffffff;
    border: 2.5px solid #ffffff;
    box-shadow: 1px 1px 5px #00000030;
}
body.dark-mode .bg-pool-chart{
  background-color: #001426;
  border: 2.5px solid rgba(39,137,224,0.3);
}
.bg-farm{
  background-color: #ffffff;
}
body.dark-mode .bg-farm{
  border: solid 0.5px #0769ff;
  background-color: #04223c;
}

.bg-farm__btn{
  background: #e3e3e3;
  &.active{
    background: #a5c9ff;
  }
}
body.dark-mode .bg-farm__btn{
  background: #08152782;
  &.active{
    background: #5095ff7d;
  }
}

.bg-ins{
    background-color: #ffffff;
    border: 1px solid #c2dcfc;
    /* box-shadow: 1px 1px 5px #00000090; */
}
body.dark-mode .bg-ins{
  background-color: #02192c;
  border: 1px solid #173658;
  /* box-shadow: 0px 0px 0px #00000090; */
}

.bg-ins__tab{
    background-color: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 1px 1px 5px #00000090;
}
body.dark-mode .bg-ins__tab{
  border: 1px solid rgba(96, 96, 96, 0.2);
  background-color: #0a2e4b;
  box-shadow: 0px 0px 0px #00000090;
}

.bg-info__btn{
  background-color: #ffffff;
    border: 1px solid #000;
  span{
    background-color: #ffffff;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
}
body.dark-mode .bg-info__btn{
  background-color: #edeef2;
  span{
  background-color: #edeef2;
  }
}

//BORDER

.bd-orbit{
  border: 2px dashed #09dde9;
  /* box-shadow: 1px 1px 5px 0px #09dde9; */
}
body.dark-mode .bd-orbit{
  border: 2px dashed #0168ff;
  /* box-shadow: 1px 1px 5px #0168ff; */
}



.bd-info{
  border: 1px solid #657794;
}
body.dark-mode .bd-info{
  border: 1px solid #fff;
}

body.dark-mode .btn-mode{
  color: rgb(109,168,255);
  border: 1px solid rgb(26 54 88);
}

.text {
  color: #657794 !important;
}

.text-dark2{
  color: #657794 !important;
}

.text-update {
  font-size: 12px!important;

}

.text3 {
  color: black;
}

.text-light{
  color: #13a6ff!important;
}
.nav-text{
  span:hover{
    color: #000;
  }
}
body.dark-mode .nav-text{
  span:hover{
    color: #0168ff;
  }
}

.light-clock {
  display: block;
}
.dark-clock {
  display: none;
}

body.dark-mode .dark-clock {
  display: block;
}

body.dark-mode .light-clock {
  display: none;
}
@keyframes background {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

// .output-amount-loading-light-mode {
//   animation: background 1.5s infinite linear;
//   animation-fill-mode: both;
//   background: linear-gradient(to left,#ecf1f3 25%,#c8ced9 50%,#ecf1f3 75%);
// }

// .output-amount-loading-dark-mode {
//   animation: background 1.5s infinite linear;
//   animation-fill-mode: both;
//   background: linear-gradient(to left,#0b2e4b 25%,#04223c 50%,#0b2e4b 75%);
// }

body.dark-mode .text-dark {
  color: #7197ba9e!important;
}
body.dark-mode .text-dark2 {
  color: #97bfe4e8!important;
}
body.dark-mode .text3{
  color: #fff!important;
}

body.dark-mode .text {
  color: white!important;
  &::placeholder {
    color: white;
  }
}

.bridge-popup { 
  color: rgb(123, 123, 123);
}


body.dark-mode .ftmode{
  background: #011d31;
}

body.dark-mode .bg-icon-darkmode {
  background: #173658;
}

body.dark-mode .btnout{
  background: #043461;
  color: #fff;
  box-shadow: unset;
}
body .group-dark .mon-sun{
  display: none!important;
}
body .group-dark .moon-dark{
  display: block;
}
body.dark-mode .group-dark .mon-sun{
  display: block!important;
  color: #fff;
}

body.dark-mode .setmode i{
  color: #fff;
}
body.dark-mode .group-dark .mon-sun i{
  color: #fff;
}
body.dark-mode .group-dark .moon-dark{
  display: none;
}

body.dark-mode  .mode-tab .nav-link{
  color: #888;
}

body.dark-mode .token-item-search {
    border: 6px solid rgb(4, 27, 45);
    background-color: rgb(10, 46, 75);
    box-shadow: none;
}


body.dark-mode .modetoken{
  background: rgb(13 35 56);
}
body.dark-mode .modeout{
  background: #0f2337;
  color: #fff;
  border: solid 1px #0272f0;
}
body.dark-mode .link-mode.active{
    color: #fff;
}
body.dark-mode .sub-trade .lhSWqe.active{
  color: rgb(0, 0, 0);
}

body.dark-mode .mode-tab{
  background: rgb(0 21 37);
  box-shadow: unset;
  color: #fff;
}

body.dark-mode .table-option-dark {
  background: rgb(0 21 37);
}

body .swap-tab{
  max-width: 410px;
  width: 100%;
  margin: auto;
  background: #fff;
  border: 1px solid transparent;
  z-index: 2;
  border-radius: 22px;
  // padding: 1rem;
  ul {
    padding-left: 0;
  }
  @media (max-width: 1280px) {
    max-width: 390px;
  }
  @media (max-width: 576px){
    // padding: 1.5rem;
  }
}
body.dark-mode .swap-tab{
  border: 2px solid #09385f;
  background: #001426;
  @media (max-width: 576px) {
    background: #011c35;
  }
}
.soft-ui{
    border-radius: 15px;
    background-color:#fff;
    box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5);
  }

  body.dark-mode .soft-ui{

    background-color: transparent;
    box-shadow: none;
    border: 1px solid #103a66;
    transform: translate(-1px,-1px);
  }
//REFERRAL_REWARD
.refer-wrapper{
    background: #fff;
  }
  body.dark-mode .refer-wrapper{
    background-image: url("../images/dark-mode/refer-bg.png");
    /* background-attachment: fixed; */
    background-size: cover;
    background-position: center;
  }

  .soft-ui-refer{
    border-radius: 15px;
    background:#fff;
    box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5);
  }

  body.dark-mode .soft-ui-refer{

    background: linear-gradient(30deg,#0090ff,#032d47);
    /* background: linear-gradient(-130deg, #2445f2, #77f258); */
    box-shadow: none;
  }

.gradient-light{
  background-color: #ecf1f3!important;//
  :hover{
    ::after{
      background-color: #f7f8ff;
    }
  }
}

body.dark-mode .gradient-light{
    background-color: #0a2e4b !important;//04223c
    border: 2px solid #102c46 !important;//102c46
  }

.gradient-light::after {
  /* background-image: linear-gradient(39deg, #00ff00 2%, #00f221 10%, #00d378 28%, #00a5f7 52%, #00ffeb 98%); */
  background-color: #edeef2;
  content: "";
  position: absolute;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  border-radius: 18px;
  @media(max-width: 576px) { 
    border-radius: 16.5px;
  }

}

body.dark-mode .md-gradient-light {
  background: none!important;
  border-color: none!important;
}

.md-gradient-light::after {
  background-image: linear-gradient(39deg, #00ff00 2%, #00f221 10%, #00d378 28%, #00a5f7 52%, #00ffeb 98%);
  content: "";
  position: absolute;
  left: -2px;
  top: -2px;
  width: 100.7%;
  height: 100.7%;
  z-index: -1;
  border-radius: 23px;
  @media(max-width: 576px) {
    width: 101.1%;
    height: 100.7%;
  }
}

body.dark-mode .md-dark-mode-bg {
  background: none;
}

body.dark-mode .md-gradient-light::after {
  content: none;
}

.gradient-light-nav-items::after {
  background-image: linear-gradient(39deg, #00ff00 2%, #00f221 10%, #00d378 28%, #00a5f7 52%, #00ffeb 98%);
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  z-index: -1;
  border-radius: 11px;
}

body.dark-mode .gradient-light-nav-items::after {
  content: none;
}

.gradient-light-nav-items-child::after {
  background-image: linear-gradient(39deg, #00ff00 2%, #00f221 10%, #00d378 28%, #00a5f7 52%, #00ffeb 98%);
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  z-index: -1;
  border-radius: 10px;

}

body.dark-mode .gradient-light-nav-items-child::after {
  content: none;
}

body.dark-mode .gradient-light::after {
  content: none;
}

body.dark-mode .mode-roup{
  border: 1px solid rgb(26 54 88);
  background-color: rgb(2 26 45);
  color: #fff;
}
body.dark-mode .mode-roup p{
  color: #fff;
}
body.dark-mode .mode-tab::after{
  background: linear-gradient(
    45deg
    ,rgba(70,94,112,1) 0%,rgb(0, 100, 234) 50%,rgba(70,94,112,1) 100%)!important;}

body.dark-mode .bt-menu svg{
  fill:#fff;
}
body.dark-mode .drep-mode{
  color: #fff;
}
body.dark-mode .thum-fix{
  opacity: 0.3 !important;
}

.menu-fix{
  background: #ffffff85;
  box-shadow: 1px 2px 4px #00000020;
  position: relative;
  z-index: -1;
  /* backdrop-filter: blur(1px); */
}
.menu-fix::after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px);
  z-index: -1;
}
body.dark-mode .menu-fix{
  transition: all ease-in-out .3s;
  background: linear-gradient(to bottom,#00142585 55%,#00192e85);
    box-shadow: unset;
}

body.dark-mode .bg-darkmode {
  background-color: #041b2d;
  color: white!important;
}

body.dark-mode .bg-darkmode-2 {
  background-color: #004078;
}

body.dark-mode .bg-darkmode-3 {
  background-color: rgb(2 26 45);
}

body .dark-mode-item {
  display: none;
}
body .dark-mode-light {
  display: block;
}
body.dark-mode .light-mode-item {
  display: none;
}
body.dark-mode .dark-mode-item{
  display: block;
}

body.dark-mode .input-dark {
  background-color: #02192c;
  color: white;
  outline: none;
  &::placeholder {
    color: #ffffff66;
  }
}

body.dark-mode .blur-text {
  color: white;
  opacity: 0.38;
}

body.dark-mode .btn_mode:focus{
  border: 1px solid rgb(26 117 253)!important;
  outline:none!important;
}
body.dark-mode .btn_mode:hover{
  border: 1px solid rgb(26 117 253)!important;
}
body.dark-mode .mode_line{
  border: 1px solid #0168ff;
  background-color: #02192c;
}
body.dark-mode .mode_line input{
  background-color: transparent!important;
  color: #fff!important;
  ::placeholder{
    color: #fff!important;
  }
}
body.dark-mode .mode_line button{
  background:#001525;
  color:#fff;
}
.network-modal{
  background: #fff;
  background-image: linear-gradient(to right,#ffffff 0%,#ffffff 15%,#ffffff 85%,#ffffff 100%);
  border: solid 2px transparent;
}

body.dark-mode .network-modal{
  background-image: linear-gradient(to right, rgb(2, 10, 26) 0%, rgb(0, 40, 75) 50%, rgb(2, 10, 26) 100%);
  border: solid 2px #082249;
}

#swap-button {
  :disabled {
    background: #e0f7ff!important;
  }
}

body.dark-mode #swap-button {
  :disabled {
    background: #04223c!important;
  color: #fff!important;
  }
}

body.dark-mode .bg-pool-card {
  background-image: linear-gradient(to top, #01182a, #062d4c);
  border: 1px solid #0168ff;
}

@media(max-width:770px){
  body.dark-mode .mode_menu{
    background:#122d42;
    overflow-x: scroll;
    padding: 0 5px;
    margin-bottom: -4px;
  }
 
}

/* body.dark-mode .text-light{
  color: #fff!important;
} */


/* TAB BRIDGE CHILD */
.navbridge{
  margin-top: 25px;
  border-bottom: unset!important;
}
.navbridge .nav-item{
  width: 32%!important;
  box-shadow: none;
}
.navbridge .nav-item a{
  border: none;
}
.navbridge .nav-item a.active{
  background: #f3f3f3;
}
.navbridge .nav-item a.active::after{
  position: unset;
  content: none;
}

@media (max-width:576px){
  
  .navbridge .nav-item{
    width: 33%;
  }
}



/* POPUP BRIDGE */
.ReactModalPortal > div{
  background: rgba(0,0,0,.5)!important;
  backdrop-filter: blur(3px)!important;
  z-index: 99;
}


body.dark-mode .md_bridge {
  background: #02192c;
  border-radius: 22px;
  border: 1px solid #0168ff;
}



.md_bridge .nav-tabs{
  border-bottom: unset!important;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.md_bridge .nav-item{
  width: 48%;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: white;
}



body.dark-mode .md_bridge .nav-item {
  border: 1px solid #0168ff;
  background: none;
}

.active.nav-item {
  background: #e1edf5;
}

body.dark-mode .active.nav-item {
  background: #072f50;
}

.md_bridge .nav-item a{
  position: relative;
  padding: 0;
  border: none;
}

.input-bridge {
  background: white;
  outline: none;
  border-radius: 12px!important;
  ::placeholder {
    color: gray!important;
  }
  @media(max-width: 576px) {
    border-radius: 10px;
  }
}

.input-bridge-gradient::after {
  background-image: linear-gradient(39deg, #00ff00 2%, #00f221 10%, #00d378 28%, #00a5f7 52%, #00ffeb 98%);
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  z-index: -1;
  border-radius: 13px;

}

body.dark-mode .input-bridge-gradient::after {
  content: none;
}


body.dark-mode .input-bridge {
  ::placeholder {
    color: #ffffff66!important;
  }
  border: 1px solid #0168ff;
  background: none!important;
}



@media (max-width:770px){
  
  .md_bridge{
    padding: 15px;
    max-width:90vw;
    min-height: 565px;
  }
}




::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: #fff;
}
::-webkit-scrollbar-thumb {
    background: #0168ff8c !important;
    border-radius: 8px !important;
}



* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}

`;
