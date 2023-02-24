import React from "react";

export function RowBlock(props: any) {

    return (
        <>
            <RowBlockUpper>
                <RowBlockLower>
                    {props.children}
                </RowBlockLower>
            </RowBlockUpper>
        </>
    );
}

export function RowBlockUpper(props: any, test?: any) {

    let add: string = "flex flex-wrap mb-2 lg:mb-4 m-auto" + test
    return (
        <>
            <div className={add}>
                {props.children}
            </div>
        </>
    );
}

export function RowBlockLower(props: any) {

    return (
        <>
            <div className="flex-grow mb-2 lg:mb-0 px-4">
                {props.children}
            </div>
        </>
    );
}