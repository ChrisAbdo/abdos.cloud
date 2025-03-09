'use client';

import { useState, useEffect } from 'react';

interface ApiStatus {
    version: string;
    env: string;
}

export default function ApiStatus() {
    const [status, setStatus] = useState<ApiStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApiStatus = async () => {
            try {
                setLoading(true);
                // In production, this will use the actual domain
                // In development, you might need to adjust this URL
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.abdos.cloud';
                const response = await fetch(`${apiUrl}/api/version`);

                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`);
                }

                const data = await response.json();
                setStatus(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching API status:', err);
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchApiStatus();
    }, []);

    return (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">API Status</h3>

            {loading && (
                <div className="text-gray-500">Loading API status...</div>
            )}

            {error && (
                <div className="text-red-500">
                    <p>Error connecting to API:</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {status && !loading && !error && (
                <div>
                    <p className="mb-1">
                        <span className="font-medium">Version:</span> {status.version}
                    </p>
                    <p className="mb-1">
                        <span className="font-medium">Environment:</span> {status.env}
                    </p>
                    <p className="text-green-500 font-medium">API is online ✓</p>
                </div>
            )}
        </div>
    );
} 