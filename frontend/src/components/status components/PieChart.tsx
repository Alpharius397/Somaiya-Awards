import React from "react";
import {
    Legend,
    Pie,
    PieChart,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import ErrorBoundary, {
    DefaultError,
    EmptyData,
} from "@/components/utils/ErrorBoundary";

function Piechart({ data = [] }: { data: number[] }) {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

    return (
        <ResponsiveContainer width={300} height={350}>
            {!(data && data.length > 0) ? (
                <EmptyData />
            ) : (
                <PieChart width={300} height={350}>
                    <Pie
                        data={data}
                        dataKey="formsFilled"
                        nameKey="group"
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            )}
        </ResponsiveContainer>
    );
}

export default function ActualPie(props: { data: number[] }) {
    return (
        <ErrorBoundary fallback={<DefaultError />}>
            <Piechart {...props} />
        </ErrorBoundary>
    );
}
