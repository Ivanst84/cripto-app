import { useEffect, useMemo, useState } from "react";
import { useCryptoStore } from "../store";

export default function CriptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result);
    const hasResult = useMemo(() => Object.keys(result).length > 0, [result]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Reinicia isLoaded a false cuando result.IMAGEURL cambia (nueva imagen)
        setIsLoaded(false);
      }, [result.IMAGEURL]);
    const handleImageLoad = () => {
        setIsLoaded(true);
      };
    return (
        <div className="result-wrapper">
            {hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        {/* Utiliza una función de renderizado condicional para mostrar la imagen */}
                        {result.IMAGEURL && (
                            <img
                                src={`https://cryptocompare.com/${result.IMAGEURL}`}
                                alt="Crypto Image"
                                className={isLoaded ? 'crypto-image fadeIn' : 'crypto-image'}
                                onLoad={handleImageLoad} //
                            />
                            
                        )}
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>El precio más alto del día: <span>{result.HIGHDAY}</span></p>
                            <p>El precio más bajo del día: <span>{result.LOWDAY}</span></p>
                            <p>Cambio en las últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
