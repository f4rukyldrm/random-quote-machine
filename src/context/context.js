import { useContext, createContext, useState, useEffect } from 'react'

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(true);

    const getQuote = async () => {
        setLoading(true);

        let quote = await fetch('https://api.themotivate365.com/stoic-quote')
            .then(response => response.json())
            .catch(error => console.log(error));

        quote['quote'] = quote['quote'].replace('@', '');
        if (!quote['author']) {
            quote['author'] = 'anonymous';
        }
        setQuote(quote);

        setLoading(false);
    }

    useEffect(() => {
        getQuote();
    }, []);

    return <AppContext.Provider value={{ quote, getQuote, loading }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider };