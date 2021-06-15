import { useState, useEffect } from "react";
import {BASEURL} from "../utilities/config";

export function useAbout() {
    const [about, setAbout] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            fetch(`/about-section`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(response => response.json())
                .then(data => {
                    setAbout(data)
                    setLoading(false)
                });
    }, [])


    return {about, loading};
}