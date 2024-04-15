import React, { useEffect, useState } from 'react';

export function useQueryAction<T>(action: () => Promise<T>) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<{ message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (
            async function () {
                try {
                    setIsLoading(true);
                    const data = await action();
                    setData(data);
                } catch (error) {
                    setError({ message: error as string });
                } finally {
                    setIsLoading(false);
                }
            }
        )();
    }, [action])

    return { data, error, isLoading };
}