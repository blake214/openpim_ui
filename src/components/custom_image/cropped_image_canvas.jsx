import { useEffect, useRef, useState } from 'react';

export default function CroppedImageCanvas({ imageUrl, cropping }) {
    // ======= States
    const [image, setImage] = useState(null);
    // ======= States

    // ======= General
	const canvas_ref = useRef(null);
	// ======= General
	
    // ======= Effects
	useEffect(() => {
        const imageObj = new Image();
        imageObj.onload = () => {
            setImage(imageObj);
        };
        imageObj.src = imageUrl;
        // ========== Cleanup
        return () => setImage(null);
	}, [imageUrl]);
	useEffect(() => {
        const canvas = canvas_ref.current;
        const ctx = canvas.getContext('2d');
        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                image,
                cropping.left,
                cropping.top,
                cropping.width,
                cropping.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
	}, [image]);
    // ======= Effects

	return (
		<canvas
            style={{
                width: '100%',
                height: '100%'
            }}
			ref={canvas_ref}
			width={cropping.width}
			height={cropping.height}
		/>
	);
}