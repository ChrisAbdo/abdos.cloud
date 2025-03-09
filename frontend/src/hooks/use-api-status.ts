'use client';

import useSWR from 'swr';

// Define the API status interface
export interface ApiStatus {
    version: string;
    env: string;
}

// Define the fetcher function
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('API request failed');
    }
    return res.json();
};

export function useApiStatus() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.abdos.cloud';
    const { data, error, isLoading, mutate } = useSWR<ApiStatus>(
        `${apiUrl}/api/version`, 
        fetcher, 
        {
            refreshInterval: 30000, // Poll every 30 seconds
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    return {
        data,
        isLoading,
        isError: !!error,
        isOnline: !!data && !error,
        mutate, // Expose the mutate function to manually revalidate
    };
} 