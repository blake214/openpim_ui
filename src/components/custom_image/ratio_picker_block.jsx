import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../custom_button/custom_button";

/** crop_state
{
    crop: {
        left: [[int]],
        top: [[int]],
        width: [[int]],
        height: [[int]]
    }
    setCrop: ()=>{}
}
*/
export default function RatioPickerBlock({ imageUrl, crop_state, ratio=null }) {
    // ======= States
    const [image, setImage] = useState(null);
    const [currentBeforeMoved, setCurrentBeforeMoved] = useState(null);
    const [movedAmount, setMovedAmount] = useState(null);
    const [imageIncreasePressed, setImageIncreasePressed] = useState(false);
    const [imageDecreasePressed, setImageDecreasePressed] = useState(false);
    // ======= States

    // ======= General
	const canvas_ref = useRef(null);
	// ======= General

    // ======= Event Handlers
    const handleMouseDownDecrease = (event) => {
        setImageDecreasePressed(true);
        setImageIncreasePressed(false);
    }
    const handleMouseDownIncrease = (event) => {
        setImageIncreasePressed(true);
        setImageDecreasePressed(false);
    }
    const handleMouseUpButton = (event) => {
        setImageIncreasePressed(false);
        setImageDecreasePressed(false);
    }
    const handleMouseDown = (event) => {
        event.preventDefault()
        // We keep track of the coordinates where we did mouse down
        const current_x = event.clientX
        const current_y = event.clientY
        // Lets keep track of the current coordinates
        setCurrentBeforeMoved({
            left: crop_state.crop.left,
            top: crop_state.crop.top,
        })
        // Create mouse move handler
        const handleMouseMove = (event) => {
            event.preventDefault()
            // Here we calculate the position the mouse was clicked, to the position we are moved at. Giving us the moved amount
            const moved_x = current_x - event.clientX
            const moved_y = current_y - event.clientY
            // Set the moved amount
            setMovedAmount({
                left: moved_x,
                top: moved_y,
            })
        }
        // Add a event listener handler for moving the mouse
        document.addEventListener('mousemove', handleMouseMove);
        // Add a event listener to remove that handler for when mouse is up
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
            setCurrentBeforeMoved(null)
            setMovedAmount(null)
        });
    }
    // ======= Event Handlers
	
    // ======= Effects
	useEffect(() => {
        const imageObj = new Image();
        imageObj.onload = () => {
            setImage(imageObj);
        };
        imageObj.src = imageUrl;
        // ========== Cleanup
        return () => {
            setImage(null);
        };
	}, [imageUrl]);
	useEffect(() => {
        const canvas = canvas_ref.current;
        const ctx = canvas.getContext('2d');
        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                image,
                crop_state.crop.left,
                crop_state.crop.top,
                crop_state.crop.width,
                crop_state.crop.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
	}, [image, crop_state]);
    useEffect(() => {
        if(currentBeforeMoved && movedAmount) {
            crop_state.setCrop(prevData => ({
                ...prevData,
                left: currentBeforeMoved.left + movedAmount.left,
                top: currentBeforeMoved.top + movedAmount.top,
            }))
        }
	}, [currentBeforeMoved, movedAmount]);
    useEffect(() => {
        let interval;
        if(imageIncreasePressed) {
            interval = setInterval(() => {
                crop_state.setCrop(prevData => ({
                    ...prevData,
                    width: prevData.width - 6,
                    ...(ratio ? {height: parseInt((prevData.width - 6)/ratio)} : {height: prevData.height - 6})
                }))
            }, 50); // Increase the counter every second (we need this else doesnt work)
        } else if(imageDecreasePressed) {
            interval = setInterval(() => {
                crop_state.setCrop(prevData => ({
                    ...prevData,
                    width: prevData.width + 6,
                    ...(ratio ? {height: parseInt((prevData.width + 6)/ratio)} : {height: prevData.height + 6})
                }))
            }, 50);
        } else {
            clearInterval(interval);
        }
        // ========== Cleanup
        return () => {
            clearInterval(interval);
        };
	}, [imageIncreasePressed, imageDecreasePressed]);
    // ======= Effects
    
	return (
        <div>
            <div
                className={styles.checkered_background}
                onMouseDown={handleMouseDown}
            >
                <canvas
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'grab',
                    }}
                    ref={canvas_ref}
                    width={crop_state.crop.width}
                    height={crop_state.crop.height}
                />
            </div>
            <br/>
            <div className="flex">
                <div className={`align_right`}>
                    <CustomButton
                        onMouseDown={handleMouseDownDecrease}
                        onMouseUp={handleMouseUpButton}
                        onMouseLeave={handleMouseUpButton} // Ensure mouse up event triggers if mouse leaves button while down
                    >Decrease Size</CustomButton>
                </div>
                <div className={`align_left`}>
                    <CustomButton
                        onMouseDown={handleMouseDownIncrease}
                        onMouseUp={handleMouseUpButton}
                        onMouseLeave={handleMouseUpButton} // Ensure mouse up event triggers if mouse leaves button while down
                    >Increase Size</CustomButton>
                </div>
            </div>
        </div>
	);
}
