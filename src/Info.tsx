import { useEffect, useState } from 'react';
import './Info.css';

interface AboutData {
    version: string;
    backendRevision: string;
    terraformRevision: string;
    timestamp: string;
    environment: string;
    databaseMessage: string;
}

function Info() {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/about');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(`Failed to fetch about data: ${errorMessage}`);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString();
        } catch {
            return dateString;
        }
    };

    const uiRevision = import.meta.env.VITE_UI_REVISION || 'unknown';

    return (
        <div className="info-container">
            <section className="info-section">
                <h1>About</h1>
                <p className="subtitle">System Information</p>

                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading system information...</p>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <svg className="icon-alert" role="presentation" aria-hidden="true">
                            <use href="/icons.svg#warning-icon"></use>
                        </svg>
                        <p>{error}</p>
                    </div>
                )}

                {data && (
                    <div className="info-grid">
                        <div className="info-card">
                            <h2>Version</h2>
                            <p className="info-value">{data.version}</p>
                        </div>

                        <div className="info-card">
                            <h2>Environment</h2>
                            <p className="info-value">{data.environment}</p>
                        </div>

                        <div className="info-card">
                            <h2>UI Revision</h2>
                            <p className="info-value code">{uiRevision}</p>
                        </div>

                        <div className="info-card">
                            <h2>Backend Revision</h2>
                            <p className="info-value code">{data.backendRevision}</p>
                        </div>

                        <div className="info-card">
                            <h2>Terraform Revision</h2>
                            <p className="info-value code">{data.terraformRevision}</p>
                        </div>

                        <div className="info-card full-width">
                            <h2>Database Message</h2>
                            <p className="info-value">{data.databaseMessage}</p>
                        </div>

                        <div className="info-card full-width">
                            <h2>Last Updated</h2>
                            <p className="info-value">{formatDate(data.timestamp)}</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Info;
