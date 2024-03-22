import styles from "./style.module.css";
import { mapValueRange } from "@/lib/helpers";
import { useEffect, useRef, useState } from "react";

/** captions
[
    {
        "caption_id" : [[string_id]],
        "caption_image_id" : [[string_id]],
        "content" : [[string_markdown_0_1000]],
        "co_ordinates" : {
            "x_axis" : [[integer_any_value_possitive]],
            "y_axis" : [[integer_any_value_possitive]]
        }
    }
]
*/
/** cropping
{
    "left" : [[int]],
    "top" : [[int]],
    "width" : [[int]],
    "height" : [[int]]
}
*/
export default function CaptionVisualiseBlock({ children, captions, cropping }) {
    // ======= States
    const [captionsDisplay, setCaptionsDisplay] = useState([]);
    const [activeCaption, setActiveCaption] = useState(null);
    // ======= States

    // ======= General
	const component_ref = useRef(null);
    const container_primary_ref = useRef(null);
	// ======= General

	// ======= Handlers
    const handleDotClick = (event) => {
        const {id} = event.target
		setActiveCaption(id);
	};
    // ======= Handlers

    // ======= Effects
    useEffect(() => {
        // Check it a tool tip had been clicked, note index 0 is possible, so check against null
        if(activeCaption != null) {
            // Create and add a event listener to check if user clicks outside the container
            const handleClickOutside = (event) => {
                // Check if the clicked element is not one of component_ref, close all toggles
                if (!component_ref.current.contains(event.target)) {
                    setActiveCaption(null);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            // ========== Cleanup
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
	}, [activeCaption]);
    useEffect(() => {
        // Lets create a observer for when the canvas size changes
        const observer = new ResizeObserver((entries) => {
            if (entries && entries.length > 0) {
                const { width, height } = entries[0].contentRect;
                // Calculate height maintaining aspect ratio
                const aspectRatio = cropping.width / cropping.height;
                const scaled_height = Math.round(width / aspectRatio);
                // Here we normalise the coordinates
                setCaptionsDisplay(captions.map(element => {
                    // Hide captions out of the cropped range
                    if(element.co_ordinates.x_axis < cropping.left || element.co_ordinates.x_axis > cropping.left + cropping.width) return
                    if(element.co_ordinates.y_axis < cropping.top || element.co_ordinates.y_axis > cropping.top + cropping.height) return
                    // Get the coordinates relative to the cropped range
                    const relative_pos_x = element.co_ordinates.x_axis - cropping.left
                    const relative_pos_y = element.co_ordinates.y_axis - cropping.top
                    // Scale the coordinates to be ralated to the canvas size
                    const relative_scaled_pos_x = mapValueRange(relative_pos_x, 0, cropping.width, 0, width)
                    const relative_scaled_pos_y = mapValueRange(relative_pos_y, 0, cropping.height, 0, scaled_height)
                    // Returned normalised points
                    return {
                        ...element,
                        co_ordinates: {
                            x_axis: relative_scaled_pos_x,
                            y_axis: relative_scaled_pos_y
                        }
                    }
                }).filter(element => element !== undefined))
            }
        });
        // Apply the observer
        observer.observe(container_primary_ref.current);
        // ========== Cleanup
        return () => observer.disconnect()
	}, [cropping]);
    // ======= Effects

	return (
		<div ref={container_primary_ref}>
            <div
                style={{
                    position: 'relative',
                    width: `100%`,
                }}
                className={styles.container_content}
            >
                {captionsDisplay.map((element, index) => (
                    <div
                        key={index}
                        id={index}
                        className={styles.coordinate_picker_dot}
                        style={{
                            left: `${element.co_ordinates.x_axis}px`,
                            top: `${element.co_ordinates.y_axis}px`,
                        }}
                        onClick={handleDotClick}
                    />
                ))}
                {activeCaption !== null && (
                    <div
                        className={styles.tooltip_content}
                        ref={component_ref}
                        style={{
                            left: `${captionsDisplay[activeCaption].co_ordinates.x_axis}px`,
                            top: `${captionsDisplay[activeCaption].co_ordinates.y_axis}px`,
                        }}
                    >
                        <div className={styles.tooltip_content_arrow}/>
                        <div className={styles.tooltip_content_content}>
                            {captionsDisplay[activeCaption].content}
                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
	);
}