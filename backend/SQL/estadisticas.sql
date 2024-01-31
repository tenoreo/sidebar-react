-- obtener la cantidad de ventas por mes
CREATE OR REPLACE FUNCTION perMonth()
    RETURNS TABLE(mesNumero NUMERIC, mes TEXT, total DOUBLE PRECISION, cantidad BIGINT)
    LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT EXTRACT('MONTH' FROM t.fecha) AS mesNumero,
        TO_CHAR(t.fecha, 'Month') AS Mes,
        SUM(t.precioTotal) AS total,
        COUNT(t.idTrans) AS cantidad
    FROM transacciones t
    WHERE EXTRACT('YEAR' FROM CURRENT_DATE) = date_part('year', CURRENT_DATE)
    GROUP BY mesNumero, Mes
    ORDER BY mesNumero, Mes ASC;
END;
$$;

-- obtener la cantidad de ventas por ano
CREATE OR REPLACE FUNCTION perYear()
    RETURNS TABLE(ano INT, total DOUBLE PRECISION, cantidad BIGINT)
    LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY SELECT 
                EXTRACT('Year' FROM CURRENT_DATE)::INT AS ano,
                SUM(t.precioTotal) AS total,
                COUNT(t.idTrans) AS cantidad	   
            FROM transacciones t
            WHERE EXTRACT('Year' FROM CURRENT_DATE) = date_part('year', CURRENT_DATE)
            GROUP BY ano
            ORDER BY ano ASC;
    END;
$$;
-- obtener la cantidad de ventas por dia
CREATE OR REPLACE FUNCTION perDay()
	RETURNS TABLE(total DOUBLE PRECISION, cantidad BIGINT)
	LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY SELECT SUM(t.precioTotal) AS total,
                count(t.idTrans) AS cantidad	
        FROM transacciones t
        WHERE fecha::date = CURRENT_DATE;
    END;
$$