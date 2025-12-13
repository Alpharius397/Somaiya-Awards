import React from "react";

export function DefaultError() {
    return (
        <div className="w-full h-64 flex flex-col justify-center items-center bg-red-50 border border-red-300 rounded-2xl shadow-sm">
            <h2 className="text-red-600 text-xl font-semibold mb-2">
                Failed to load data
            </h2>
            <p className="text-gray-700 text-sm text-center px-4">
                An error occurred while loading the data. Please refresh the
                page or check your connection.
            </p>
        </div>
    );
}

export function EmptyData() {
    return (
        <div className="w-full h-64 flex flex-col justify-center items-center bg-lightblue-50 border border-cyan-300 rounded-2xl shadow-sm">
            <h2 className="text-green-600 text-xl font-semibold mb-2">
                No Data Available
            </h2>
        </div>
    );
}

export default class ErrorBoundary extends React.Component {
    declare state: { hasError: boolean };

    declare props: {
        children: React.JSX.Element;
        fallback: React.ReactNode;
    };

    constructor(props: {
        fallback: React.ReactNode;
        children: React.ReactNode;
    }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.warn("ErrorBoundary caught an error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
