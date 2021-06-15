import { useState, useEffect } from "react";
import {BASEURL} from "../utilities/config";

export function useShowcase(showcaseId) {
    const [showcase, setShowcaseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(showcaseId || '');


    useEffect(() => {
            fetch(`/showcase-items/${query}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(response => response.json())
                .then(data => {
                    setShowcaseData(data)
                    setLoading(false)
                });
    }, [])


    return {showcase, loading};
}

