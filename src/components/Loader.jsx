import React from "react"

function Loader() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex justify-center items-center h-screen"
        >
            <span style={{ display: "inherit" }}>
                <span
                    style={{
                        display: "inline-block",
                        backgroundColor: "rgb(52, 152, 219)",
                        width: "16px",
                        height: "16px",
                        margin: "2px",
                        borderRadius: "100%",
                        animation:
                            "react-spinners-BeatLoader-beat 0.7s 0s infinite linear",
                        animationFillMode: "both",
                    }}
                />
                <span
                    style={{
                        display: "inline-block",
                        backgroundColor: "rgb(52, 152, 219)",
                        width: "16px",
                        height: "16px",
                        margin: "2px",
                        borderRadius: "100%",
                        animation:
                            "react-spinners-BeatLoader-beat 0.7s 0.35s infinite linear",
                        animationFillMode: "both",
                    }}
                />
                <span
                    style={{
                        display: "inline-block",
                        backgroundColor: "rgb(52, 152, 219)",
                        width: "16px",
                        height: "16px",
                        margin: "2px",
                        borderRadius: "100%",
                        animation:
                            "react-spinners-BeatLoader-beat 0.7s 0s infinite linear",
                        animationFillMode: "both",
                    }}
                />
            </span>
        </div>
    )
}

export default Loader
