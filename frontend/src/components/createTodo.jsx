// /* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useState } from "react";

async function sendData(title, description, onSuccess) {
    const response = await fetch("https://to-do-app-server-kappa.vercel.app/todos", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-type": "application/json"
        }
    });

    const data = await response.json();
    console.log("Data Added !");

    // Call the onSuccess callback to trigger any additional actions
    onSuccess();
}

export function CreateTodo({ fetchData }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSuccess = () => {
        // Clear the input fields by updating the state
        setTitle("");
        setDescription("");
        // Fetch data or perform any other actions
        fetchData();
    };

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>TO DO APPLICATION </h1>

            <div style={{
                backgroundColor: "#3498db",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                maxWidth: "400px",
                marginBottom: "20px",
            }} className="main-container">
                <input
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                    }}
                    type="text"
                    placeholder="Enter title here"
                    className="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                    }}
                    type="text"
                    placeholder="Enter description here"
                    className="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    onClick={() => sendData(title, description, handleSuccess)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        color: "#fff",
                        backgroundColor: "#2ecc71",
                        cursor: "pointer",
                        outline: "none",
                    }}
                    className="add-todo"
                >
                    Add Todo
                </button>
            </div>
        </>
    );
}

