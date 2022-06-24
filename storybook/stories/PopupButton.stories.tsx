import React, { useCallback, useRef } from 'react';
// import { select, boolean } from '@storybook/addon-knobs';
import { Story } from '@storybook/react/types-6-0';
import Button from '../../src/components/Button';
import List from '../../src/components/List';
import PopupButton, { PopupButtonProps } from '../../src/components/PopupButton';

export default {
    title: 'Action/PopupButton',
    component: PopupButton,
    argTypes: {},
};

const options = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

interface OptionProps {
    children: React.ReactNode;
}
const Option = ({ children }: OptionProps) => (
    <div>
        { children }
    </div>
);
const MenuItems = () => (
    <div style={{ padding: '12px' }}>
        <List
            data={options}
            keySelector={(d) => d.key}
            renderer={Option}
            rendererParams={(_, option) => ({ children: option.label })}
        />
    </div>
);

const Template: Story<PopupButtonProps<string>> = (args) => (
    <PopupButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'PopupButton',
    transparent: true,
    children: <MenuItems />,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'PopupButton',
    children: <MenuItems />,
    transparent: true,
    disabled: true,
};

const TemplateWithParent: Story<PopupButtonProps<string>> = (args) => {
    const popupElementRef = useRef<{
        setPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    }>(null);

    const handleClick = useCallback(
        () => {
            popupElementRef.current?.setPopupVisibility(false);
        },
        [],
    );

    return (
        <PopupButton
            {...args}
            componentRef={popupElementRef}
        >
            <div style={{ padding: '12px' }}>
                <Button
                    onClick={handleClick}
                    name={undefined}
                >
                    Ok
                </Button>
            </div>
        </PopupButton>
    );
};
export const WithParent = TemplateWithParent.bind({});
WithParent.args = {
    label: 'PopupButton',
};
