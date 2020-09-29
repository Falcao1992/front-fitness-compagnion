export const pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw",
        scale: 0.6
    },
    in: {
        opacity: 1,
        x: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        x: "100vw",
        scale: 0.6
    }
}

export const pageTransition = {
    type: "tween",
    case: "easeIn",
    duration: 1
    //type: "spring",
    //stiffness: 70
}


export const pageStyle = {
    position: "absolute"
}
