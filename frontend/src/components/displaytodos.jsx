/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

async function handleclick(todo, fetchData) {
    const id = todo._id;
    const response = await fetch("http://localhost:3000/complete", {
        method: "PUT",
        body: JSON.stringify({
            id: id
        }),
        headers: {
            "Content-type": "application/json"
        }
    });

    const res = await response.json();
    console.log(res.msg);
    fetchData();
}

async function handleDelete(todoId, fetchData) {
    const response = await fetch(`http://localhost:3000/delete`, {
        method: "DELETE",
        body: JSON.stringify({
            id: todoId
        }),
        headers: {
            "Content-type": "application/json"
        }
    });

    const res = await response.json();
    console.log(res.msg);
    fetchData();
}

export function DisplayTodos({ todos, fetchData }) {
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
        }}>
            {todos.map(function (todo) {
                return (
                    <div
                        key={todo._id}
                        style={{
                            backgroundColor: todo.completed ? "#2ecc71" : "red",
                            height: "200px",
                            borderRadius: "10px",
                            width: "350px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <h1>{todo.title}</h1>
                        <h2>{todo.description}</h2>
                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                            <button
                                onClick={() => handleclick(todo, fetchData)}
                                style={{
                                    flex: "1",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "none",
                                    color: "#fff",
                                    backgroundColor: todo.completed ? "#2ecc71" : "#3498db",
                                    cursor: "pointer",
                                    outline: "none",
                                }}
                            >
                                {todo.completed ? "Completed" : "Mark as Complete"}
                            </button>
                            {todo.completed && (
                                <button
                                    onClick={() => handleDelete(todo._id, fetchData)}
                                    style={{
                                        flex: "1",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "none",
                                        color: "#fff",
                                        backgroundColor: "#e74c3c",
                                        cursor: "pointer",
                                        outline: "none",
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
