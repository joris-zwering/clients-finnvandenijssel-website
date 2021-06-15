import { useState, useEffect } from "react";
import {BASEURL} from "../utilities/config";

export function usePortfolioItems(portfolioId) {
    const [portfolio, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(portfolioId || '');


    useEffect(() => {
            fetch(`/cms/portfolio-items/${query}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(response => response.json())
                .then(data => {
                    setPortfolioData(data)
                    setLoading(false)
                });
    }, [])


    return {portfolio, loading};
}

