import { useEffect, useRef } from "react";

const currentFrame = (index: number) => {
    return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
}

const ScrollPhotos = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const frameCount = 148;

    useEffect(() => {
        const preloadImages = () => {
            for (let i = 1; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
            }
        }
        preloadImages();
    }, [])

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = 1158;
        canvas.height = 770;
        const image = new Image()
        image.src = currentFrame(1);
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

        const onScrollHandler = () => {
            if (!container.current) return
            const scrollTop = document.documentElement.scrollTop;
            const containerTop = container.current.getBoundingClientRect().top;
            const scrollTopContainer = scrollTop - containerTop;
            const maxScrollTop = container.current.scrollHeight;
            const scrollFraction = scrollTopContainer / maxScrollTop;
            let frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollFraction * frameCount)
            )
            if (frameIndex === 0) frameIndex = 1;
            requestAnimationFrame(() => {
                image.src = currentFrame(frameIndex)
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            })
        }

        window.addEventListener('scroll', onScrollHandler);

        return () => {
            window.removeEventListener('scroll', onScrollHandler)
        }
    }, [canvasRef.current])

    return (
        <div className="photos" ref={container}>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default ScrollPhotos