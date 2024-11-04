import { useCallback, useState } from "react";


/**
 * Custom hook to detect if an element is currently visible on the screen using the Intersection Observer API.
 * @param {Object} options - Options for the Intersection Observer.
 * @param {Element|null} options.root - The root element for intersection (default is `null` which means viewport).
 * @param {string} options.rootMargin - Margin around the root (default is `"0px"`).
 * @param {number} options.threshold - Intersection threshold, between 0 and 1 (default is `0`).
 * @returns {Object} Object containing `measureRef`, `isIntersecting`, and `observer`.
 * @returns {function} measureRef - A callback ref function to attach to the element to be observed.
 * @returns {boolean} isIntersecting - Indicates if the element is visible in the viewport.
 * @returns {IntersectionObserver | null} observer - The IntersectionObserver instance.
 */

const useOnScreen = ({
                         root = null,
                         rootMargin = "0px",
                         threshold = 0
                     } = {}) => {

    /** @type {boolean} State indicating if the observed element is visible */
    const [observer, setObserver] = useState<IntersectionObserver | null>(null);

    /** @type {IntersectionObserver | null} Intersection Observer instance */
    const [isIntersecting, setIntersecting] = useState(false);


    /**
     * A callback function to observe the target element.
     * @param {HTMLElement | null} node - The target DOM element to observe.
     */
    const measureRef = useCallback(
        (node) => {
            if (node) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        setIntersecting(entry.isIntersecting);
                    },
                    { root, rootMargin, threshold }
                );

                observer.observe(node);
                setObserver(observer);
            }
        },
        [root, rootMargin, threshold]
    );

    return { measureRef, isIntersecting, observer };
};

export default useOnScreen;
