import React from 'react';
import Popup from '#components/Popup';

export default {
    title: 'View/Popup',
    component: Popup,
    argTypes: {},
};

export const Default = () => {
    const ref1 = React.useRef(null);
    const ref2 = React.useRef(null);
    const ref3 = React.useRef(null);
    const ref4 = React.useRef(null);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    height: '100vh',
                }}
            >
                <div style={{ width: '70vw' }}>
                    <div
                        ref={ref1}
                        style={{
                            padding: '10px',
                        }}
                    >
                        This is the parent 1
                    </div>
                    <Popup parentRef={ref1}>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 1
                        </div>
                    </Popup>
                </div>
                <div style={{ width: '20vw' }}>
                    <div
                        ref={ref2}
                        style={{
                            padding: '10px',
                        }}
                    >
                        This is the parent 2
                    </div>
                    <Popup parentRef={ref2}>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 2
                        </div>
                    </Popup>
                </div>
                <div style={{ flexBasis: '40vw' }}>
                    <div
                        ref={ref3}
                        style={{
                            padding: '10px',
                        }}
                    >
                        This is the parent 3
                    </div>
                    <Popup parentRef={ref3}>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 3
                        </div>
                    </Popup>
                </div>
                <div style={{ flexBasis: '40vw' }}>
                    <div
                        ref={ref4}
                        style={{
                            padding: '10px',
                        }}
                    >
                        This is the parent 4
                    </div>
                    <Popup parentRef={ref4}>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 4
                        </div>
                    </Popup>
                </div>
            </div>
        </>
    );
};
