import styles from "./style.module.css";
import { mapValueRange } from "@/lib/helpers";
import { useEffect, useRef, useState } from "react";

/** coordinate_state
{
	coordinate: {
		x_axis: [[int]],
		y_axis: [[int]]
	}
	setCoordinate: setCoordinate()
}
*/
export default function CoordinatePickerBlock({ coordinate_state, imageUrl }) {
	// ======= States
    const [image, setImage] = useState(null);
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0
	});
	const [coordinatesRelative, setCoordinatesRelative] = useState({
		x_axis: 0,
		y_axis: 0
	});
    // ======= States

    // ======= General
	const canvas_ref = useRef(null);
	// ======= General

	// ======= Handlers
    const handleClick = (event) => {
		event.preventDefault();
		const containerRect = canvas_ref.current.getBoundingClientRect();
		const containerWidth = containerRect.width;
		const containerHeight = containerRect.height;
		const offsetX = event.clientX - containerRect.left;
		const offsetY = event.clientY - containerRect.top;
		const offsetXMapped = parseInt(mapValueRange(offsetX,0, containerWidth, 0, dimensions.width))
		const offsetYMapped = parseInt(mapValueRange(offsetY,0, containerHeight, 0, dimensions.height))
		// Update the coordinates sate
		coordinate_state.setCoordinate({
			x_axis: offsetXMapped,
			y_axis: offsetYMapped
		})
		// Update the point
		setCoordinatesRelative({
			x_axis: offsetX,
			y_axis: offsetY
		})
	};
    // ======= Handlers

	// ======= Effects
	useEffect(() => {
		// Lets create a observer
		const observer = new ResizeObserver((entries) => {
			if (entries && entries.length > 0) {
				const { width, height } = entries[0].contentRect;
				// Lets get the current coordinates and map it to the new dim
				const offsetXMapped = mapValueRange(coordinate_state.coordinate.x_axis,0, dimensions.width, 0, width)
				const offsetYMapped = mapValueRange(coordinate_state.coordinate.y_axis,0, dimensions.height, 0, height)
				// Ge the dims
				setCoordinatesRelative({
					x_axis: offsetXMapped,
					y_axis: offsetYMapped
				})
			}
		});
		// Apply the observer
		observer.observe(canvas_ref.current);
		// ========== Cleanup
		return () => observer.disconnect();
	}, [coordinate_state]);
	useEffect(() => {
        const imageObj = new Image();
        imageObj.onload = () => {
            setImage(imageObj);
			setDimensions({
				width: imageObj.width,
				height: imageObj.height
			})
        };
        imageObj.src = imageUrl;
        // ========== Cleanup
        return () => setImage(null);
	}, [imageUrl]);
	useEffect(() => {
		if(image) {
			const canvas = canvas_ref.current;
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(
				image,
				0,
				0,
				dimensions.width,
				dimensions.height,
				0,
				0,
				canvas.width,
				canvas.height
			);
		}
	}, [image, dimensions]);
    // ======= Effects

	return (
		<div className={styles.container_coordinate_picker}>
			<canvas
				style={{
					width: '100%',
					height: '100%'
				}}
				ref={canvas_ref}
				width={dimensions.width}
				height={dimensions.height}
				onClick={handleClick}
			/>
			<div
				className={styles.coordinate_picker_dot}
				style={{
					left: `${coordinatesRelative.x_axis}px`,
					top: `${coordinatesRelative.y_axis}px`,
				}}
			/>
		</div>
		
	);
}
