"use client";

import "@splidejs/react-splide/css";
import {
    Splide,
    SplideSlide,
    SplideTrack,
} from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Grid } from "@splidejs/splide-extension-grid";
import React, { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SplideSliderProps<T = unknown> {
    children: ReactElement;
    data: T[];
    options?: Options;
    ScrollingAuto?: boolean;
    isGrid?: boolean;
    scrollAndGrid?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

const SplideSlider = <T,>({
    children,
    data,
    options,
    ScrollingAuto = false,
    isGrid = false,
    scrollAndGrid = false,
}: SplideSliderProps<T>) => {
    const extensions =
        (scrollAndGrid && { AutoScroll, Grid }) ||
        (ScrollingAuto && { AutoScroll }) ||
        (isGrid && { Grid }) ||
        undefined;

    return (
        <Splide
            options={options}
            hasTrack={false}
            aria-labelledby="autoplay-example-heading"
            extensions={extensions}
        >
            <SplideTrack>
                {data?.map((item, index) => {
                    const childrenWithProps = React.Children.map(
                        children,
                        (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(
                                    child as ReactElement<Record<string, unknown>>,
                                    { ...(item as Record<string, unknown>) }
                                );
                            }
                            return child;
                        }
                    );

                    return (
                        <SplideSlide aria-roledescription="none" key={index}>
                            {childrenWithProps}
                        </SplideSlide>
                    );
                })}
            </SplideTrack>
        </Splide>
    );
};

export default SplideSlider;
