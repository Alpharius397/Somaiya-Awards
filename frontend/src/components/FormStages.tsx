import React, { useMemo } from "react";

function ReturnSteps({
    value,
    handleClick,
    isSelected,
}: {
    value: number;
    handleClick: React.MouseEventHandler;
    isSelected: boolean;
}) {
    const theme = useMemo(() => {
        if (isSelected) {
            return "bg-red-500 text-white";
        } else {
            return "bg-white";
        }
    }, [isSelected]);

    return (
        <div
            onClick={handleClick}
            className={`p-3 shadow-xl stages font-Poppins font-semibold active:bg-red-500 active:text-white active:font-bold mx-2 hover:cursor-pointer flex items-center justify-center rounded-full border-4 border-red-600 ${theme} text-center w-[40px] h-[40px]`}
        >
            {value}
        </div>
    );
}

function FormStages({
    stages,
    onClick,
    selected,
}: {
    stages: number;
    selected: number;
    onClick: React.MouseEventHandler;
}) {
    const stageArray = useMemo(
        () => Array.from({ length: stages }).map((_, i) => i),
        [stages]
    );

    return (
        <div className="p-3 mb-[3rem]  mt-[6rem]">
            <div className="w-[90%] mx-auto">
                <div className="relative flex justify-center">
                    <div className="border-2 border-red-600 absolute w-full top-[50%] -z-10"></div>
                    {stageArray.map((element) => (
                        <ReturnSteps
                            value={element + 1}
                            handleClick={onClick}
                            isSelected={element < selected}
                            key={element}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(FormStages);
