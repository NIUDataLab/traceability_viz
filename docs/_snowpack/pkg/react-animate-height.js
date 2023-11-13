import { r as react } from './common/index-bd03b9e6.js';
import './common/_commonjsHelpers-8c19dec8.js';

// ------------------ Helpers
function isNumber(n) {
    const number = parseFloat(n);
    return !isNaN(number) && isFinite(number);
}
function isPercentage(height) {
    // Percentage height
    return (typeof height === 'string' &&
        height[height.length - 1] === '%' &&
        isNumber(height.substring(0, height.length - 1)));
}
function hideContent(element, height) {
    // Check for element?.style is added cause this would fail in tests (react-test-renderer)
    // Read more here: https://github.com/Stanko/react-animate-height/issues/17
    if (height === 0 && (element === null || element === void 0 ? void 0 : element.style)) {
        element.style.display = 'none';
    }
}
function showContent(element, height) {
    // Check for element?.style is added cause this would fail in tests (react-test-renderer)
    // Read more here: https://github.com/Stanko/react-animate-height/issues/17
    if (height === 0 && (element === null || element === void 0 ? void 0 : element.style)) {
        element.style.display = '';
    }
}
const ANIMATION_STATE_CLASSES = {
    animating: 'rah-animating',
    animatingUp: 'rah-animating--up',
    animatingDown: 'rah-animating--down',
    animatingToHeightZero: 'rah-animating--to-height-zero',
    animatingToHeightAuto: 'rah-animating--to-height-auto',
    animatingToHeightSpecific: 'rah-animating--to-height-specific',
    static: 'rah-static',
    staticHeightZero: 'rah-static--height-zero',
    staticHeightAuto: 'rah-static--height-auto',
    staticHeightSpecific: 'rah-static--height-specific',
};
function getStaticStateClasses(animationStateClasses, height) {
    return [
        animationStateClasses.static,
        height === 0 && animationStateClasses.staticHeightZero,
        typeof height === 'number' && height > 0
            ? animationStateClasses.staticHeightSpecific
            : null,
        height === 'auto' && animationStateClasses.staticHeightAuto,
    ]
        .filter((v) => v)
        .join(' ');
}
// ------------------ Component
const propsToOmitFromDiv = [
    'animateOpacity',
    'animationStateClasses',
    'applyInlineTransitions',
    'children',
    'className',
    'contentClassName',
    'contentRef',
    'delay',
    'duration',
    'easing',
    'height',
    'onHeightAnimationEnd',
    'onHeightAnimationStart',
    'style',
];
const AnimateHeight = react.forwardRef((componentProps, ref) => {
    // const AnimateHeight = forwardRef((componentProps: AnimateHeightProps, ref) => {
    // const AnimateHeight: React.FC<AnimateHeightProps> = (componentProps) => {
    const { animateOpacity = false, animationStateClasses = {}, applyInlineTransitions = true, children, className = '', contentClassName, delay: userDelay = 0, duration: userDuration = 500, easing = 'ease', height, onHeightAnimationEnd, onHeightAnimationStart, style, contentRef, } = componentProps;
    const divProps = Object.assign({}, componentProps);
    propsToOmitFromDiv.forEach((propKey) => {
        delete divProps[propKey];
    });
    // ------------------ Initialization
    const prevHeight = react.useRef(height);
    const contentElement = react.useRef(null);
    const animationClassesTimeoutID = react.useRef();
    const timeoutID = react.useRef();
    const stateClasses = react.useRef(Object.assign(Object.assign({}, ANIMATION_STATE_CLASSES), animationStateClasses));
    const isBrowser = typeof window !== 'undefined';
    const prefersReducedMotion = react.useRef(isBrowser && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion)').matches
        : false);
    const delay = prefersReducedMotion.current ? 0 : userDelay;
    const duration = prefersReducedMotion.current ? 0 : userDuration;
    let initHeight = height;
    let initOverflow = 'visible';
    if (typeof height === 'number') {
        // Reset negative height to 0
        initHeight = height < 0 ? 0 : height;
        initOverflow = 'hidden';
    }
    else if (isPercentage(initHeight)) {
        // If value is string "0%" make sure we convert it to number 0
        initHeight = height === '0%' ? 0 : height;
        initOverflow = 'hidden';
    }
    const [currentHeight, setCurrentHeight] = react.useState(initHeight);
    const [overflow, setOverflow] = react.useState(initOverflow);
    const [useTransitions, setUseTransitions] = react.useState(false);
    const [animationStateClassNames, setAnimationStateClassNames] = react.useState(getStaticStateClasses(stateClasses.current, height));
    // ------------------ Did mount
    react.useEffect(() => {
        // Hide content if height is 0 (to prevent tabbing into it)
        hideContent(contentElement.current, currentHeight);
        // This should be explicitly run only on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // ------------------ Height update
    react.useEffect(() => {
        if (height !== prevHeight.current && contentElement.current) {
            showContent(contentElement.current, prevHeight.current);
            // Cache content height
            contentElement.current.style.overflow = 'hidden';
            const contentHeight = contentElement.current.offsetHeight;
            contentElement.current.style.overflow = '';
            // set total animation time
            const totalDuration = duration + delay;
            let newHeight;
            let timeoutHeight;
            let timeoutOverflow = 'hidden';
            let timeoutUseTransitions;
            const isCurrentHeightAuto = prevHeight.current === 'auto';
            if (typeof height === 'number') {
                // Reset negative height to 0
                newHeight = height < 0 ? 0 : height;
                timeoutHeight = newHeight;
            }
            else if (isPercentage(height)) {
                // If value is string "0%" make sure we convert it to number 0
                newHeight = height === '0%' ? 0 : height;
                timeoutHeight = newHeight;
            }
            else {
                // If not, animate to content height
                // and then reset to auto
                newHeight = contentHeight; // TODO solve contentHeight = 0
                timeoutHeight = 'auto';
                timeoutOverflow = undefined;
            }
            if (isCurrentHeightAuto) {
                // This is the height to be animated to
                timeoutHeight = newHeight;
                // If previous height was 'auto'
                // set starting height explicitly to be able to use transition
                newHeight = contentHeight;
            }
            // Animation classes
            const newAnimationStateClassNames = [
                stateClasses.current.animating,
                (prevHeight.current === 'auto' || height < prevHeight.current) &&
                    stateClasses.current.animatingUp,
                (height === 'auto' || height > prevHeight.current) &&
                    stateClasses.current.animatingDown,
                timeoutHeight === 0 && stateClasses.current.animatingToHeightZero,
                timeoutHeight === 'auto' &&
                    stateClasses.current.animatingToHeightAuto,
                typeof timeoutHeight === 'number' && timeoutHeight > 0
                    ? stateClasses.current.animatingToHeightSpecific
                    : null,
            ]
                .filter((v) => v)
                .join(' ');
            // Animation classes to be put after animation is complete
            const timeoutAnimationStateClasses = getStaticStateClasses(stateClasses.current, timeoutHeight);
            // Set starting height and animating classes
            // When animating from 'auto' we first need to set fixed height
            // that change should be animated
            setCurrentHeight(newHeight);
            setOverflow('hidden');
            setUseTransitions(!isCurrentHeightAuto);
            setAnimationStateClassNames(newAnimationStateClassNames);
            // Clear timeouts
            clearTimeout(timeoutID.current);
            clearTimeout(animationClassesTimeoutID.current);
            if (isCurrentHeightAuto) {
                // When animating from 'auto' we use a short timeout to start animation
                // after setting fixed height above
                timeoutUseTransitions = true;
                // Short timeout to allow rendering of the initial animation state first
                timeoutID.current = setTimeout(() => {
                    setCurrentHeight(timeoutHeight);
                    setOverflow(timeoutOverflow);
                    setUseTransitions(timeoutUseTransitions);
                    // ANIMATION STARTS, run a callback if it exists
                    onHeightAnimationStart === null || onHeightAnimationStart === void 0 ? void 0 : onHeightAnimationStart(timeoutHeight);
                }, 50);
                // Set static classes and remove transitions when animation ends
                animationClassesTimeoutID.current = setTimeout(() => {
                    setUseTransitions(false);
                    setAnimationStateClassNames(timeoutAnimationStateClasses);
                    // ANIMATION ENDS
                    // Hide content if height is 0 (to prevent tabbing into it)
                    hideContent(contentElement.current, timeoutHeight);
                    // Run a callback if it exists
                    onHeightAnimationEnd === null || onHeightAnimationEnd === void 0 ? void 0 : onHeightAnimationEnd(timeoutHeight);
                }, totalDuration);
            }
            else {
                // ANIMATION STARTS, run a callback if it exists
                onHeightAnimationStart === null || onHeightAnimationStart === void 0 ? void 0 : onHeightAnimationStart(newHeight);
                // Set end height, classes and remove transitions when animation is complete
                timeoutID.current = setTimeout(() => {
                    setCurrentHeight(timeoutHeight);
                    setOverflow(timeoutOverflow);
                    setUseTransitions(false);
                    setAnimationStateClassNames(timeoutAnimationStateClasses);
                    // ANIMATION ENDS
                    // If height is auto, don't hide the content
                    // (case when element is empty, therefore height is 0)
                    if (height !== 'auto') {
                        // Hide content if height is 0 (to prevent tabbing into it)
                        hideContent(contentElement.current, newHeight); // TODO solve newHeight = 0
                    }
                    // Run a callback if it exists
                    onHeightAnimationEnd === null || onHeightAnimationEnd === void 0 ? void 0 : onHeightAnimationEnd(newHeight);
                }, totalDuration);
            }
        }
        prevHeight.current = height;
        return () => {
            clearTimeout(timeoutID.current);
            clearTimeout(animationClassesTimeoutID.current);
        };
        // This should be explicitly run only on height change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height]);
    // ------------------ Render
    const componentStyle = Object.assign(Object.assign({}, style), { height: currentHeight, overflow: overflow || (style === null || style === void 0 ? void 0 : style.overflow) });
    if (useTransitions && applyInlineTransitions) {
        componentStyle.transition = `height ${duration}ms ${easing} ${delay}ms`;
        // Include transition passed through styles
        if (style === null || style === void 0 ? void 0 : style.transition) {
            componentStyle.transition = `${style.transition}, ${componentStyle.transition}`;
        }
        // Add webkit vendor prefix still used by opera, blackberry...
        componentStyle.WebkitTransition = componentStyle.transition;
    }
    const contentStyle = {};
    if (animateOpacity) {
        contentStyle.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
        // Add webkit vendor prefix still used by opera, blackberry...
        contentStyle.WebkitTransition = contentStyle.transition;
        if (currentHeight === 0) {
            contentStyle.opacity = 0;
        }
    }
    // Check if user passed aria-hidden prop
    const hasAriaHiddenProp = typeof divProps['aria-hidden'] !== 'undefined';
    const ariaHidden = hasAriaHiddenProp
        ? divProps['aria-hidden']
        : height === 0;
    return (react.createElement("div", Object.assign({}, divProps, { "aria-hidden": ariaHidden, className: `${animationStateClassNames} ${className}`, style: componentStyle, ref: ref }),
        react.createElement("div", { className: contentClassName, style: contentStyle, ref: (el) => {
                contentElement.current = el;
                if (contentRef) {
                    contentRef.current = el;
                }
            } }, children)));
});

export default AnimateHeight;