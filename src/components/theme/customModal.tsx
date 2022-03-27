import React from "react";
import styled, { css } from "styled-components";
import { animated, useTransition, useSpring } from "react-spring";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { isMobile } from "react-device-detect";
import "@reach/dialog/styles.css";
// import { transparentize } from 'polished'
import { useGesture } from "react-use-gesture";

const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
	&[data-reach-dialog-overlay] {
		z-index: 1000;
		background-color: transparent;
		overflow: hidden;

		display: flex;
		align-items: center;
		justify-content: center;

		/* background-color: ${({ theme }) => theme.modalBG}; */
	}
`;

const AnimatedDialogContent = animated(DialogContent);
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// ${({ theme }) => theme.mediaWidth.upToMedium`
// width: 65vw;
// margin: 0;
// `}
// ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
// width:  85vw;
// max-height: 80vh;

// ${mobile &&
//   css`
//     width: 90vw;
//     border-radius: 20px;
//   `}
// `}
const StyledDialogContent = styled(
    ({ minHeight, maxHeight, mobile, isOpen, isAccount, ...rest }) => (
        <AnimatedDialogContent {...rest} />
    )
).attrs({
    "aria-label": "dialog",
})`
    overflow-y: ${({ mobile }) => (mobile ? "scroll" : "hidden")};

    &[data-reach-dialog-content] {
        margin: 2rem 0 2rem 0;
        box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px,
            rgba(0, 0, 0, 0.23) -1px 7px 18px 0px;
        padding: 0px;
        width: 70vw;
        overflow-y: scroll;
        align-self: ${({ mobile }) => (mobile ? "center" : "center")};
        max-width: 760px;
        ${({ maxHeight }) =>
            maxHeight &&
            css`
                max-height: ${maxHeight}vh;
            `}
        ${({ minHeight }) =>
            minHeight &&
            css`
                min-height: ${minHeight}vh;
            `}
        display: flex;
        border-radius: 22px;
        @media (max-width: 596px) {
            width: 80vw;
        }
        @media (max-width: 564px) {
            width: 90vw;
        }
        @media (max-height: 542px) {
            height: 456px;
        }
        @media (max-width: 1023px) {
            height: 671px;
        }
        @media (max-width: 459px) {
            height: 610px;
        }
        @media (max-width: 403px) {
            height: 770px;
        }
    }
    ::-webkit-scrollbar {
        width: 0px;
        background-color: transparent !important;
    }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  minHeight?: number | false;
  maxHeight?: number;
  initialFocusRef?: React.RefObject<any>;
  isAccount: boolean | any;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  isAccount,
  children
}: ModalProps) {
    const fadeTransition = useTransition(isOpen, null, {
        config: { duration: 200 },
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 }
  }));
  const bind = useGesture({
    onDrag: state => {
      set({
        y: state.down ? state.movement[1] : 0
      });
      if (
        state.movement[1] > 300 ||
        (state.velocity > 3 && state.direction[1] > 0)
      ) {
        onDismiss();
      }
    }
  });

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: {
                        transform: y.interpolate(
                          y => `translateY(${y > 0 ? y : 0}px)`
                        )
                      }
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
                isAccount={isAccount}
                className="bg-darkmode custom-modal-wallet"
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  );
}
